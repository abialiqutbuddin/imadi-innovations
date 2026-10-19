#!/usr/bin/env bash
set -euo pipefail
release_id=${1:?Supply the Git commit SHA}
[[ "$release_id" =~ ^[a-f0-9]{40}$ ]] || { echo 'Invalid release identifier'; exit 1; }
root=/srv/imadi
release="$root/releases/$release_id"
test -f "$root/releases/$release_id.tgz"
mkdir -p "$release"
tar -xzf "$root/releases/$release_id.tgz" -C "$release"
rm "$root/releases/$release_id.tgz"
set -a
source "$root/shared/.env"
set +a
export MEDIA_UPLOAD_DIR="$root/shared/media"
cd "$release"
if [[ -L "$root/current" ]]; then
  sudo /usr/local/sbin/imadi-backup
fi
npm run payload -- migrate
if [[ ! -f "$root/shared/.seeded" ]]; then
  npm run seed
  touch "$root/shared/.seeded"
fi
if [[ -f "$root/shared/bootstrap.env" ]]; then
  set -a
  source "$root/shared/bootstrap.env"
  set +a
  ./node_modules/.bin/tsx scripts/bootstrap-admin.ts
  rm "$root/shared/bootstrap.env"
fi
previous=$(readlink -f "$root/current" || true)
ln -sfn "$release" "$root/current.next"
mv -Tf "$root/current.next" "$root/current"
sudo /usr/bin/systemctl restart imadi-website
healthy=false
for attempt in {1..30}; do
  if curl --fail --silent --max-time 5 http://127.0.0.1:3100/api/health >/dev/null; then healthy=true; break; fi
  sleep 2
done
if [[ "$healthy" != true ]]; then
  if [[ -n "$previous" && "$previous" != "$release" && -d "$previous" ]]; then
    ln -sfn "$previous" "$root/current.next"
    mv -Tf "$root/current.next" "$root/current"
    sudo /usr/bin/systemctl restart imadi-website
  fi
  echo 'Release health check failed.'
  exit 1
fi
for old in "$root"/releases/*; do
  [[ -d "$old" ]] || continue
  [[ "$old" == "$release" || "$old" == "$previous" ]] || rm -rf -- "$old"
done
printf 'Deployment healthy: %s\n' "$release_id"

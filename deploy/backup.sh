#!/usr/bin/env bash
set -euo pipefail
umask 077
backup_dir=/srv/imadi/shared/backups
stamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p "$backup_dir"
stage=$(mktemp -d)
trap 'rm -rf "$stage"' EXIT
runuser -u postgres -- pg_dump -Fc imadi_production > "$stage/database.dump"
cp /srv/imadi/shared/.env "$stage/production.env"
cp /srv/imadi/current/RELEASE "$stage/RELEASE"
tar -czf "$stage/media.tgz" -C /srv/imadi/shared media
# A separate key is kept in root's private directory and the owner's private handoff.
tar -czf - -C "$stage" . | openssl enc -aes-256-cbc -salt -pbkdf2 -iter 200000 -pass file:/root/.imadi-backup-passphrase -out "$backup_dir/imadi-$stamp.tar.gz.enc"
find "$backup_dir" -name 'imadi-*.tar.gz.enc' -mtime +6 -delete
printf 'Encrypted backup created: imadi-%s.tar.gz.enc\n' "$stamp"

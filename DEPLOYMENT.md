# Imadi production

The website and Payload admin share https://imadi-innovations.com, with admin at `/admin`. HostHatch Singapore runs Node 22, PostgreSQL 18 and Nginx on Ubuntu 26.04. The existing mail hosting and other subdomains stay on their existing host.

The previous website is preserved on `legacy`. New development is kept on `main`. Promote reviewed changes by merging `main` into `prod` and pushing `prod`. Pushes to `prod` run `.github/workflows/deploy-production.yml`: unit/type checks, production build, clean PostgreSQL migrations and email access checks, then an SSH deployment. Builds run on GitHub rather than using the VPS's 4 GB RAM. Repository variable `HOSTHATCH_HOST` selects the host; secrets `HOSTHATCH_DEPLOY_KEY` and `HOSTHATCH_KNOWN_HOSTS` authenticate and verify SSH.

Each release lives in `/srv/imadi/releases/<commit>`. `/srv/imadi/current` points to the running release; the preceding release is retained for code rollback. PostgreSQL migrations run before restart. An unsuccessful health check switches code back to the previous release, but does not undo migrations. Always review backwards compatibility before schema changes.

Persistent files are `/srv/imadi/shared/.env` and `/srv/imadi/shared/media`. Production secrets never belong in Git. `PAYLOAD_DB_PUSH=false` is mandatory; reviewed migrations change the schema. Initial content and the private owner account are created once. Later releases preserve CMS edits.

## Operations

Owner SSH key: `~/.ssh/imadi_hosthatch_ed25519`. Application runs as Unix user `imadi`; SSH password login is disabled. PostgreSQL and Node bind to loopback; only SSH and HTTP/HTTPS are allowed through the firewall.

```sh
systemctl status imadi-website nginx postgresql
journalctl -u imadi-website -n 100 --no-pager
curl --fail http://127.0.0.1:3100/api/health
certbot renew --dry-run
systemctl list-timers imadi-backup.timer certbot.timer
```

Email settings under Administration are administrator-only. SMTP credentials are encrypted with `PAYLOAD_SECRET`; blank password preserves the saved credential. Host, port, TLS mode, sender, username, password and enquiry recipient are editable without rebuilding. Notifications run after the enquiry is saved. Outgoing email remains disabled until valid SMTP details are supplied; password recovery also needs working SMTP.

## Backups and recovery

`imadi-backup.timer` runs daily at 02:30 UTC with a short randomized delay. It retains seven days of encrypted PostgreSQL, media, environment and release-ID archives under `/srv/imadi/shared/backups`. Run `/usr/local/sbin/imadi-backup` as root for an immediate backup. The passphrase is root-only at `/root/.imadi-backup-passphrase`; the owner's private deployment handoff contains a recovery copy.

Automated off-server backups are intentionally not configured at the owner's request. An initial encrypted backup is copied to the external drive. Daily copies on the VPS do not survive loss of the VPS.

Restore in an isolated environment first. Decrypt with `openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass file:<passphrase-file>`, extract the archive, restore `database.dump` with `pg_restore` to a new database, unpack `media.tgz`, and use the matching environment and release. A production restore requires downtime and an explicit review of the target database.

## Dependency maintenance

Sass is overridden to 1.105.2 to remove the old vulnerable `braces` build dependency. Remaining audit advisories concern upstream development tooling; do not run development servers publicly. Review Payload upgrades and run the migration/permission checks before updating. Avoid forced audit fixes that downgrade Payload across major versions.

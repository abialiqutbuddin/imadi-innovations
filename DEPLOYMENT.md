# cPanel Deployment

This project deploys to cPanel over FTP through GitHub Actions.

## Workflow

The production workflow lives at `.github/workflows/deploy-production.yml`.

- Trigger: push to `main`
- Build output: `out/`
- Deploy method: `SamKirkland/FTP-Deploy-Action`

## Required GitHub Secrets

Add these repository secrets before the first deploy:

- `CPANEL_FTP_PASSWORD`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

## Values For This Site

Use the cPanel FTP values you created for the `imadi-innovations.com` site:

- FTP server: `server14.hndservers.net`
- FTP port: `21`
- FTP username: `imadi-innovations@magnetcargouae.com`
- FTP target directory: `/home4/magnetcargouae/domains/imadi-innovations.com/public_html/`

Do not commit the FTP password or Sanity values into the repository.

## Notes

- The site is configured as a static Next.js export, so each deploy uploads the generated `out/` directory.
- Sanity content is fetched during the build. Content changes in Sanity require a new deploy to appear on the live site.

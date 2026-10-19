# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json next.config.ts next-env.d.ts tsconfig.json ./
COPY src ./src
COPY public ./public
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3100
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
# Non-secret build placeholders. Dynamic routes must not query this database
# while Next builds; the real database and secret are supplied at runtime.
RUN PAYLOAD_SECRET=build-only-placeholder-never-use-at-runtime \
    DATABASE_URL=postgresql://build:build@127.0.0.1:9/imadi_build \
    PAYLOAD_DB_PUSH=false \
    npm run build

# Source and CLI dependencies for explicit migration/seed jobs. This image is
# not the public web server and never runs migrations automatically.
FROM base AS tools
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json next.config.ts next-env.d.ts tsconfig.json ./
COPY src ./src
COPY scripts ./scripts
COPY public ./public
RUN mkdir -p /app/media && chown node:node /app/media
USER node
CMD ["npm", "run", "payload", "--", "migrate:status"]

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3100
ENV HOSTNAME=0.0.0.0
RUN mkdir -p /app/media /app/.next/cache && chown -R node:node /app
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
# Match the tools image's node UID so both jobs can write the upload volume.
USER node
EXPOSE 3100
CMD ["node", "server.js"]

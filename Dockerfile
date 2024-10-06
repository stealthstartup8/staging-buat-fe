FROM oven/bun:1.1.17-debian AS builder

WORKDIR /kitchen
COPY . /kitchen
COPY .env.example .env
RUN bun install --frozen-lockfile && \
	bun install sharp@0.32.6 --ignore-engines && \
	bun run build

FROM node:18.20-alpine3.19

LABEL com.centurylinklabs.watchtower.enable=true
LABEL maintainer="Rizul Hanif"
LABEL developer="Mahaasin && Rifdo"

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs --from=builder /kitchen/.next/standalone /app
COPY --chown=nextjs:nodejs --from=builder /kitchen/.next/static /app/.next/static
COPY --chown=nextjs:nodejs public /app/public

USER nextjs

EXPOSE 3000

ENV NEXT_SHARP_PATH /app/node_modules/sharp
ENV PORT 3000

CMD ["node", "server.js"]
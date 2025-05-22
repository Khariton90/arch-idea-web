FROM node:alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80
CMD ["npm", "start"]
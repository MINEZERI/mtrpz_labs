FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views

EXPOSE 3000

CMD ["dist/app.js"]
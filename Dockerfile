FROM node:24-slim AS builder

RUN mkdir /app
WORKDIR /app

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm install
RUN npm install typescript -g

ADD . .
RUN tsc --build

FROM node:24-slim

COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules
WORKDIR /app
CMD ["node", "build/index.js"]
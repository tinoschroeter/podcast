FROM node:gallium-bullseye-slim AS app

RUN apt-get update && \
    apt-get install sqlite3 youtube-dl -y

WORKDIR /app
COPY app .

RUN npm install --production

CMD ["node", "index.js"]

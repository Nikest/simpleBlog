FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN npm install
RUN npm install -g typescript
RUN tsc src/index.ts
CMD ["node", "src/index.js"]
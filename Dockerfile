FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "serve", "--host", "--port", "5000"]

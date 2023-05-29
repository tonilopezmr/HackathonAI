FROM strapi/base

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV production
ENV PORT 80

RUN npm run build

EXPOSE 80

CMD ["npm", "start"]
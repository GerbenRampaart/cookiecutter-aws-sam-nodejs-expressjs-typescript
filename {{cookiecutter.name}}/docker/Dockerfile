FROM node:10-alpine

RUN npm install pm2 -g

RUN mkdir -p /app/
WORKDIR /app/

COPY ../{{ cookiecutter.name }}Function .

EXPOSE 3000

CMD [ "pm2-runtime", "./api/app.local.js" ]
FROM node:10-alpine

RUN mkdir -p /app/
WORKDIR /app/

COPY ../{{ cookiecutter.name }}Function .

EXPOSE 3000

CMD [ "node", "./api/app.local.js" ]
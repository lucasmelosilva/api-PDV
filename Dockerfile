FROM node:20
WORKDIR /usr/src/api-PDV
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 8080
CMD npm start
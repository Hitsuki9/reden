FROM node:12

RUN yarn

RUN npm build

CMD npm start

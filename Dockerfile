FROM node:12

WORKDIR /usr/app/parler

COPY build ./build
COPY client ./client
COPY config ./config
COPY public ./public
COPY server ./server
COPY types ./types
COPY .browserslistrc .eslintrc.js babel.config.js nodemon.json postcss.config.js package.json tsconfig.json  yarn.lock ./

RUN yarn

CMD npm start

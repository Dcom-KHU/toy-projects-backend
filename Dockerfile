FROM node:18

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
ENV NODE_ENV production
CMD ["yarn","start:1:prod"]
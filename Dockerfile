FROM node:12.18.2-alpine
LABEL maintainer="megic@wiredmed.com"
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN npm config set loglevel warn

RUN cnpm install
ENV NODE_ENV production

# replace this with your application's default port
EXPOSE 7001
CMD npm run dev

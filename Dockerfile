FROM node:12-slim
LABEL maintainer="megic@wiredmed.com"
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* 
ADD . /usr/src/app
WORKDIR /usr/src/app

# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN npm config set loglevel warn

RUN npm install
ENV NODE_ENV production

# replace this with your application's default port
EXPOSE 7004
CMD npm run start

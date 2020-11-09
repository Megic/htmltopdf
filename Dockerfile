FROM ccr.ccs.tencentyun.com/wiredmed-research/nodejs:8.12.0
LABEL maintainer="megic@wiredmed.com"

ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm config set loglevel warn
RUN yarn install --production
ENV NODE_ENV production
RUN chmod +x /usr/src/app/script/docker-entrypoint.sh
ENTRYPOINT ["script/docker-entrypoint.sh"]

# replace this with your application's default port
EXPOSE 7001

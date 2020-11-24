const Subscription = require('egg').Subscription;
const fs = require('fs-extra');
const dayjs = require('dayjs');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
module.exports = app => {
  class BackgroundTask extends Subscription {

  // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
      return {
        interval: '24h', // 1 分钟间隔
        type: 'worker', // 单worker执行
      };
    }

    // 定时清除缓存，只保留3
    async subscribe() {
      const prePath = process.env.CAPATH||'/opt/data/www/cache/'
     // 保留2天内的记录
      const last = dayjs().subtract(process.env.CADAY||2, 'day')
      const paths = fs.readdirSync(prePath);
      for (let index = 0; index < paths.length; index++) {
        const curDate = dayjs(paths[index])
         if(curDate.isSameOrBefore(last)){
          fs.removeSync(prePath+'/'+paths[index])
         }
      }
      //console.log(paths)
    }
  }
  return BackgroundTask;
};

'use strict';

const Controller = require('egg').Controller;

const puppeteer = require('puppeteer')
const fs = require('fs-extra');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');
let browser
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const url = ctx.query.url;
    const data = ctx.request.body.PRINTDATA
    //  console.log(url, data)
    if(url){
      const prePath = process.env.CAPATH||'/opt/data/www/cache/'
      const fullpath = dayjs().format('YYYYMMDD')+'/'
      fs.ensureDir(prePath+fullpath);//创建缓存目录
      const filePath = fullpath+uuidv4().replace(/\-/g, '')+'.pdf'
      // console.log(filePath)
      if(!browser)browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors']});
      const page = await browser.newPage();
      if(data)  {
      await page.goto(decodeURIComponent(url));
        await page.evaluate((data) => {
            window.localStorage.setItem("PRINTDATA", JSON.stringify(data));
        },data)
      }
      await page.goto(decodeURIComponent(url), {waitUntil: 'networkidle2'});
      await page.pdf({path: prePath+filePath,preferCSSPageSize:true});
      page.close()
      //browser.close();
      ctx.body = {
        url:filePath
      };
    }
    
  }
}

module.exports = HomeController;

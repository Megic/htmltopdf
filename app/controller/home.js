'use strict';

const Controller = require('egg').Controller;

const puppeteer = require('puppeteer')
const fs = require('fs-extra');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const url = ctx.query.url;
    if(url){
      const prePath = process.env.CAPATH||'/opt/data/www/cache/'
      const fullpath = dayjs().format('YYYYMMDD')+'/'
      fs.ensureDir(prePath+fullpath);//创建缓存目录
      const filePath = fullpath+uuidv4().replace(/\-/g, '')+'.pdf'
      // console.log(filePath)
      const browser = await puppeteer.launch({});
      const page = await browser.newPage();
      await page.goto(url, {waitUntil: 'networkidle2'});
      await page.pdf({path: prePath+filePath});
      browser.close();
      ctx.body = {
        url:filePath
      };
    }
    
  }
}

module.exports = HomeController;

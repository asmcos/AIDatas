# AIDatas
智能数据看板, 网站框架采用strapi 4.x 版本。
https://www.klang.org.cn


# Open data save by strapi
Klang （金浪） 数据看板
github.com/asmcos/klang.

# build
```
git clone https://github.com/asmcos/AIDatas
cd AIDatas
npm install
npm run develop
```

# config
See strapi
config/*

# mysql联合键
* dayks 表里设置了 联合唯一键， node knex_mysqldb.js 


# 提交一个因子名
url = 'http://127.0.0.1:1337/api/factormanages'
freq = 1 #表示 每日更新，例如日K的 macd，rsi
requests.post(url,params={'freq':1,'factorname':'macd'}) 

freq = 0 #表示不定时更新，例如：板块，筹码
requests.post(url,params={'freq':0,'factorname':'SCR','describe':'筹码集中度'}) 

# 更新一个不定时因子数据
 requests.post('http://127.0.0.1:1337/api/postfactors',params={'factorname':'chouma'},json=[{'code':'sh.600600',"value":"15"},{'code':'sh.600100',"value":"21"}])  
 requests.post('http://127.0.0.1:1337/api/postfactors',params={'factorname':'chouma',"date":"2022-03-01"},json=[{'code':'sh.600600',"value":"15"},{'code':'sh.600100',"value":"21"}])  
获取一个不定时因子数据 离 2022-07-02 （之前）最近的日期
date参数可以不写，表示获取 最后一个交易日数据
requests.get('http://127.0.0.1:1337/api/getfactors',params={'factorname':'chouma','date':'2022-07-02'})  

# 更新一个日更新因子数据
 requests.post('http://127.0.0.1:1337/api/postfactors',params={'factorname':'macd'},json=[{'code':'sh.600600',"macd":"0.5，2，1","date":"2022-05-22"},{'code':'sh.600100',"macd":"21，3，1","date":"2022-05-22"}])  

date参数可以不写，表示获取 最后一个交易日数据
requests.get('http://127.0.0.1:1337/api/getfactors',params={'factorname':'macd','date':'2022-07-02'})  

# 更多的例子请访问 Kdata
https://github.com/KlangAlpha/Kdata

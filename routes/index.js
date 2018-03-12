const express = require('express');
const Mock = require('mockjs');

const Random = Mock.Random;

const router = express.Router();

/*
*
GET /zoos：列出所有动物园

POST /zoos：新建一个动物园

GET /zoos/ID：获取某个指定动物园的信息

PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）

PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）

DELETE /zoos/ID：删除某个动物园

GET /zoos/ID/animals：列出某个指定动物园的所有动物

DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
*
* */

const fruits = [
  { id: 1, fruit: '苹果' },
  { id: 2, fruit: '香蕉' },
  { id: 3, fruit: '桃子' },
  { id: 4, fruit: '香梨' },
  { id: 5, fruit: '西瓜' },
];

router.get('/fruits', (req, res) => {
  res.json(fruits);
});

router.get('/fruits/:id', (req, res) => {
  res.json(fruits[Number(req.params.id) - 1]);
});

router.post('/fruits', (req, res) => {
  fruits.push({ id: req.body.id, fruit: req.body.fruit });
  res.json(fruits);
});

router.delete('/fruits/:id', (req, res) => {
  fruits.splice(Number(req.params.id) - 1, 1);
  res.json(fruits);
});

router.put('/fruits/:id', (req, res) => {
  fruits[Number(req.params.id) - 1].fruit = req.params.fruit;
  res.json(fruits);
});

router.get('/equipments', (req, res) => {
  const data = [
    { id: 1, equipment: '电视' },
    { id: 2, equipment: '电脑' },
    { id: 3, equipment: '冰箱' },
    { id: 4, equipment: '洗衣机' },
    { id: 5, equipment: '电饭煲' },
  ];
  res.json(data);
});

router.get('/users', (req, res) => {
  const data = Mock.mock({
    'user|100': [{
      date: () => Random.date(),
      name: () => Random.cname(),
      address: () => Random.county(true),
    }],
  });
  res.json(data.user);
});

router.get('/shops', (req, res) => {
  const data = [
    { id: 1, shop: '一点点奶茶店' },
    { id: 2, shop: 'Coco奶茶点' },
    { id: 3, shop: '豪大大鸡排' },
    { id: 4, shop: '晋云烧饼' },
    { id: 5, shop: '衢州菜馆' },
  ];
  res.json(data);
});

const restaurants = [
  { id: 1, value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
  { id: 2, value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
  { id: 3, value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
  { id: 4, value: '泷千家(天山西路店)', address: '天山西路438号' },
  { id: 5, value: '胖仙女纸杯蛋糕（上海凌空店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
  { id: 6, value: '贡茶', address: '上海市长宁区金钟路633号' },
  { id: 7, value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
  { id: 8, value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
  { id: 9, value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
  { id: 10, value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
  { id: 11, value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
  { id: 12, value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
  { id: 13, value: 'Monica摩托主题咖啡店', address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
  { id: 14, value: '浮生若茶（凌空soho店）', address: '上海长宁区金钟路968号9号楼地下一层' },
  { id: 15, value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
  { id: 16, value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
  { id: 17, value: '快乐柠檬（神州智慧店）', address: '上海市长宁区天山西路567号1层R117号店铺' },
  { id: 18, value: 'Merci Paul cafe', address: '上海市普陀区光复西路丹巴路28弄6号楼819' },
  { id: 19, value: '猫山王（西郊百联店）', address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
  { id: 20, value: '枪会山', address: '上海市普陀区棕榈路' },
  { id: 22, value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
  { id: 23, value: '钱记', address: '上海市长宁区天山西路' },
  { id: 24, value: '壹杯加', address: '上海市长宁区通协路' },
  { id: 25, value: '唦哇嘀咖', address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
  { id: 26, value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
  { id: 27, value: '爱茜茜里(近铁广场)', address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
  { id: 28, value: '鲜果榨汁（金沙江路和美广店）', address: '普陀区金沙江路2239号金沙和美广场B1-10-6' },
  { id: 29, value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
  { id: 30, value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
  { id: 31, value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
  { id: 32, value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
  { id: 33, value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
  { id: 34, value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
  { id: 35, value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
  { id: 36, value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
  { id: 37, value: '饭典*新简餐（凌空SOHO店）', address: '上海市长宁区金钟路968号9号楼地下一层9-83室' },
  { id: 38, value: '焦耳·川式快餐（金钟路店）', address: '上海市金钟路633号地下一层甲部' },
  { id: 39, value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
  { id: 40, value: '浏阳蒸菜', address: '天山西路430号' },
  { id: 41, value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
  { id: 42, value: '樱花食堂（凌空店）', address: '上海市长宁区金钟路968号15楼15-105室' },
  { id: 43, value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
  { id: 44, value: '福荣祥烧腊（平溪路店）', address: '上海市长宁区协和路福泉路255弄57-73号' },
  { id: 45, value: '速记黄焖鸡米饭', address: '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
  { id: 46, value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
  { id: 47, value: '(小杨生煎)西郊百联餐厅', address: '长宁区仙霞西路88号百联2楼' },
  { id: 48, value: '阳阳麻辣烫', address: '天山西路389号' },
  { id: 49, value: '南拳妈妈龙虾盖浇饭', address: '普陀区金沙江路1699号鑫乐惠美食广场A13' },
];

router.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

router.get('/restaurants/:keyword', (req, res) => {
  const results = restaurants.filter(item => item.value.indexOf(req.params.keyword) > -1);
  res.json(results);
});


module.exports = router;

const express = require('express');
const Mock = require('mockjs');
const multer = require('multer');
const fs = require('fs');

const Random = Mock.Random;

const router = express.Router();
const upload = multer({ dest: './public/upload_tmp/' });
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

const cascader = [{
  value: 'zhinan',
  label: '指南',
  children: [{
    value: 'shejiyuanze',
    label: '设计原则',
    children: [{
      value: 'yizhi',
      label: '一致',
    }, {
      value: 'fankui',
      label: '反馈',
    }, {
      value: 'xiaolv',
      label: '效率',
    }, {
      value: 'kekong',
      label: '可控',
    }],
  }, {
    value: 'daohang',
    label: '导航',
    children: [{
      value: 'cexiangdaohang',
      label: '侧向导航',
    }, {
      value: 'dingbudaohang',
      label: '顶部导航',
    }],
  }],
}, {
  value: 'zujian',
  label: '组件',
  disabled: true,
  children: [{
    value: 'basic',
    label: 'Basic',
    children: [{
      value: 'layout',
      label: 'Layout 布局',
    }, {
      value: 'color',
      label: 'Color 色彩',
    }, {
      value: 'typography',
      label: 'Typography 字体',
    }, {
      value: 'icon',
      label: 'Icon 图标',
    }, {
      value: 'button',
      label: 'Button 按钮',
    }],
  }, {
    value: 'form',
    label: 'Form',
    children: [{
      value: 'radio',
      label: 'Radio 单选框',
    }, {
      value: 'checkbox',
      label: 'Checkbox 多选框',
    }, {
      value: 'input',
      label: 'Input 输入框',
    }, {
      value: 'input-number',
      label: 'InputNumber 计数器',
    }, {
      value: 'select',
      label: 'Select 选择器',
    }, {
      value: 'cascader',
      label: 'Cascader 级联选择器',
    }, {
      value: 'switch',
      label: 'Switch 开关',
    }, {
      value: 'slider',
      label: 'Slider 滑块',
    }, {
      value: 'time-picker',
      label: 'TimePicker 时间选择器',
    }, {
      value: 'date-picker',
      label: 'DatePicker 日期选择器',
    }, {
      value: 'datetime-picker',
      label: 'DateTimePicker 日期时间选择器',
    }, {
      value: 'upload',
      label: 'Upload 上传',
    }, {
      value: 'rate',
      label: 'Rate 评分',
    }, {
      value: 'form',
      label: 'Form 表单',
    }],
  }, {
    value: 'data',
    label: 'Data',
    children: [{
      value: 'table',
      label: 'Table 表格',
    }, {
      value: 'tag',
      label: 'Tag 标签',
    }, {
      value: 'progress',
      label: 'Progress 进度条',
    }, {
      value: 'tree',
      label: 'Tree 树形控件',
    }, {
      value: 'pagination',
      label: 'Pagination 分页',
    }, {
      value: 'badge',
      label: 'Badge 标记',
    }],
  }, {
    value: 'notice',
    label: 'Notice',
    children: [{
      value: 'alert',
      label: 'Alert 警告',
    }, {
      value: 'loading',
      label: 'Loading 加载',
    }, {
      value: 'message',
      label: 'Message 消息提示',
    }, {
      value: 'message-box',
      label: 'MessageBox 弹框',
    }, {
      value: 'notification',
      label: 'Notification 通知',
    }],
  }, {
    value: 'navigation',
    label: 'Navigation',
    children: [{
      value: 'menu',
      label: 'NavMenu 导航菜单',
    }, {
      value: 'tabs',
      label: 'Tabs 标签页',
    }, {
      value: 'breadcrumb',
      label: 'Breadcrumb 面包屑',
    }, {
      value: 'dropdown',
      label: 'Dropdown 下拉菜单',
    }, {
      value: 'steps',
      label: 'Steps 步骤条',
    }],
  }, {
    value: 'others',
    label: 'Others',
    children: [{
      value: 'dialog',
      label: 'Dialog 对话框',
    }, {
      value: 'tooltip',
      label: 'Tooltip 文字提示',
    }, {
      value: 'popover',
      label: 'Popover 弹出框',
    }, {
      value: 'card',
      label: 'Card 卡片',
    }, {
      value: 'carousel',
      label: 'Carousel 走马灯',
    }, {
      value: 'collapse',
      label: 'Collapse 折叠面板',
    }],
  }],
}, {
  value: 'ziyuan',
  label: '资源',
  children: [{
    value: 'axure',
    label: 'Axure Components',
  }, {
    value: 'sketch',
    label: 'Sketch Templates',
  }, {
    value: 'jiaohu',
    label: '组件交互文档',
  }],
}];

router.get('/cascader', (req, res) => {
  res.json(cascader);
});


const catalog = [
  {
    id: 1, gid: 0, pid: 0, name: '前端',
  },
  {
    id: 2, gid: 0, pid: 0, name: '后端',
  },
  {
    id: 3, gid: 0, pid: 1, name: 'js',
  },
  {
    id: 4, gid: 0, pid: 1, name: 'es6',
  },
  {
    id: 5, gid: 0, pid: 2, name: 'java',
  },
  {
    id: 6, gid: 0, pid: 2, name: 'spring',
  },
  {
    id: 7, gid: 1, pid: 3, name: 'js-1',
  },
  {
    id: 8, gid: 1, pid: 4, name: 'es6-1',
  },
  {
    id: 9, gid: 2, pid: 5, name: 'java-1',
  },
  {
    id: 10, gid: 2, pid: 6, name: 'spring-1',
  },
];

function hasChildren(id) {
  return catalog.findIndex(item => item.pid === id);
}

router.post('/fetch/cascader', (req, res) => {
  const result = [];
  const pid = req.body.pid;
  const gid = req.body.gid;
  if (gid && pid) {
    catalog.forEach((item) => {
      if (item.pid === pid && item.gid === gid) {
        result.push(item);
      }
    });
  } else if (pid) {
    catalog.forEach((item) => {
      if (item.pid === pid) {
        if (hasChildren(item.id) !== -1) item.children = [];
        result.push(item);
      }
    });
  } else {
    catalog.forEach((item) => {
      if (item.pid === 0) {
        if (hasChildren(item.id) !== -1) item.children = [];
        result.push(item);
      }
    });
  }

  res.json(result);
});

router.post('/upload', upload.any(), (req, res, next) => {
  console.log(req.files[0]); // 上传的文件信息

  const destFile = `./public/upload/${req.files[0].originalname}`;
  fs.readFile(req.files[0].path, (err, data) => {
    fs.writeFile(destFile, data, (err2) => {
      if (err2) {
        console.log(err2);
      } else {
        const response = {
          message: '文件上传成功',
          filename: req.files[0].originalname,
          path: `/upload/${req.files[0].originalname}`,
        };
        console.log(response);
        res.json(response);
      }
    });
  });
});


module.exports = router;

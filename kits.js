/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {}; //创建一个对象

kits.dispatchZero = function (num) { //如果 num 小于10，就在 num 前补 0
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}


/* ---------------------------------------------------------------------*/
// 把方法都放到对象的身上
//获取当前系统的事件   返回值为：年-月-日 时：分：秒
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}


/* ---------------------------------------------------------------------*/
//生成一个 n ~ m 的随机整数   返回值是一个随机的整数 
kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}


/* ---------------------------------------------------------------------*/
// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function () {
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime(); // 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000, 999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}


/* ---------------------------------------------------------------------*/
//获取一个十六进制的颜色
kits.randomHexColor = function () {
  
  let random_Color = '#';
  for (let i = 0; i < 6; i++) {
    let number = kits.randomInt(0, 15);
    if (number >= 10) {
      switch (number) {
        case 10:
          number = 'a';
          break;
        case 11:
          number = 'b';
          break;
        case 12:
          number = 'c';
          break;
        case 13:
          number = 'd';
          break;
        case 14:
          number = 'e';
          break;
        case 15:
          number = 'f';
          break;
      }
    }

    random_Color += number; 
  }
  return random_Color;
}


/* ---------------------------------------------------------------------*/
//获取一个随机的rgb格式的颜色
kits.randomRGBColor = function(){
  let arr = [];
  for(let i = 0;i<3;i++){
    let number = kits.randomInt(0, 255);
    arr[i] = number;
  }
  let str = arr.join('');
  str = 'rgb(' + str + ')';
  return str; 

}
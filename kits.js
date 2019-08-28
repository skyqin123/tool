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


//从localStorage里面根据指定的键(key)获取一个数组
//getLocalDataArray(key,status)  
//参数：
//key ===>要查询数据的键
//status ===>是否要颠倒数据，true-->颠倒，false-->不颠倒
kits.getLocalDataArray = function(key,status) {
  let get_datas = localStorage.getItem(key);   //根据key获取数据，但是获取到的是JSON格式的数据
  let gd_arrs = JSON.parse(get_datas);  //把json格式的数据转换为DOM格式
  gd_arrs = gd_arrs || [];    //短路运算，判断是否为空数据，
  
  statu = status || 0;
  if(status){
    gd_arrs = gd_arrs.reverse();
  }
  return gd_arrs;
}


//将一个数组(arr)以指定的键(key)存储到localStorage里面
//saveLocalDataArray(key,arr)
//参数：
//key ===>localStorage里面根据根据key存储的数据
//arr ===> 要存入localStorage的key里面的数据
kits.saveLocalDataArray = function(key,arr){
  let store_arr = JSON.stringify(arr);   //把数据转换为json格式   store：储存

  localStorage.setItem(key,store_arr);
}


//向localStorage里面指定键(key)的数组数据追加一个数据对象（data）
//appendDataIntoArray(key,data)
//参数
//key ===>localStorage里面根据根据key存储的数据
//data ===>你要追加到localstorage的数据
kits.appendDataIntoArray = function(key,data){
  let get_datas = localStorage.getItem(key);  //先根据key获取locaStorage的数据
  let gd_arrs = JSON.parse(get_datas);    //把获取出来的数据转换为DOM格式的数组
  gd_arrs.push(data);           //数组名.push(num1,num2...)向数组后面添加数据，可以多个，但必须要有一个，
                               //该方法返回值是新数组的长度
  localStorage.setItem(key,gd_arrs);    //根据key重新写入localStorage                         

}



//根据对应的id从localStorage中指定键(key)的数组中删除一条数据
//deleteLocalDataById(key,id)
//参数
//key ===>localStorage里面根据根据key存储的数据
//id ===>根据你传入的id，找到localStorage里面的key对应的数据，删除掉
kits.deleteLocalDataById = function(key,id){
  let get_datas = localStorage.getItem(key);
  let gd_arrs = JSON.parse(get_datas);
  gd_arrs.forEach(function(e,i){
    if(e.id === id){
      gd_arrs.splice(i,1);
    }
  });
  let json = JSON.stringify(gd_arrs);
  localStorage.setItem(key,json);
}


//根据id修改localStorage里面的指定键(key)的数组数据
//modifyLocalDataById(key,id,data)  
//参数
//key ===>localStorage里面根据根据key存储的数据
//id ===>根据你传入的id，找到localStorage里面的key对应的数据
//data ===>把通过id找到的数据，修改为你传入的data
kits.modifyLocalDataById =function(key,id,data){
  let get_datas = localStorage.getItem(key);
  let gd_arrs = JSON.parse(get_datas);
  gd_arrs.forEach(function(e,i){
    if(e.id === id){
      gd_arrs.splice(i,1,data);
    }
  });
  let json = JSON.stringify(gd_arrs);
  localStorage.setItem(key,json);
}


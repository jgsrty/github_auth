var express = require("express");
var router = express.Router();
var mysql = require("mysql"); //引入mysql
//数据库配置
var db = {
  mysql: {
    host: "localhost",
    user: "root", //数据库用户名
    password: "root", //数据库密码
    database: "test", //要链接的数据库
    port: 3306 //默认端口
  }
};
var selAll = "select * from user_info";
var pool = mysql.createPool(db.mysql);
router.get("/user_info", function(req, res, next) {
  pool.getConnection(function(err, suc) {
    suc.query(selAll, [], function(err, result) {
      if (result) {
        //数据库有返回数据
        result = {
          //返回数据与格式
          code: 200,
          msg: "获取测试列表成功",
          data: result
        };
      }
      res.json(result); //响应返回json数据
      suc.release(); //关闭数据库连接
    });
  });
});

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

module.exports = router;

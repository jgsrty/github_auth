var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
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

router.get("/github_auth", async (req, res, next) => {
  let code = req.query.code;
  let path = "https://github.com/login/oauth/access_token";
  const params = {
    client_id: "c26a2c36287f5662ed62",
    client_secret: "f88afd71471725488ed301697f634c7d85d5524c",
    code: code
  };
  await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
    .then(res => {
      return res.text();
    })
    .then(body => {
      let args = body.split("&");
      let arg = args[0].split("=");
      let access_token = arg[1];
      return access_token;
    })
    .then(async token => {
      let url = "https://api.github.com/user?access_token=" + token;
      await fetch(url)
        .then(res2 => {
          return res2.json();
        })
        .then(response => {
          //拿到github用户信息
          //写入数据库
          let insertUser =
            "INSERT INTO user_info (id,username,portrait) VALUES (?,?,?)";
          let data = [response.id, response.login, response.avatar_url];
          pool.getConnection(function(err, suc) {
            suc.query(insertUser, data, function(err, result) {
              if (result) {
                //数据库有返回数据
                // result = {
                //   //返回数据与格式
                //   code: 200,
                //   msg: "插入数据",
                //   data: result
                // };
                var getUser = "select * from user_info where id=?";
                suc.query(getUser, [result.insertId], function(err, userRes) {
                  sendRes = {
                    //返回数据与格式
                    code: 200,
                    msg: "三方登录成功",
                    data: userRes[0]
                  };
                  res.json(sendRes); //响应返回json数据
                  suc.release(); //关闭数据库连接
                });
              }
            });
          });
        });
    })

    .catch(e => {
      console.log(e);
    });
});

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

module.exports = router;

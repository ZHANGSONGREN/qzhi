"use strict";
//加载所需要的模块
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

//创建服务
var httpServer = http.createServer(processRequest);
// 这是端口号
var port = 80;
//指定一个监听的接口
httpServer.listen(port, function() {
  console.log(`app is running at port:${port}`);
  console.log(`url: http://localhost:${port}`);
  cp.exec(`explorer http://localhost:${port}`, function () {
  });
});

//哪些url请求需要代理（代理配置）
let conifg = {
  '/api/':{//   /api/开头的url需要代理到https://xcx.shuofangquan.com这台服务器
    target: 'https://xcx.shuofangquan.com',
  }
}

//响应请求的函数
function processRequest (request, response) {
  //mime类型
  var mime = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
  };


  //request里面切出标识符字符串
  var requestUrl = request.url;
  console.log(request);
  console.log(requestUrl);

  if(requestUrl !=='/favicon.ico'){//清除第二次访问
    //请求的数据是否存在代理
    for ( var key in conifg){
      if( url.indexOf(key) >-1 ){
        let info = conifg[key].target.split(':')
        let opt = {
          protocol: info[0]+':',
          host:    info[1].slice(2),
          port:    info[2] || 80,
          method:  request.method,//这里是发送的方法
          path:    url,     //这里是访问的路径
          json: true,
          headers: request.headers
        }
        proxy( opt, response,request )//代理方法
        return;
      }
    }
    //正常的读取文件和其他资源加载
    fs.readFile( __dirname + ( url==='/' ? '/index.html':url ), function( err, data ){
      if( err ){
        console.log( 'file-err',err )
      }else{
        console.log(data)
        response.end( data )
      }
    });
  }

  //url模块的parse方法 接受一个字符串，返回一个url对象,切出来路径
  var pathName = url.parse(requestUrl).pathname;

  //对路径解码，防止中文乱码
  var pathName = decodeURI(pathName);

  //解决301重定向问题，如果pathname没以/结尾，并且没有扩展名
  if (!pathName.endsWith('/') && path.extname(pathName) === '') {
    pathName += '/';
    var redirect = "http://" + request.headers.host + pathName;
    response.writeHead(301, {
      location: redirect
    });
    //response.end方法用来回应完成后关闭本次对话，也可以写入HTTP回应的具体内容。
    response.end();
  }

  //获取资源文件的绝对路径
  /*  var filePath = path.resolve(__dirname + pathName);*/
  //__dirname是访问项目静态资源的路径 我的项目静态文件都在public下所以我写public可根据自己项目路径来配置哦
  var filePath = path.resolve("static" + pathName);
  console.log(filePath);
  //获取对应文件的文档类型
  //我们通过path.extname来获取文件的后缀名。由于extname返回值包含”.”，所以通过slice方法来剔除掉”.”，
  //对于没有后缀名的文件，我们一律认为是unknown。
  var ext = path.extname(pathName);
  ext = ext ? ext.slice(1) : 'unknown';

  //未知的类型一律用"text/plain"类型
  var contentType = mime[ext] || "text/plain";

  fs.stat(filePath, (err, stats) => {
    if (err) {
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>404</h1>");
    }
    //没出错 并且文件存在
    if (!err && stats.isFile()) {
      readFile(filePath, contentType);
    }
    //如果路径是目录
    if (!err && stats.isDirectory()) {
      var html = "<head><meta charset = 'utf-8'/></head><body><ul>";
      //读取该路径下文件
      fs.readdir(filePath, (err, files) => {
        if (err) {
          console.log("读取路径失败！");
        } else {
          //做成一个链接表，方便用户访问
          var flag = false;
          for (var file of files) {
            //如果在目录下找到index.html，直接读取这个文件
            if (file === "index.html") {
              readFile(filePath + (filePath[filePath.length-1]=='/' ? '' : '/') + 'index.html', "text/html");
              flag = true;
              break;
            };
            html += `<li><a href='${file}'>${file}</a></li>`;
          }
          if(!flag) {
            html += '</ul></body>';
            response.writeHead(200, { "content-type": "text/html" });
            response.end(html);
          }
        }
      });
    }

    //读取文件的函数
    function readFile(filePath, contentType){
      response.writeHead(200, { "content-type": contentType });
      //建立流对象，读文件
      var stream = fs.createReadStream(filePath);
      //错误处理
      stream.on('error', function() {
        response.writeHead(500, { "content-type": contentType });
        response.end("<h1>500 Server Error</h1>");
      });
      //读取文件
      stream.pipe(response);
    }
  });
}
//代理转发的方法
function proxy( opt,res ,req){
  console.log("dailile")
  var proxyRequest = http.request(opt, function(proxyResponse) { //代理请求获取的数据再返回给本地res
    proxyResponse.on('data', function(chunk) {
      console.log( chunk.toString('utf-8') )
      res.write(chunk, 'binary');
    });
    //当代理请求不再收到新的数据，告知本地res数据写入完毕。
    proxyResponse.on('end', function() {
      res.end();
    });
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  });
  //data只有当请求体数据进来时才会触发
  //尽管没有请求体数据进来，data还是要写，否则不会触发end事件
  req.on('data', function(chunk) {
    console.log('in request length:', chunk.length);
    proxyRequest.write(chunk, 'binary');
  });
  req.on('end', function() {
    //向proxy发送求情，这里end方法必须被调用才能发起代理请求
    //所有的客户端请求都需要通过end来发起
    proxyRequest.end();
  });
}

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ask-index"],{"0aa7":function(e,t,a){"use strict";var i,n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"cu-form-group align-start"},[a("v-uni-textarea",{staticStyle:{"background-color":"#f4f4f4",padding:"10rpx",height:"460rpx","line-height":"70rpx"},attrs:{placeholder:"详细的描述您要询问的问题,包括地区·楼盘·金额等,以便更好的回答",maxlength:"3000"},model:{value:e.textare,callback:function(t){e.textare=t},expression:"textare"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"grid col-3 grid-square flex-sub",staticStyle:{"padding-top":"15rpx"}},[e._l(e.imgList,(function(t,i){return a("v-uni-view",{key:i,staticClass:"bg-img",attrs:{"data-url":e.imgList[i]},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ViewImage.apply(void 0,arguments)}}},[a("v-uni-image",{attrs:{src:e.imgList[i],mode:"aspectFill"}}),a("v-uni-view",{staticClass:"cu-tag bg-red",attrs:{"data-index":i},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.DelImg.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"icon-close"})],1)],1)})),e.imgList.length<4?a("v-uni-view",{staticClass:"solids",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ChooseImage.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"icon-cameraadd"})],1):e._e()],2)],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[e._v("匿名提问")]),a("v-uni-switch",{staticClass:"orange radius",class:e.switchD?"checked":"",attrs:{checked:!!e.switchD},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.SwitchD.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"cu-card index-card shadow bg-white",staticStyle:{margin:"5rpx 0 -10rpx 0"}},[a("v-uni-view",{staticClass:"cu-bar bg-white"},[a("v-uni-view",{staticClass:"action"},[a("v-uni-text",{staticClass:"icon-titles text-green"}),e._v("打赏金额")],1)],1)],1),a("v-uni-view",{staticClass:"ds"},e._l(e.tabs,(function(t,i){return a("v-uni-view",{key:i,class:i==e.TabCur?"ds-a":"ds-b",attrs:{"data-id":i},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.tabSelect(a,t.value)}}},[e._v(e._s(t.name))])})),1),a("v-uni-view",{staticClass:"cu-bar foot"},[a("v-uni-view",{staticClass:"inext-btn radius lg bg-green shadow",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.addake.apply(void 0,arguments)}}},[e._v("问题写好了")])],1)],1)},s=[];a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}))},"2e89":function(e,t,a){"use strict";a.r(t);var i=a("9449"),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,(function(){return i[e]}))}(s);t["default"]=n.a},"61b8":function(e,t,a){"use strict";var i=a("c677"),n=a.n(i);n.a},7857:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,"uni-page-body[data-v-fa398270]{background-color:#f8f8f8}.inext-btn[data-v-fa398270]{width:100%;margin:%?20?%;padding:%?20?%;text-align:center}.ds[data-v-fa398270]{padding:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;width:%?750?%;background-color:#fff}.ds-a[data-v-fa398270]{margin:%?10?%;height:%?55?%;line-height:%?55?%;text-align:center;width:%?110?%;border:%?1?% solid #5ac274;color:#5ac274;font-size:%?29?%}.ds-b[data-v-fa398270]{margin:%?10?%;height:%?55?%;line-height:%?55?%;text-align:center;width:%?110?%;border:%?1?% solid #d9d9d9;color:#d9d9d9;font-size:%?29?%}body.?%PAGE?%[data-v-fa398270]{background-color:#f8f8f8}",""]),e.exports=t},9449:function(e,t,a){"use strict";(function(e){var i=a("ee27");a("99af"),a("a15b"),a("a434"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var n,s=i(a("c964")),o=(a("670d"),a("2282")),c={data:function(){return{amount:0,host:o.host,imgList:[],switchD:!1,textare:"",TabCur:0,up:"",tabs:[{id:1,value:0,name:"无"},{id:2,value:18,name:"￥18"},{id:3,value:88,name:"￥88"},{id:3,value:188,name:"￥188"}]}},onLoad:function(){n=this,e("log",o.userInfo," at pages/ask/index.vue:82")},methods:{ChooseImage:function(){var e=this;uni.chooseImage({count:3,sizeType:["original","compressed"],sourceType:["album"],success:function(t){0!=e.imgList.length?e.imgList=e.imgList.concat(t.tempFilePaths):e.imgList=t.tempFilePaths}})},ViewImage:function(e){uni.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImg:function(e){this.imgList.splice(e.currentTarget.dataset.index,1)},SwitchD:function(e){this.switchD=e.detail.value},addake:function(){var t=this;if(this.textare.length<3)return o.msg("提问不符合要求"),!1;var a=new Date,i={};if(i["date"]=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate(),i["askid"]=o.userid,i["askname"]=o.userInfo["nickName"],i["askav"]=o.userInfo["avatarUrl"],i["ask"]=this.textare,i["amount"]=this.amount,this.switchD?i["ishideswitch"]=1:i["ishideswitch"]=0,e("log",i,"提交 DB"," at pages/ask/index.vue:142"),0==this.amount){var s=o.GET("check",{wxid:o.userid});return s.then((function(a){return e("log",a," at pages/ask/index.vue:153"),0==a.code?(o.Modal(a.msg),!1):(t.uploadImg(i),!1)})),!1}uni.login({success:function(t){var a=o.RndNum(4);e("log",a," at pages/ask/index.vue:172"),n.saveorder(a),uni.request({url:o.host+"/addons/epay/index/experience?code=".concat(t.code,"&amount=").concat(n.amount,"&type=wechat&orderid=").concat(a),success:function(t){if(e("log",t," at pages/ask/index.vue:180"),200===t.statusCode){var a=t.data;e("log","得到接口prepay_id",a," at pages/ask/index.vue:196"),uni.requestPayment({timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:"MD5",paySign:a.paySign,success:function(e){n.uploadImg(i)},fail:function(e){uni.showModal({content:"支付失败,原因为:订单被取消 ",showCancel:!1})},complete:function(){uni.hideLoading()}})}else uni.showModal({content:"支付失败，请重试！",showCancel:!1})},fail:function(e){uni.hideLoading(),uni.showModal({content:"支付失败,原因为:订单被取消 ",showCancel:!1})}})},fail:function(t){e("log","fail",t," at pages/ask/index.vue:233"),uni.hideLoading(),uni.showModal({content:"支付失败,原因为: "+t.errMsg,showCancel:!1})}})},saveorder:function(t){return(0,s.default)(regeneratorRuntime.mark((function a(){var i,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i={},i["wxid"]=o.userid,i["wxname"]=o.userInfo["nickName"],i["wximg"]=o.userInfo["avatarUrl"],i["orderid"]=t,i["type"]=1,a.next=8,o.GET("saveorder",i);case 8:n=a.sent,e("log",n,"完成"," at pages/ask/index.vue:264");case 10:case"end":return a.stop()}}),a)})))()},uploadImg:function(t){var a=this;return(0,s.default)(regeneratorRuntime.mark((function i(){var n,s,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return e("log",a.imgList," at pages/ask/index.vue:272"),n=o.delobj(a.imgList),i.next=4,o.localImgs2webImgs(n);case 4:return s=i.sent,a.up=s.join(","),e("log",a.up," at pages/ask/index.vue:278"),t["askimages"]=a.up,i.next=10,o.GET("saveask",t);case 10:c=i.sent,1==c.code&&(o.Modal("提交成功"),uni.navigateBack());case 12:case"end":return i.stop()}}),i)})))()},tabSelect:function(t,a){this.TabCur=t.currentTarget.dataset.id,this.amount=a,e("log",this.amount," at pages/ask/index.vue:292")}}};t.default=c}).call(this,a("0de9")["log"])},a525:function(e,t,a){"use strict";a.r(t);var i=a("0aa7"),n=a("2e89");for(var s in n)"default"!==s&&function(e){a.d(t,e,(function(){return n[e]}))}(s);a("61b8");var o,c=a("f0c5"),r=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"fa398270",null,!1,i["a"],o);t["default"]=r.exports},c677:function(e,t,a){var i=a("7857");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("693a3700",i,!0,{sourceMap:!1,shadowMode:!1})}}]);
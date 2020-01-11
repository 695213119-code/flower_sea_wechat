//请求通用工具类
const request = require('./utils/request.js');

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {

    /**
     * 判断用户是否授权,用户第一次使用该小程序时必须授权,以便获取到该微信用户的数据
     * 授权只需要一次
     */
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.login();
        } else {
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '../authorization/index'
          })
        }
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },

  /**
   * 全局数据
   */
  globalData: {
    userInfo: null,
    weChatCode: null,
    weChatUserInfo: null,
    openId: null,
  },

  /**
   * 全局函数:登录时使用
   */
  login: function() {
    var app = this;
    //获取用户的微信数据
    wx.getUserInfo({
      success: res => {
        app.globalData.weChatUserInfo = res.userInfo;
        console.log(app.globalData.weChatUserInfo);
        //微信code换取openId
        wx.login({
          success(res) {
            app.globalData.weChatCode = res.code;
            console.log("获取到的小程序的code:" + app.globalData.weChatCode)
            var getWeChatOpenIdUrl = '/apigateway/user-service/api/user/getWeChatOpenId';
            var getWeChatOpenIdParam = {
              weChatCode: app.globalData.weChatCode
            };
            request.get(getWeChatOpenIdUrl, getWeChatOpenIdParam).then((res) => {
              app.globalData.openId = res.data.openId;
              //openId登录
              var weChatAppletLoginUrl = '/apigateway/user-service/api/user/weChatAppletLogin';
              var weChatAppletLoginParam = {
                weChatOpenId: app.globalData.openId
              }
              request.get(weChatAppletLoginUrl, weChatAppletLoginParam).then((res) => {
                app.globalData.userInfo = res.data;
                //将用户的token存到缓存中
                wx.setStorageSync('userToken', res.data.userToken);
              }, (err) => {
                //状态码 1000表示该微信未绑定用户,跳转至 绑定用户页面进行用户的绑定操作
                if (err.code === 1000) {
                  wx.reLaunch({
                    url: '../bindingUser/index'
                  })
                } else {
                  wx.showToast({
                    title: err.message,
                    icon: 'none',
                    duration: 3000
                  })
                }
              })
            }, (err) => {
              wx.showToast({
                title: err.message,
                icon: 'none',
                duration: 3000
              })
            });
          }
        })
      }
    })
  }
})
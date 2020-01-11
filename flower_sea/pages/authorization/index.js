var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onAuth() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户已经同意授权")
          app.login();
          //获取用户的数据
          wx.reLaunch({
            url: '../myGoodFriend/index',
          })
        }
      }
    })
  }
})
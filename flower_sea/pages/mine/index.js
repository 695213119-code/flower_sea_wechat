var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:null,
    nickName:null,
    age:null,
    gender:null,
    birth:null,
    birthAnother:null 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("获取到的全局用户数据↓");
    console.log(app.globalData.userInfo);
    this.setData({
      avatar:app.globalData.userInfo.avatar,
      nickName:app.globalData.userInfo.nickName==null?'未设置':app.globalData.userInfo.nickName,
      age:app.globalData.userInfo.age==null?'未设置':app.globalData.userInfo.age,
      gender:app.globalData.userInfo.gender==0?'保密':app.globalData.userInfo.gender==1?'靓仔':'靓女',
      birth:app.globalData.userInfo.birth==null?'未设置':app.globalData.userInfo.birth,
      birthAnother:app.globalData.userInfo.birthAnother==null?'未设置':app.globalData.userInfo.birthAnother
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
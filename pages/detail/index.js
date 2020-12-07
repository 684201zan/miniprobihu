// pages/detail/index.js
const WXAPI = require('../../utils/request.js');
const imgUtil=require('../../utils/imgUtil.js');
const util = require('../../utils/util.js')
const app=getApp();
Page({
  data: {
    articleTitle:"",
    articleContent:"",
    userName:"",
    userIcon:"",
    creatime:"",
    updatime:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      WXAPI.getArticle2({artId:data.data}).then(res => {
        WXAPI.articleContent(res.data.content).then(resd => {
          that.setData({
            articleContent:imgUtil.formatRichText(resd),
            userName:res.data.userName,
            userIcon:app.globalData.imgBaseUrl+'/'+res.data.userIcon,
            creatime:util.formatTime(new Date(res.data.creatime)),
            updatime:util.formatTime(new Date(res.data.updatime)),
            articleTitle:res.data.title
          })
        })
      })
    })
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
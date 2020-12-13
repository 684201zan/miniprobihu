// pages/quotes/index.js
const WXAPI = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      quotesData:[],
      usdtPrice:6.5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    setInterval(function(){
      that.getList();
    },3000)
    
  },
  getList(){
    let that=this;
    WXAPI.tableRows({code: "defisswapcnt",json: true,limit: 1000,scope: "defisswapcnt",table: "markets"}).then((res)=>{
      let EOSprice=0;
      let datas=res.rows.filter((items) => {
        if(items.contract0=="eosio.token"&&items.contract1=="tethertether"){
          EOSprice=(items.reserve1.split(" ")[0]*1/items.reserve0.split(" ")[0]*1).toFixed(6)
        }
        return items.contract0=="eosio.token"
      }).map((item) => {
          if(item.reserve0.split(" ")[0]*1!=0&&item.reserve1.split(" ")[0]*1!=0){
            item.price=(item.reserve0.split(" ")[0]*1/item.reserve1.split(" ")[0]*1).toFixed(6)
          }else{
            item.price=0
          }
          item.jiaoyidui=item.reserve1.split(" ")[1]+"/"+item.reserve0.split(" ")[1]
          item.RMBprice=(item.price*EOSprice*that.data.usdtPrice).toFixed(6)
          return item;
      })
      that.setData({
        quotesData:datas
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
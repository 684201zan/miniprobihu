//index.js
const WXAPI = require('../../utils/request.js');
const { $Toast } = require('../../dist/base/index');
const app=getApp();
Page({
  data: {
    imgbaseSrc:"",
    pageNum:1,
    total:0,
    code:"", //搜索条件
    articleList:[]
  },
  onLoad: function () {
    this.setData({
      "imgbaseSrc":app.globalData.imgBaseUrl
    })
    this.getHotArtList()
  },
  getHotArtList(){
    let that=this,datasList=[];
    WXAPI.hotArtList({
      category: "recommend",
      code: this.data.code,
      pageNum:that.data.pageNum
    }).then(res => {
      if(res.resMsg=="success"){
        if(that.data.pageNum==1){
          datasList=res.data.list
        }else{
          datasList=that.data.articleList.concat(res.data.list)
        }
        that.setData({
          articleList:datasList,
          pageNum:res.data.pageNum,
          total:res.data.total
        })
      }else{
        $Toast({
          content: '获取热门文章失败',
          type: 'error'
        });
      }
    }).catch(error => {
      $Toast({
        content: '获取热门文章失败'||error,
        type: 'error'
      });
    })
  },
  lower(e) {
    let pageNo=this.data.total/20;
    if(this.data.pageNum>pageNo){
      $Toast({
        content: '暂无更多数据',
        type: 'error'
      });
    }else{
      this.setData({
        pageNum:this.data.pageNum+1
      })
      this.getHotArtList()
    } 
  },
  activeArt(event){
    wx.navigateTo({
      url: '/pages/detail/index',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data:event.currentTarget.dataset.id})
      }
    })
  },
  //搜索
  search(){
    console.log(this.data.code)
    this.setData({
      pageNum:1
    })
    this.getHotArtList();
  }

})

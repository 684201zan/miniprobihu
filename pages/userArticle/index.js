// pages/userArticle/index.js
const WXAPI = require('../../utils/request.js');
const { $Toast } = require('../../dist/base/index');
const util = require('../../utils/util.js')
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    imgbaseSrc:"",
    userId:"",
    userList:"",
    pageNum:1,
    fanspageNum:1, //粉丝列表分页
    followPageNum:1, //关注列表分页
    articleList:[],
    fansList:[], //粉丝列表
    followList:[], //关注列表
    total:0,
    spinShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:options.userId,
      imgbaseSrc:app.globalData.imgBaseUrl
    })
    this.getUserList();
    this.getUserArtList();
    this.getUserFansList();
    this.getUserFollowList();
  },
  /**
   * 获取作者信息
   */
  getUserList(){
    let that=this;
    WXAPI.userHomePage({queryUserId:that.data.userId}).then(res => {
      console.log(res)
      if(res.resMsg=="success"){
        that.setData({
          userList:res.data
        })
      }else{
        $Toast({
          content: '获取用户信息失败',
          type: 'error'
        });
      }
    })
  },
  /**
   * 获取作者中文章的信息
   */
  getUserArtList(){
    // challenge: "",
    // crash: 1,
    let that=this,datasList=[];
    WXAPI.getUserArtList({queryUserId:that.data.userId,pageNum:that.data.pageNum}).then(res => {
      if(res.resMsg=="success"){
        res.data.list.forEach((item,index) =>{
          item.createTime=util.formatTime(new Date(item.createTime))
        })
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
          content: '获取用户长文失败',
          type: 'error'
        });
      }
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
      this.getUserArtList()
    } 
  },
  lowerfans(e){
    let pageNo=this.data.userList.fans/20;
    if(this.data.fanspageNum>pageNo){
      $Toast({
        content: '暂无更多数据',
        type: 'error'
      });
    }else{
      this.setData({
        fanspageNum:this.data.fanspageNum+1
      })
      this.getUserFansList()
    } 
  },
  lowerfoller(e){
    let pageNo=this.data.userList.follows/20;
    if(this.data.followPageNum>pageNo){
      $Toast({
        content: '暂无更多数据',
        type: 'error'
      });
    }else{
      this.setData({
        followPageNum:this.data.followPageNum+1
      })
      this.getUserFollowList()
    } 
  },
  /**
   * 点击文章查看详情
   */
  activeArt(event){
    wx.navigateTo({
      url: '/pages/detail/index',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data:event.currentTarget.dataset.id})
      }
    })
  },
  /**
   * 点击事件
   */
  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
  },
  /**
   * 获取粉丝列表
   */
  getUserFansList(){
    let that=this,datasList=[];
    WXAPI.getUserFansList({queryUserId:that.data.userId,pageNum:that.data.fanspageNum}).then(res => {
      if(res.resMsg=="success"){
        if(that.data.fanspageNum==1){
          datasList=res.data.list
        }else{
          datasList=that.data.fansList.concat(res.data.list)
        }
        that.setData({
          fansList:datasList,
          fanspageNum:res.data.pageNum
        })
      }else{
        $Toast({
          content: '获取粉丝列表失败',
          type: 'error'
        });
      }
    })
  },
  /**
   * 获取关注列表
   */
  getUserFollowList(){
    let that=this,datasList=[];
    WXAPI.getUserFollowList({queryUserId:that.data.userId,pageNum:that.data.followPageNum}).then(res => {
      console.log(res)
      if(res.resMsg=="success"){
        if(that.data.followPageNum==1){
          datasList=res.data.list
        }else{
          datasList=that.data.followList.concat(res.data.list)
        }
        that.setData({
          followList:datasList,
          followPageNum:res.data.pageNum
        })
      }else{
        $Toast({
          content: '获取关注列表失败',
          type: 'error'
        });
      }
    })
  }
})
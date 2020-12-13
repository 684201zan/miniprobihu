// 币乎接口，后期转换为自己的接口
const baseUrl="https://be02.bihu.com"
const articleUrl="https://oss02.bihu.com"
//eos行情接口
const eosUrl="https://eos.blockeden.cn"
//请求dfs的接口
const eosrequest=function(url,method,data){
  let _url;
   _url=eosUrl+"/"+url
  return new Promise((resolve,reject) => {
    wx.request({
      url: _url, //仅为示例，并非真实的接口地址
      method:method,
      data:data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        resolve(res.data)
      },
      fail(error){
        reject(error)
      }
    })
  })
}

//请求币乎的接口
const request=function(url,method,data,baseUrls){
  let _url;
  if(baseUrls==articleUrl){
    _url=baseUrls+"/"+data
  }else{
    _url = baseUrls+ '/bihube-pc/api/'+url
  }
  return new Promise((resolve,reject) => {
    wx.request({
      url: _url, //仅为示例，并非真实的接口地址
      method:method,
      data:data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        resolve(res.data)
      },
      fail(error){
        reject(error)
      }
    })
  })
}

module.exports={
  baseUrl,
  request,
  eosrequest,
  hotArtList:data => request("content/show/hotArtList",'post',data,baseUrl),
  newestArtList:data => request("content/show/newestArtList",'post',data,baseUrl),
  getArticle2:data =>request("content/show/getArticle2","post",data,baseUrl),
  userHomePage:data =>request("content/show/userHomePage","post",data,baseUrl),
  getUserArtList:data => request("content/show/getUserArtList","post",data,baseUrl),
  getUserFollowList:data => request("content/show/getUserFollowList","post",data,baseUrl),
  getUserFansList:data => request("content/show/getUserFansList","post",data,baseUrl), 
  articleContent:data => request("","get",data,articleUrl),
  tableRows:data => eosrequest("v1/chain/get_table_rows","post",data)
}



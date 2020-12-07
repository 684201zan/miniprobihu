

const baseUrl="https://be02.bihu.com"
const articleUrl="https://oss02.bihu.com"

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
  hotArtList:data => request("content/show/hotArtList",'post',data,baseUrl),
  newestArtList:data => request("content/show/newestArtList",'post',data,baseUrl),
  getArticle2:data =>request("content/show/getArticle2","post",data,baseUrl),
  articleContent:data => request("","get",data,articleUrl)
}



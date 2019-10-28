'use strict'
import Utils from '@/utils/utils'
import Global from "@/baseconfig/global_variable"

var OSS = require('ali-oss')

export default {
  /**
   * 创建oss客户端对象
   * @returns {*}
   */
  createOssClient () {
    return new Promise((resolve, reject) => {
      let client = new OSS({
        region: Global.aliOssConfig.region,
        accessKeyId: Global.aliOssConfig.accessKeyId,
        accessKeySecret: Global.aliOssConfig.accessKeySecret,
        bucket: Global.aliOssConfig.bucket
      })
      resolve(client)
    })
  },
  /**
   * 文件上传
   * @param option 参考csdn: https://blog.csdn.net/qq_27626333/article/details/81463139
   */
  ossUploadFile (option) {
    let file = option.file
    const self = this
    return new Promise((resolve, reject) => {     
      let fileName = this.setfileName(file,"Files/branch/")
      // 执行上传
      self.createOssClient().then(client => {
        // 异步上传,返回数据
        resolve({
          fileName: file.name,
          fileUrl: fileName
        })
        // 上传处理
        // 分片上传文件
        client.multipartUpload(fileName, file, {            
          progress: function (p) {           
            let e = {}
            e.percent = Math.floor(p * 100)          
            option.onProgress(e)
          }
        })
        //client.put(fileName, file)//直接上传不分片
        .then((val) => {
          // console.info(val)
          if (val.res.statusCode === 200) {
            option.onSuccess(val)
            return val
          } else {
            option.onError('上传失败')
          }
        }, err => {
          option.onError('上传失败')
          reject(err)
        })
      })
    })
  },
  //删除
  delFile(filename)
  {  
    //console.log("删除文件："+filename);
     if(filename!=null)
     {
        return new Promise((resolve, reject) =>{
            this.createOssClient().then(client =>{
                client.delete(filename);//删除oss文件           
                resolve("删除成功");
            },(err)=>{
                reject(err);    
            })
        })
     }

  },
  /**
   * @description [设置文件目录及文件名]
   * @param {Object} file [文件对象]
   * @param {String} directory [OSS目录]
   */
  setfileName(file,directory){
    let date = Utils.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
    let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
    let randomStr = Utils.randomString(4)//  4位随机字符串
    let extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
    let fName = directory + date + '/' + dateTime + '_' + randomStr + extensionName // 文件名字（相对于根目录的路径 + 文件名）
    return fName;
  },
   /**
   * @description [重设文件名]
   * @param {String} fileName [原文件名]
   */
  resetFileName(fileName){
    let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
    let randomStr = Utils.randomString(4)//  4位随机字符串
    let extensionName = fileName.substr(fileName.indexOf('.')) // 文件扩展名
    let fName = dateTime + '_' + randomStr + extensionName // 文件名字
    return fName;
  }
}
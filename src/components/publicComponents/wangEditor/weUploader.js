import oss from "@/components/publicComponents/aliOss/aliOss"
import Global from "@/baseconfig/global_variable"
import plupload from "plupload"

var g_object_name, new_multipart_params

  const  OSSConfig= {
        ossParams : {
            key: '', // key后面有用，先默认设空字符串
            success_action_status:'200', // 默认200
            accessKeyId: Global.aliOssConfig.accessKeyId,
            accessKeySecret:Global.aliOssConfig.accessKeySecret,
            bucket: Global.aliOssConfig.bucket,
            host: Global.aliOssAdd,
        }
    }         
     
    function set_upload_param(up, filename, ret) {       
        let Base64 = require('js-base64').Base64;
        let Crypto = require("crypto-js")
       
        g_object_name = OSSConfig.ossParams.key
        //console.log(filename)
        if (filename != '')          
            g_object_name = oss.resetFileName(filename)
        
        //console.log(g_object_name)
        var policyText = {
            expiration: '2025-01-01T12:00:00.000Z', //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            conditions: [
                ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
            ],
        }
        var policyBase64 = Base64.encode(JSON.stringify(policyText))
        let message = policyBase64     
        var bytes = Crypto.HmacSHA1(message,OSSConfig.ossParams.accessKeySecret) 
        var signature = Crypto.enc.Base64.stringify(bytes)

        new_multipart_params = {
            key: "Files/other/"+g_object_name,           
            policy: policyBase64,
            OSSAccessKeyId: OSSConfig.ossParams.accessKeyId,
            success_action_status: 200, //让服务端返回200,不然，默认会返回204
            bucket: OSSConfig.ossParams.bucket,
            signature: signature,
        }
     
        up.setOption({
            url: OSSConfig.ossParams.host,
            multipart_params: new_multipart_params,
        })
     
        up.start()
    }    
   
    var UPLOADER  = editor =>{
        let uploader = new plupload.Uploader ({
            runtimes: 'html5,flash,silverlight,html4', //上传模式,依次退化
            browse_button: editor.imgMenuId,       //上传选择的点选按钮，**必需**
            multi_selection: true,
            auto_start: true,
            url:OSSConfig.ossParams.host,
           
            filters: {
                mime_types: [
                    //只允许上传图片和zip,rar文件
                    {title: 'Image files', extensions: 'jpg,jpeg,gif,png,bmp'},
                    //{title: 'video files', extensions: 'mp4,3gp'},
                ],
                max_file_size: '5mb', //最大只能上传5mb的文件
                prevent_duplicates: true, //不允许选取重复文件
            },
            init:{
                PostInit: function() {                   
                    set_upload_param(uploader, '', false)
                    return false
    
                },
                BeforeUpload: function(up, file) {
                    set_upload_param(up, file.name, true)
                },
    
                FilesAdded: function(up) {
                    up.start() //选择完后直接上传
                },
                FileUploaded: function(up, file, info) {
                    if (info.status == 200) {
                        var file_type = file.type
                        var is_image = file_type.indexOf('image')
                        var is_video = file_type.indexOf('video')
                        if (is_image > -1) {
                            editor.cmd.do(
                                'insertHtml',
                                '<img src="' +
                                    OSSConfig.ossParams.host+"Files/other/"+
                                    g_object_name +
                                    '" style="width: auto; max-width:100%;"/>',
                            )
                        }
     
                        // if (is_video > -1) {
                        //     editor.cmd.do(
                        //         'insertHtml',
                        //         '<video controls src="' +
                        //             _this.ossParams.host +
                        //             _this.g_object_name +
                        //             '" style="width: auto; max-width:100%;"></video>',
                        //     )
                        // }
                    } else {                        
                        alert(info.response)                       
                    }
                },
                Error: function(up, err) {
                    if (err.code == -600) {
                        alert('\n选择的文件不能大于5MB')                  
                    } else if (err.code == -601) {
                        alert('\n不允许上传此类文件')                        
                    } else if (err.code == -602) {
                        alert('\n此文件已存在，不允许重复上传')                       
                    } else {                       
                        alert('\nError xml:' + err.response)
                    }
                },
                UploadProgress:function(up,file){
                     // 显示进度条
                     //showUploadProgress(file.percent);
                }
            }
        })
        return uploader;
    }

    export {UPLOADER}
   


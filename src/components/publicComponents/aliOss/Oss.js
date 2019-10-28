'use strict'
import Utils from '@/utils/utils'

var OSS = require('ali-oss')
export default {
    /**
   * 创建oss客户端对象
   * @returns {*}
   */
  ossClient () {
    return new Promise((resolve, reject) => {
      let client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAIeKNib1PAn3vL',
        accessKeySecret: 'AlniPLIiLFlDvRp5jz8VF3XNiSZWuI ',
        bucket: 'kzllhtest'
      })
      resolve(client)
    })
  },
}
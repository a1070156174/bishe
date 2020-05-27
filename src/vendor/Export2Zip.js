/*
 * @Author: your name
 * @Date: 2020-04-30 00:18:59
 * @LastEditTime: 2020-04-30 00:19:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\vendor\Export2Zip.js
 */
/* eslint-disable */

require('script-loader!file-saver');

import JSZip from 'jszip'

export function export_txt_to_zip(th, jsonData, txtName, zipName) {

  const zip = new JSZip()

  const txt_name = txtName || 'file'

  const zip_name = zipName || 'file'

  const data = jsonData

  let txtData = `${th}\r\n`

  data.forEach((row) => {

    let tempStr = ''

    tempStr = row.toString()

    txtData += `${tempStr}\r\n`

  })

  zip.file(`${txt_name}.txt`, txtData)

  zip.generateAsync({type:"blob"}).then((blob) => {

    saveAs(blob, `${zip_name}.zip`)

  }, (err) => {

    alert('导出失败')

  })

}

const identification = {
  // 将图片转为base64格式
  transformBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        resolve(e.target.result)
      }
    })
  }
}

export default identification

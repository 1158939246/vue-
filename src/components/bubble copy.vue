<template>
  <div style="height:100vw;width:100vh;position:absolution;background:black" id="bubbleBack">
    <canvas width="400" height="400"></canvas>
  </div>
</template>
<script>
export default {
  mounted() {
    var oc = document.querySelector('canvas')
    if (oc.getContext) {
      var ctx = oc.getContext('2d')
      // 定义一个数组，用来保存canvas中各个圆的信息；
      var arr = []
      //随机取出数组中的圆，绘制在canvas中；
      setInterval(function () {
        for (var i = 0; i < arr.length; i++) {
          if (!arr[i].isClick) {
            arr[i].r += 0.02
            arr[i].x -= arr[i].xRandom
            arr[i].y -= arr[i].yRandom
            // arr[i].apl -= 0.05
            if (
              arr[i].x <= 0 ||
              arr[i].x > 400 ||
              arr[i].y < 0 ||
              arr[i].y > 400
            ) {
              arr.splice(i, 1)
            }
          } else {
            arr[i].r += 0.2
            arr[i].x -= arr[i].xRandom
            arr[i].y -= arr[i].yRandom
            arr[i].apl -= 0.05
            if (
              arr[i].x <= 0 ||
              arr[i].x > 400 ||
              arr[i].y < 0 ||
              arr[i].y > 400 ||
              arr[i].apl < 0
            ) {
              arr.splice(i, 1)
            }
          }
        }
        ctx.clearRect(0, 0, oc.width, oc.height)
        for (var i = 0; i < arr.length; i++) {
          ctx.save()
          ctx.fillStyle =
            'rgba(' +
            arr[i].red +
            ',' +
            arr[i].green +
            ',' +
            arr[i].blue +
            ',' +
            0.5 +
            ')'
          ctx.shadowColor ="white"
          ctx.shadowBlur=20
          ctx.beginPath()
          ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI)
          ctx.fill()
          ctx.restore()
        }
      }, 1000 / 60)
      // 向数组中随机注入圆的信息；
      setInterval(function () {
        var red = Math.round(Math.random() * 255)
        var green = Math.round(Math.random() * 255)
        var blue = Math.round(Math.random() * 255)
        var apl = 0.8
        var x = Math.random() * oc.width
        var y = Math.random() * oc.height
        var r = 10
        let yRandom = Math.floor(Math.random() * 10) / 10
        let xRandom = (Math.floor(Math.random() * 10) - 5) % yRandom
        if (arr.length < 30)
          arr.push({
            red: red,
            green: green,
            blue: blue,
            apl: apl,
            x: x,
            y: y,
            r: r,
            yRandom,
            xRandom,
            isClick: false,
          })
      }, 100)
      let oDiv = document.getElementById('bubbleBack')
      let rateX = oc.width / oDiv.clientWidth
      let rateY = oc.height / oDiv.clientHeight
      oc.addEventListener('click', (el) => {
        let x = el.offsetX * rateX
        let y = el.offsetY * rateY
        arr.forEach((ele) => {
          let a = x - ele.x
          let b = y - ele.y
          if (Math.sqrt(a * a + b * b) < ele.r) {
            ele.isClick = true
          }
        })
      })
    }
  },
}
</script>
<style lang="scss" scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
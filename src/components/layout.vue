<template>
  <div id="content">
    <video id="video" width="720" height="560" autoplay muted></video>
  </div>
</template>
<script>
import '../util/face-api.min.js'
export default {
  mounted() {
    const video = document.getElementById('video')

    const starVideo = () => {
      navigator.getUserMedia(
        { video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.log(err)
      )
    }
    console.log(faceapi)
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(
        'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
      ),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
      ),
      faceapi.nets.faceExpressionNet.loadFromUri(
        'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'
      ),
    ]).then(starVideo())

    video.addEventListener('play', () => {
      const canvas = faceapi.createCanvasFromMedia(video)
      document.getElementById('content').append(canvas)

      const displaySize = {
        width: video.width,
        height: video.height,
      }
      faceapi.matchDimensions(canvas, displaySize)

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
        console.log(detections)
        if (detections.length) {
          const resizeDetections = faceapi.resizeResults(
            detections,
            displaySize
          )
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizeDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
          faceapi.draw.drawFaceExpressions(canvas, resizeDetections)
        }
      }, 100)
    })
  },
}
</script>
<style lang="scss" scoped>
#content {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#video {
  position: absolute;
  z-index: -1;
  /* background-color: white; */
}
</style>
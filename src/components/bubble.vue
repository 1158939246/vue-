<template>
  <div class="bubble">
    <section></section>
  </div>
</template>
<script>
export default {
  mounted() {
    const section = document.querySelector('section')
    function createBubble() {
      const createElement = document.createElement('span')
      var size = Math.random() * 60
      createElement.style.width = size + 'px'
      createElement.style.height = size + 'px'
      createElement.style.left = Math.random() * innerWidth + 'px'
      createElement.addEventListener('click', (el) => {
        createElement.remove()
      })
      section.appendChild(createElement)
      setTimeout(() => {
        createElement.remove()
      }, 4000)
    }

    setInterval(createBubble, 100)
  },
}
</script>
<style lang="scss" >
.bubble {
  margin: 0;
  padding: 0;
}
.bubble section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bubble section span {
  position: absolute;
  bottom: 50px;
  background: transparent;
  border-radius: 50%;
  // pointer-events: none;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
  animation: animate 4s linear infinite;
}

.bubble section span:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(0.25) translate(-70%, -70%);
  background: radial-gradient(#fff, transparent);
  border-radius: 50%;
}

@keyframes animate {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    transform: translateY(-1200%);
    opacity: 0;
  }
}
</style>
<template>
  <div class="image">
    <p class="image__title">{{ title }}</p>
    <!-- <img class="image__content" :src="$props.src" /> -->
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { watch } from 'fs'
import { IdCardImageInput } from 'idCard'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'IdCardImage',
  props: {
    isFont: {
      type: Boolean,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    idCardInfo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    console.log(props.idCardInfo)
    onMounted(() => {
      const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
      const context: CanvasRenderingContext2D = canvasElement.getContext('2d') || new CanvasRenderingContext2D()
      const image = new Image(1200)
      image.onload = () => {
        context.drawImage(image, 0, 0)
        context.font = '18px serif'
        context.fillStyle = '#fff'
        context.fillText(props.idCardInfo.name, 0, 60)
      }
      image.src = 'https://pica.zhimg.com/v2-0bd3e8d457b3510bcae1b8923cfff630_1440w.jpg'
    })

    const title = computed(() => {
      return props.isFont ? '国徽面' : '人像面'
    })

    return {
      title
    }
  }
})
</script>

<style lang="less" scoped>
.image {
  &__title {
    text-align: left;
  }
  &__content {
    width: 800px;
  }
}
</style>

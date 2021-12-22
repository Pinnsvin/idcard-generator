<template>
  <div class="image">
    <p class="image__title">{{ title }}</p>
    <!-- <img class="image__content" :src="$props.src" /> -->
    <canvas class="image__canvas" id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { watch } from 'fs'
import { nextTick } from 'process'
import { computed, defineComponent } from 'vue'

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
  // back https://s3.bmp.ovh/imgs/2021/12/cc3873a71e9edb05.png
  // font https://s3.bmp.ovh/imgs/2021/12/10f6c7697fc2943c.png
  setup(props) {
    console.log(props.idCardInfo)
    const dateStr = computed(() => {
      if (props.idCardInfo.validityType === '3') {
        return '长期有效'
      }
      return props.idCardInfo.startDate.replaceAll('-', '.') + '-' + props.idCardInfo.endDate.replaceAll('-', '.')
    })
    nextTick(() => {
      const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
      canvasElement.width = 600
      canvasElement.height = 378
      const context: CanvasRenderingContext2D = canvasElement.getContext('2d') || new CanvasRenderingContext2D()
      const image = new Image(1200)
      image.onload = () => {
        context.drawImage(image, 0, 0, canvasElement.width, canvasElement.height)
        context.font = '20px serif'
        context.fillStyle = '#000'
        context.fillText(props.idCardInfo.office, 260, 287)
        context.fillText(dateStr.value, 260, 330)
      }
      image.src = 'https://s3.bmp.ovh/imgs/2021/12/10f6c7697fc2943c.png'
    })

    const title = computed(() => {
      return props.isFont ? '国徽面' : '人像面'
    })

    watch(() => props.idCardInfo, (newValue, oldValue) => {
      console.log(newValue, oldValue)
    }, { deep: true })

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
  &__canvas {
    display: block;
  }
}
</style>

<template>
  <div class="image">
    <p class="image__title">{{ title }}</p>
    <img class="image__content" :src="$props.src" />
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: '',
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
      type: Object
    }
  },
  setup(props) {
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

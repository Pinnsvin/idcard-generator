<template>
  <div class="left-form" ref="form">
    <el-form :inline="true" size="mini" label-width="90px" label-position="left" label-suffix=":">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formData.idCard" placeholder="身份证号" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.adress" placeholder="地址" />
      </el-form-item>
      <el-form-item label="有效期起期">
        <el-date-picker
          v-model="formData.startDate"
          type="date"
          placeholder="有效期起期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="有效期类型">
        <el-select v-model="formData.validityType" placeholder="有效期类型">
          <el-option
            v-for="item in validityTypeOptions"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期止期">
        <el-date-picker
          v-model="formData.endDate"
          type="date"
          placeholder="有效期止期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="content">
    <div class="content__image">
      <span class="demonstration">国徽面</span>
      <el-image :src="imageData.fontImage" fit="contain"></el-image>
    </div>
    <div class="content__image">
      <span class="demonstration">人像面</span>
      <el-image :src="imageData.backImage" fit="contain"></el-image>
    </div>
  </div>
</template>

<script lang="ts">
import IdcardConstant from '@/constant/idcard'
import { IdCardImageInput } from 'idCard'
import { defineComponent, onMounted, reactive } from 'vue'

export default defineComponent({

  setup() {
    const formData = reactive<IdCardImageInput>({
      name: '',
      idCard: '',
      adress: '',
      validityType: '',
      startDate: '',
      endDate: ''
    })

    const validityTypeOptions = IdcardConstant.validityTypeData
    const imageData = reactive({
      fontImage: '',
      backImage: ''
    })

    const onSubmit = (): void => {
      console.log('生成中...')
    }

    onMounted(() => {
      onSubmit()
    })

    return {
      validityTypeOptions,
      formData,
      imageData,
      onSubmit
    }
  }
})

</script>

<style lang="less" scoped>
.left-form {
  float: left;
  width: 320px;
  height: 100%;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}
.content {
  margin-left: 380px;
  // height: 800px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}
.el-button {
  width: 95px;
  margin-bottom: 10px;
}
</style>

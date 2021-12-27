<template>
  <div class="left-form" ref="form">
    <el-form :inline="true" size="mini" label-width="90px" label-position="left" label-suffix=":">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="formData.nation" placeholder="民族" />
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formData.idCard" placeholder="身份证号" @change="onChangeIdCard" />
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="state.sexText" placeholder="性别" disabled />
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="formData.address" placeholder="住址" />
      </el-form-item>
      <el-form-item label="签发机关">
        <el-input v-model="formData.office" placeholder="签发机关" />
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
        <el-select
          v-model="formData.validityType"
          placeholder="有效期类型"
          @change="onChangeValidityType"
        >
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
        <el-button type="primary" @click="onInit">初始化</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="content">
    <IdCardImage
      :idCardInfo="formData"
      :fontSrc="imageData.fontImage"
      :backSrc="imageData.backImage"
    ></IdCardImage>
  </div>
</template>

<script lang="ts">
import IdcardConstant from '@/constant/idcard'
import { getSexFromIdCard } from '@/utils/IdCardUtils'
import { IdCardImageInput } from 'idCard'
import { defineComponent, onMounted, reactive } from 'vue'
import IdCardImage from '@/components/IdCardImage.vue'

function getNowDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  return `${year}-${month}-${date}`
}

function addDate(startDate: string, num: number): string {
  const sDate = new Date(startDate)
  const year = sDate.getFullYear()
  const month = sDate.getMonth() + 1
  const date = sDate.getDate()
  const newYear = year + num
  return `${newYear}-${month}-${date}`
}
export default defineComponent({
  components: {
    IdCardImage
  },
  props: {
    name: {
      type: String
    },
    idCard: {
      type: String
    }
  },
  setup(props) {
    console.log(props)
    const initFormData = {
      name: props.name || '',
      nation: '汉',
      idCard: props.idCard || '',
      address: '北京市东城区长安街一号院',
      office: '北京市公安局',
      validityType: '1',
      startDate: getNowDate(),
      endDate: addDate(getNowDate(), 5)
    }

    const formData = reactive<IdCardImageInput>({
      name: initFormData.name,
      nation: initFormData.nation,
      idCard: initFormData.idCard,
      address: initFormData.address,
      office: initFormData.office,
      validityType: initFormData.validityType,
      startDate: initFormData.startDate,
      endDate: initFormData.endDate
    })

    const state = reactive({
      sexText: ''
    })

    const validityTypeOptions = IdcardConstant.validityTypeData
    const imageData = reactive({
      fontImage: require('@/assets/image/color/font.png'),
      backImage: require('@/assets/image/color/back.png')
    })

    const onChangeIdCard = (value: string): void => {
      if (value != null && value.length === 18) {
        const sex = getSexFromIdCard(value)
        state.sexText = IdcardConstant.getSexByValue(sex)?.text as string
      }
    }

    const onChangeValidityType = (value: string): void => {
      switch (value) {
        case '1':
          formData.endDate = addDate(formData.startDate, 5)
          break
        case '2':
          formData.endDate = addDate(formData.startDate, 10)
          break
        default:
          formData.endDate = ''
          break
      }
    }

    const onSubmit = (): void => {
      console.log('生成中...')
    }

    const onInit = (): void => {
      formData.name = initFormData.name
      formData.nation = initFormData.nation
      formData.idCard = initFormData.idCard
      formData.address = initFormData.address
      formData.office = initFormData.office
      formData.validityType = initFormData.validityType
      formData.startDate = initFormData.startDate
      formData.endDate = initFormData.endDate
    }

    onMounted(() => {
      onChangeIdCard(props.idCard as string)
    })

    return {
      validityTypeOptions,
      formData,
      imageData,
      state,
      onChangeIdCard,
      onChangeValidityType,
      onSubmit,
      onInit
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
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
  &__image {
    &__title {
      text-align: lfet;
    }
  }
}
.el-button {
  width: 95px;
  margin-bottom: 10px;
}
</style>

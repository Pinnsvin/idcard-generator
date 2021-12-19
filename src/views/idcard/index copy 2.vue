<template>
  <div class="left-form" ref="form">
    <el-form :inline="true" size="mini" label-width="90px" label-position="left">
      <el-form-item label="年龄：">
        <el-input-number v-model="form.value.age" :min="1" :max="100" placeholder="年龄" />
      </el-form-item>
      <el-form-item label="出生日期：">
        <el-date-picker
          v-model="form.value.birthday"
          type="date"
          placeholder="出生日期"
          format="YYYY-MM-DD"
          value-format="YYYYMMDD"
        />
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio v-model="form.value.sex" label="0">男</el-radio>
        <el-radio v-model="form.value.sex" label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="地区代码：">
        <el-input v-model="form.value.areaCode" placeholder="地区代码" />
        <el-cascader
          v-model="form.value.areaCode"
          :options="areaOptions"
          :props="areaPropsOption"
          :show-all-levels="false"
          placeholder="地区代码"
          clearable
          filterable
        />
      </el-form-item>
      <el-form-item label="生成个数：">
        <el-input-number v-model="form.value.number" :min="1" :max="100" placeholder="生成个数" />
      </el-form-item>
      <el-form-item label="关系：">
        <el-input v-model="form.value.relation" placeholder="关系" />
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="onSubmit">生成</el-button>
        <el-button type="primary" @click="onSubmitWithFamily">我&妻&女&子</el-button>
        <el-button type="primary" @click="onSubmitWithParent">我&父母</el-button>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="onSubmitWithBigFamily">四世同堂(8人)</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="content">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="relation" label="关系" width="180" />
      <el-table-column prop="name" label="名字" width="180" />
      <el-table-column prop="idCard" label="身份证号码" width="180" />
      <el-table-column prop="sex" label="性别" width="180" />
      <el-table-column prop="birthday" label="出生日期" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import IdcardConstant from '@/constant/idcard'
import { IdCardInfo, IdCardInput } from 'idCard'
import { generateIdCardInfo } from '@/utils/IdCardUtils'
import { Ref, ref } from 'vue'

export default class IdCard extends Vue {
  form: Ref<IdCardInput> = ref({
    age: 20,
    sex: '0',
    areaCode: '110101',
    birthday: '20001010',
    number: 10,
    relation: ''
  })

  age = 20
  sex = '0'
  areaCode = '110101'
  birthday = '20001010'
  number = 10
  relation = ''

  areaOptions = IdcardConstant.cities
  areaPropsOption = {
    value: 'code',
    label: 'name',
    children: 'child'
  }

  tableData: Array<IdCardInfo> = []

  public handleChangeNumber(value: number, oldValue: number): void {
    console.log(value, oldValue)
  }

  public onSubmit(): void {
    console.log('生成中...')
    this.tableData.push(generateIdCardInfo(this.form.value))
    console.log(this.tableData)
  }

  public onSubmitWithFamily(): void {
    console.log('家庭...')
  }

  public onSubmitWithParent(): void {
    console.log('parent...')
  }

  public onSubmitWithBigFamily(): void {
    console.log('四世同堂...')
  }
}
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
  height: 800px;
  padding: 20px;
  box-shadow: var(--el-box-shadow-light);
}
.el-button {
  width: 95px;
  margin-bottom: 10px;
}
</style>

<template>
  <el-menu
    :default-active="active"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :default-openeds="['basic']"
    router
  >
    <el-menu-item :index="menu.router" v-for="(menu, index) in menus" :key="index">{{ menu.text }}</el-menu-item>
  </el-menu>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component'

interface MenuInfo {
  text: string
  router: string
}

export default class HeaderMenu extends Vue {
  active = '/idcard';
  menus: MenuInfo[] = [
    {
      text: '身份证生成',
      router: '/idcard'
    }, {
      text: '身份证照片生成',
      router: '/idcard-image'
    }, {
      text: '关于',
      router: '/about'
    }
  ];

  public handleSelect (key: any, keyPath: any):void {
    console.log(key, keyPath)
    this.active = key
  }
}
</script>

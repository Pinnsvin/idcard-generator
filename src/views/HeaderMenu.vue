<template>
  <el-menu
    :default-active="active"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
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
  active = '/about';
  menus: MenuInfo[] = [
    {
      text: '身份证生成',
      router: '/about'
    }
  ];

  public handleSelect (key: any, keyPath: any):void {
    console.log(key, keyPath)
    this.active = key
  }
}
</script>

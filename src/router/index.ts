import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import IdCard from '../views/idcard/index.vue'
import IdCardImage from '@/views/idcard/image.vue'
import About from '@/views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/idcard',
        name: '身份证生成',
        components: {
          default: IdCard
        }
      },
      {
        path: '/idcard-image',
        name: '身份证照片生成',
        components: {
          default: IdCardImage
        }
      },
      {
        path: '/about',
        name: '关于',
        components: {
          default: About
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

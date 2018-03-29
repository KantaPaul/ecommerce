import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import SingleBlog from '@/components/SingleBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/:id',
      name: 'SingleBlog',
      component: SingleBlog
    }
  ]
})

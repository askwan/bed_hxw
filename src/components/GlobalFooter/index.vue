<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.baidu.com" target="_blank">帮助</a>
      <a href="https://www.baidu.com" target="_blank">隐私</a>
      <a href="https://www.baidu.com" target="_blank">条款</a>
    </template>
    <template v-slot:copyright>
      <div class="copyright">
        Copyright &copy; 2020 <a href="https://www.baidu.com" target="_blank">中科院计算所南京研究院</a>
      </div>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>

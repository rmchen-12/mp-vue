<template>
    <text :class="classes" :style="styles"></text>
</template>

<script>
const prefixCls = 'iconfont icon-'
import {objStyle} from '@/utils'
export default {
  name: "icon",
  props: {
    type: String,
    size:[Number,String],
    color:String
  },
  computed: {
    classes(){
        return `${prefixCls}${this.type}`
    },
    styles(){
        let style = {}
        if (this.size) {
            style['font-size'] = `${this.size}px`
        }
        if (this.color) {
            style.color = this.color
        }
        return objStyle(style)
    }
  }
};
</script>

<style scoped>
@import '../../../static/iconfont.css';
</style>

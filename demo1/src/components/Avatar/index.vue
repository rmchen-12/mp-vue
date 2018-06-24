<style scoped lang="scss">
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

</style>

<template>
  <div class="avatar" :style="style" @tap.stop="goUser">
    <img :src="user.avatar_url" alt="用户头像">
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      user: {
        type: Object,
        required: true
      },
      size: {
        type: Number
      }
    },
    computed: {
      style() {
        if (!this.size) return ''
        else {
          let style = {}
          let str = []
          if (this.size) {
            style['width'] = `${this.size}px`
            style['height'] = `${this.size}px`
          }
          Object.keys(style).forEach(key => {
            str.push(`${key}:${style[key]};`)
          });
          return str.join(';')
        }
      },
      href() {
        return '/pages/user/main?id=' + this.user.loginname
      }
    },
    methods: {

      goUser() {
        wx.navigateTo({
          url: this.href
        })
      }
    }
  }

</script>

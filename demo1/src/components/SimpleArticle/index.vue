<style scoped lang="scss">
  .feed-content {
    margin-top: 0;
    display: flex;
    font-size: 14px;
    padding: 14px;
    align-items: center;
    border-bottom: 1px solid $grey-border;
    .feed-right {
      flex: 1;
      min-width: 0;
      margin-left: 8px;
      .feed-right-top {
        p{
          font-size: 14px;
          line-height: 24px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .feed-right-bottom{
        display: flex;
        justify-content: space-between;
        .feed-time{
          font-size: 12px;
          color: #666666;
        }
        .feed-pass{
          font-size: 13px;
        }
      }
    }
  }

</style>

<template>
  <div class="feed-content" @tap="goArticle">
    <avatar v-if="article" :user="article.author"></avatar>
    <div class="feed-right">
      <div class="feed-right-top">
        <div class="feed-title">
          <p>{{article.title}}</p>
        </div>
      </div>
      <div class="feed-right-bottom" v-if="article">
        <div class="feed-time">
          <span>{{article.author.loginname}}</span>
        </div>
        <div class="feed-pass">
          1个月前
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import avatar from '@/components/Avatar'
  export default {
    data() {
      return {

      }
    },
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    components: {
      avatar
    },
    computed: {

    },
    created() {

    },
    methods: {
      goArticle() {
        wx.navigateTo({
          url: '/pages/article/main?id=' + this.article.id
        })
      }
    }
  }

</script>

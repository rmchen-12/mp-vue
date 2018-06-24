<style scoped lang="scss">
  .feed-label {
    font-size: 12px;
    border-radius: 4px;
    padding: 0 5px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    &.feed-label-other {
      background-color: #e3e3e3;
      color: #333333;
    }
  &.feed-label-top{
    background-color: $light-color;
    color: #ffffff;
  }
  }

</style>

<template>
  <div class="feed-label feed-label-top" v-if="item.top">
    置顶
  </div>
  <div class="feed-label feed-label-top" v-else-if="item.good">
    精华
  </div>
  <div class="feed-label feed-label-other" v-else>
    {{type}}
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    components: {

    },
    computed: {
      type() {
        return this.getTopicType(this.item.tab)
      }
    },
    created() {

    },
    methods: {

    }
  }

</script>

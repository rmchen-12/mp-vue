<style scoped lang="scss">
.content {
  height: 100%;
  .feed-li {
    padding: 10px;
    border-bottom: 1px solid $grey-border;
    .feed-title {
      display: flex;
      align-items: center;
      min-width: 0;
      p {
        margin: 0 0 0 8px;
        font-size: 14px;
        line-height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex: 1;
        min-width: 0;
      }
    }
    .feed-content {
      display: flex;
      position: relative;
      font-size: 13px;
      margin-top: 8px;
      .feed-right {
        flex: 1;
        min-width: 0;
        margin-left: 8px;
        &-top {
          display: flex;
          justify-content: space-between;
          .count {
            span {
              color: $light-color;
            }
          }
        }
        &-bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 4px;
          .feed-item {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>

<template>
    <div class="content">
        <scroll-view scroll-y style="height:100%;" @scroll="scrollFn" @scrolltolower="toLow" @scrolltoupper="test">
            <a :href="'/pages/article/main?id='+item.id" class="feed-li" v-for="(item,index) in list" :key="index">
                <div class="feed-title">
                    <type-block :item="item"></type-block>
                    <p>{{item.title}}</p>
                </div>
                <div class="feed-content">
                    <avatar :user="item.author"></avatar>
                    <div class="feed-right">
                        <div class="feed-right-top">
                            <div class="avatar-name">
                                {{item.author.loginname}}
                            </div>
                            <div class="count">
                                <span>{{item.reply_count}}</span>&nbsp;/&nbsp;{{item.visit_count}}
                            </div>
                        </div>
                        <div class="feed-right-bottom">
                            <div class="feed-item">{{item.createTime}}</div>
                            <div class="feed-pass">{{item.lastReplyTime}}</div>
                        </div>
                    </div>
                </div>
            </a>
        </scroll-view>
    </div>
</template>

<script>
import fly from "@/api";
import typeBlock from "@/components/TypeBlock/index.vue";
import avatar from "@/components/Avatar/index.vue";
import dayjs from "dayjs";
export default {
  data() {
    return {
      articleList: [],
      page: 1
    };
  },
  props: ["currentTab"],
  components: {
    typeBlock,
    avatar
  },
  computed: {
    list() {
      return this.articleList.map(item => {
        delete item.content;
        return Object.assign(item, {
          createTime: dayjs(item.create_at).format("YYYY-MM-DD HH-mm-ss"),
          lastReplyTime: this.fromNow(item.last_reply_at)
        });
      });
    }
  },
  async created() {
    this.getList();
  },
  methods: {
    scrollFn() {},
    toLow() {
      this.page++;
      this.getList(this.page);
    },
    test() {},
    async getList(page = 1) {
      wx.showLoading({
        title: "加载中"
      });
      let res = await fly.get("topics", {
        tab: this.currentTab.type,
        page,
        limit: 20
      });
      if (res.success) {
        this.articleList = this.articleList.concat(res.data);
        console.log(this.articleList);
      }
      wx.hideLoading();
    }
  }
};
</script>

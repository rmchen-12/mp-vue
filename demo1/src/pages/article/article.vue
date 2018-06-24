<style scoped lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
.article-wrap {
  background-color: $page-bg;
  font-size: 14px;
  .head-box {
    padding: 14px;
    background: #fff;
    .head-title {
      font-size: 18px;
      margin: 0;
    }
    .head-intro {
      display: flex;
      margin-top: 8px;
      align-items: center;
      .head-middle {
        flex: 1;
        margin-left: 10px;
        .head-middle-top {
          display: flex;
          align-items: center;
          .head-author-name {
            font-size: 14px;
            margin-left: 8px;
          }
        }
        .head-middle-bottom {
          line-height: 20px;
          font-size: 13px;
          color: #666;
          margin-top: 2px;
        }
      }
      .head-right {
        width: 36px;
        text-align: center;
        font-size: 16px;
      }
    }
  }
  .content-box {
    padding: 0 14px;
    background: #fff;
    box-shadow: 0 2px 2px #cecece;
  }
  .comment-box {
      margin-top: 8px;
      background: #fff;
      .comment-count{
          padding: 18px 14px;
          position: relative;
          font-size: 14px;
          font-weight: 100;
          border-bottom: 1px solid $grey-border;
      }
      .comment-item{
          position: relative;
          padding: 14px;
          border-bottom: 1px solid $grey-border;
          .comment-head{
              display: flex;
              .comment-middle{
                  margin-left: 8px;
                  flex: 1;
                  .comment-middle-bottom{
                      span{
                          color: $light-color;
                      }
                  }
              }
              .comment-right{
                  text-align: center;
                  display: flex;
                  align-items: center;
                  color: #666;
              }
          }
          .comment-content{
              margin-top: 8px;
          }
      }
  }
}
</style>

<template>
    <div class="article-wrap" v-if="article">
        <div class="head-box">
            <h2 class="head-title">
                {{article.title}}
            </h2>
            <div class="head-intro">
                <avatar :user="article.author"></avatar>
                <div class="head-middle">
                    <div class="head-middle-top">
                        <type-block :item="article" v-if="article"></type-block>
                        <span class="head-author-name">jingsam</span>
                    </div>
                    <div class="head-middle-bottom">
                        {{article.createTime}}.
                        <span>{{article.visit_count}}</span>次预览
                        <div class="icon-eye-open"></div>
                    </div>
                </div>
                <div class="head-right">
                    <icon type="wechat" :size="32"></icon>
                </div>
            </div>
        </div>
        <div class="content-box">
            <wx-parse v-if="article" :content="article.content"></wx-parse>
        </div>
        <div class="comment-box">
            <div class="comment-count">
                {{article.reply_count}}&nbsp;条回复
            </div>
            <div class="comment-item" v-for="(reply,index) in article.replies" :key="index">
                <div class="comment-head">
                    <avatar :user="reply.author"></avatar>
                    <div class="comment-middle">
                        <div class="comment-middle-top">
                            {{reply.author.loginname}}
                        </div>
                        <div class="comment-middle-bottom">
                            <span>{{index+1}}</span>&nbsp;楼.{{reply.createTime}}
                        </div>
                    </div>
                    <div class="comment-right">
                        <icon type="wechat"></icon>
                    </div>
                </div>
                <div class="comment-content">
                    <wx-parse :content="reply.content"></wx-parse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fly from "@/api";
import TypeBlock from "@/components/TypeBlock";
import icon from "@/components/Icon";
import avatar from "@/components/Avatar";
import wxParse from "mpvue-wxparse";

export default {
  data() {
    return {
      article: null,
      test: "<span>aaa</span>"
    };
  },
  components: {
    TypeBlock,
    icon,
    avatar,
    wxParse
  },
  async onLoad() {
    const { id } = this.$root.$mp.query;
    wx.showLoading({
      title: "加载中"
    });
    let res = await fly.get(`topic/${id}`);
    console.log(res);
    if (res.success) {
      this.article = res.data;
      this.article = Object.assign(this.article, {
        createTime: this.fromNow(res.data.create_at)
      });
      if (this.article.replies && this.article.replies.length) {
        this.article.replies = this.article.replies.map(reply => {
          reply.createTime = this.fromNow(reply.create_at);
          return reply;
        });
      }
      wx.hideLoading();
    }
  },
  methods: {}
};
</script>

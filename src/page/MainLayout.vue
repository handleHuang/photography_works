<template>
  <t-layout id="app">
    <!-- header头部菜单 -->
    <t-header class="container_header">
      <div class="max-center">
        <div class="header_content">
          <div class="header_left">
            <h1 class="logo">
              <router-link to="/"> admin </router-link>
            </h1>
          </div>
          <div class="header_right">
            <t-dropdown :options="options" :min-column-width="88">
              <div class="username">administrator</div>
              <div class="avatar"></div>
            </t-dropdown>
          </div>
        </div>
      </div>
    </t-header>

    <t-layout class="content">
      <t-aside class="side">
        <!-- 左侧菜单栏 -->
        <t-menu
          theme="light"
          :default-value="$route.path.split('/')[1]"
          style="margin-right: 40px"
          height="100%"
          width="256px"
          :collapsed="collapsed"
        >
          <t-menu-item value="articles" to="/articles">
            <template #icon>
              <t-icon name="layers" />
            </template>
            文章管理
          </t-menu-item>
          <t-menu-item value="tags" to="/tags">
            <template #icon>
              <t-icon name="server" />
            </template>
            文章标签
          </t-menu-item>
          <t-menu-item value="contacts" to="/contacts">
            <template #icon>
              <t-icon name="mail" />
            </template>
            联系我们
          </t-menu-item>
          <t-menu-item value="user" to="/user">
            <template #icon>
              <t-icon name="usergroup" />
            </template>
            用户管理
          </t-menu-item>
          <template #operations>
            <t-icon
              class="t-menu__operations-icon"
              name="view-list"
              @click="changeCollapsed"
            />
          </template>
        </t-menu>
      </t-aside>
      <!-- 主体模块：当前路由内容 -->
      <t-content class="main">
        <router-view :key="routeKey" />
      </t-content>
      <!-- <t-footer>Footer</t-footer> -->
    </t-layout>
  </t-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      visible: false,
      collapsed: false,
      options: [
        {
          content: '退出登录',
          value: 1,
          onClick: () => {
            this.logout()
          }
        },
        {
          content: '修改密码',
          value: 2,
          onClick: () => {
            console.log(2)
          }
        }
      ]
    }
  },
  computed: {
    routeKey () {
      return this.$route.path
    }
  },
  watch: {},
  methods: {
    changeCollapsed () {
      this.collapsed = !this.collapsed
    },
    showPopup () {
      this.visible = !this.visible
    },
    logout () {
      const confirmDia = this.$dialog.confirm({
        header: '提示',
        body: '确定要退出登录吗？',
        confirmBtn: '确认',
        cancelBtn: '取消',
        theme: 'warning',
        onConfirm: () => {
          localStorage.clear()
          location.reload()
          confirmDia.destroy()
        },
        onClose: () => {
          confirmDia.hide()
        }
      })
    }
  }
}
</script>

<style lang="less"  scoped>
@import url("../assets/style/var/var.less");
html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
#app {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  min-width: 1024px;
  background-color: #f6f6f6;

  .container_header {
    position: relative;
    z-index: 888;
    background-color: #fff;
    height: 72px;
    .header_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #0052d9;
      height: 72px;

      .header_left {
        margin-left: 24px;

        .logo {
          .router-link-active {
            text-decoration: none;
            font-family: TencentSansW7;
            font-size: 24px;
            line-height: 24px;
            color: #fff;
          }
        }
      }

      .header_right {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 100%;
        padding-right: 48px;
        /deep/ span {
          display: flex;
        }
        .username {
          user-select: none;
          margin-right: 20px;
          color: #fff;
        }
        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }
  }
  .content {
    height: calc(100% - 72px);

    .side {
      height: 100%;
      width: auto;
      .t-default-menu.t-menu--light {
        margin-right: 0 !important;
      }
      /deep/.t-menu__operations {
        height: 49px;
      }
    }
    .main {
      height: calc(100% - 48px);
      width: calc(100% - 48px);
      // background: #fff;
      // margin: 24px;
    }
  }
}
</style>

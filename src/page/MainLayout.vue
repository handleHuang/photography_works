<template>
  <t-layout id="app">
    <!-- header头部菜单 -->
    <t-header class="container_header">
      <t-head-menu
        theme="dark"
        style="margin-top: 24px"
        v-model="$route.path.split('/')[1]"
      >
        <template #logo>
          <img
            width="136"
            :src="require('../assets/icon/TRX RGB White.png')"
            alt="logo"
          />
        </template>
        <t-menu-item value="upload" to="/upload">
          <template #icon>
            <t-icon name="layers" />
          </template>
          上传
        </t-menu-item>
        <t-menu-item value="manage" to="/manage">
          <template #icon>
            <t-icon name="layers" />
          </template>
          管理
        </t-menu-item>
        <template #operations>
          <a href="javascript:;"
            ><t-icon class="t-menu__operations-icon" name="user"
          /></a>
        </template>
      </t-head-menu>
    </t-header>

    <t-layout class="content">
      <!-- 主体模块：当前路由内容 -->
      <t-content class="main">
        <router-view :key="$route.path" />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script>

</script>

<style lang="less" scoped>
@import url('../assets/style/var/var.less');
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
  background-color: #f1f1f1;

  .container_header {
    position: relative;
    z-index: 888;
    background-color: #fff;
    height: 56px;
    .t-head-menu {
      height: 100%;
      margin-top: 0 !important;
    }
      .t-head-menu .t-menu__logo:not(:empty) {
        margin-right: 80px;
      }
    /deep/.t-head-menu__inner {
      height: 100%;
      padding: 0 24px;
      .t-menu__operations {
        a {
          height: 100%;
          svg.t-icon.t-icon-user.t-menu__operations-icon {
            width: 24px;
          }
        }
      }
      svg.t-icon.t-icon-layers {
        width: 18px;
        height: 18px;
      }
    }
    .t-menu__item.t-is-active {
      background-color: #0052d9;
    }
  }
  .content {
    height: calc(100% - 72px);
    .main {
      height: calc(100% - 48px);
      background-color: #f1f1f1;

      // width: calc(100% - 48px);
      // background: #fff;
      // margin: 24px;
    }
  }
}
</style>

<template>
  <div class="common-layout">
    <t-layout class="box">
      <!-- header头部菜单 -->
      <t-header>
        <div class="user">
          <t-dropdown :options="options" :min-column-width="88">
            <div class="username">administrator</div>
            <div class="avatar"></div>
          </t-dropdown>
        </div>
      </t-header>

      <t-layout class="content">
        <t-aside class="t_aside">
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
        <t-content class="t_main">
          <router-view :key="routeKey" />
        </t-content>
        <!-- <t-footer>Footer</t-footer> -->
      </t-layout>
    </t-layout>
  </div>
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
          localStorage.removeItem('isLogin')
          this.$router.push('/login')
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

<style lang="less"  src='../assets/style/MainLayout/MainLayout.less' scoped></style>

<template>
  <div class="updata">
    <div class="Upload_works" v-show="!popSubmit">
      <div class="updata_title">上传作品</div>
      <div class="updata_box">
        <t-form
          ref="form"
          :data="formData"
          label-align="top"
          :rules="rules"
          @submit="onSubmit"
        >
          <t-form-item
            label="参赛命题"
            name="topic"
            v-if="propositionData.length !== 0"
            class="flex3"
          >
            <t-select v-model="formData.topic" placeholder="请选择命题">
              <t-option
                v-for="item in propositionData"
                :key="item.id"
                :value="item.title"
                :label="item.title"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="作品名称" name="title" class="flex3">
            <t-input v-model="formData.title" placeholder="请输入作品名称" />
          </t-form-item>

          <t-form-item
            label="生成关键词描述（prompt）"
            name="cont"
            class="flex1"
          >
            <t-textarea
              v-model="formData.cont"
              placeholder="请输入生成结果的关键描述"
              name="cont"
              :autosize="{ minRows: 6, maxRows: 6 }"
            />
          </t-form-item>
          <t-form-item label="添加作品" name="article" class="flex1">
            <div class="formTips big">
              支持 jpg、png、gif 格式，最佳尺寸 600*450px，文件大小不超过 2M
            </div>
            <div class="formTips small">单个图片/文件大小不超过300MB</div>
            <t-upload
              ref="uploadRef1"
              v-model="file1"
              action="http://127.0.0.1:12134/api/uploadimg"
              theme="image"
              tips="图片不能超出2m"
              accept="image/*"
              :auto-upload="true"
              :upload-all-files-in-one-request="true"
              :size-limit="{ size: 2, unit: 'MB' }"
              :max="5"
              multiple
              :abridge-name="[6, 6]"
              :locale="{
                triggerUploadText: {
                  image: '请选择图片',
                },
              }"
              @fail="handleFail1"
              @Change="changeUpdata1"
            >
            </t-upload>
          </t-form-item>
          <t-form-item
            label="除了文生图以外的的生成方式"
            name="way"
            class="flex1"
          >
            <t-radio-group v-model="formData.have" @change="onChangeWay">
              <t-radio :value="1">有</t-radio>
              <t-radio :value="2">没有</t-radio>
            </t-radio-group>
          </t-form-item>

          <t-form-item
            label="创作过程描述：其他输入和控制手段"
            name="process"
            class="flex1"
            v-if="wayActive === 1"
          >
            <t-textarea
              v-model="formData.process"
              placeholder="请输入生成结果的关键描述"
              :maxlength="200"
              name="cont"
              :autosize="{ minRows: 6, maxRows: 6 }"
            />
          </t-form-item>
          <t-form-item
            label="创作过程：参考文件，工程文件截图"
            name="file"
            class="flex1"
            v-if="wayActive === 1"
          >
            <div class="formTips">
              支持 jpg、png、gif 格式，文件大小不超过
              2M，可以提交多张，不超过9张
            </div>
            <t-upload
              ref="uploadRef1"
              v-model="file2"
              action="http://127.0.0.1:12134/api/uploadimg"
              theme="image"
              tips="图片不能超出2m"
              accept="image/*"
              :auto-upload="true"
              :upload-all-files-in-one-request="true"
              :size-limit="{ size: 2, unit: 'MB' }"
              :max="9"
              multiple
              :abridge-name="[6, 6]"
              :locale="{
                triggerUploadText: {
                  image: '请选择图片',
                },
              }"
              @fail="handleFail2"
              @Change="changeUpdata2"
            >
            </t-upload>
          </t-form-item>
          <div class="updata_foot">
            <div class="updata_foot_box">
              <t-button theme="primary" type="submit">提交</t-button>
              <t-button variant="outline" theme="default" @click="handleCancel"
                >取消</t-button
              >
            </div>
          </div>
        </t-form>
      </div>
    </div>

    <div class="submit_box" v-show="popSubmit">
      <icon name="check-circle-filled" style="color: green" />
      <div class="submit_box_title">提交成功</div>
      <div class="submit_box_tips">你可以为自己拉票，或继续参加其他命题</div>
      <div class="submit_box_btn">
        <t-button theme="primary" @click="handleCloseConfirm"
          >返回首页</t-button
        >
        <t-button theme="default" @click="handleMyWorks">查看我的作品</t-button>
      </div>
    </div>

    <t-dialog
      v-model:visible="visibleSubmit"
      header="确认要提交吗？"
      body="提交后可在个人中心对作品进行修改"
      attach="body"
      ><template #footer>
        <div>
          <t-button theme="default" @click="handleclose">取消</t-button>
          <t-button theme="primary" @click="handleConfirm">确认提交</t-button>
        </div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visiblecancel"
      theme="info"
      header="确定要返回吗？"
      body="返回后已编辑内容将全部丢失"
    >
      <template #footer>
        <div>
          <t-button theme="default" @click="handleCloseCancel">取消</t-button>
          <t-button theme="primary" @click="handleCloseConfirm"
            >确认返回</t-button
          >
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "tdesign-icons-vue-next";
import { MessageInfoOptions, MessagePlugin } from "tdesign-vue-next";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { onBeforeRouteLeave, useRouter, useRoute } from "vue-router";
import uploads from "../../components/uploads.vue";
import { getProjectsList } from "../../models/index";
import { postArticle } from "../../models/updata";
import { updataEdit } from "../../models/user";
import { getArticlesDetail } from "../../models/detail";

const router = useRouter();
const route = useRoute();

const userData: any = ref(
  JSON.parse(localStorage.getItem("user_info") as string)
);
console.log(userData.value);

let formData: any = reactive({
  username: userData.value.username,
  user_img: userData.value.cover,
  beiyong2: userData.value.id,
  title: "",
  topic: "",
  cont: "",
  process: "",
  cover: "", //添加作品
  beiyong1: "", //过程
  collect: 0,
  collect_number: 0,
  state: 1, //未发布
});

const rules = {
  title: [{ required: true, message: "作品名称必填" }],
  cont: [{ required: true, message: "生成关键描述必填" }],
  topic: [{ required: true, message: "命题为必填" }],
  process: [{ required: true, message: "创作过程描述" }],
};

// 命题列表
const propositionData: any = ref([]); //命题列表
let params = {
  online_status: 1,
};
getProjectsList(params)
  .then((res: any) => {
    propositionData.value = res.data;
  })
  .catch((error: any) => {
    console.log("获取失败！");
  });

let wayActive: any = ref(2);
const onChangeWay = (e: any) => {
  wayActive.value = e;
};

// 上传
// 添加作品
const file1 = ref([]);
const handleFail1 = (file: any) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const changeUpdata1 = (item: any) => {
  let worksList = [];
  for (let i = 0; i < item.length; i++) {
    worksList.push(item[i].url.replace("http://127.0.0.1:12134/upload/", ""));
  }
  formData.cover = JSON.stringify(worksList);
};
// 创作过程：参考文件，工程文件截图
const file2 = ref([]);
const handleFail2 = (file: any) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const changeUpdata2 = (item: any) => {
  let worksList = [];
  for (let i = 0; i < item.length; i++) {
    worksList.push(item[i].url.replace("http://127.0.0.1:12134/upload/", ""));
  }
  formData.beiyong1 = JSON.stringify(worksList);
};

const popSubmit = ref(false);

const visibleSubmit = ref(false);
const onSubmit = (validateResult: any) => {
  if (validateResult.firstError) {
    MessagePlugin.warning({ content: validateResult.firstError });
    return false;
  } else {
    visibleSubmit.value = true;
    return false;
  }
};
const handleclose = () => {
  visibleSubmit.value = false;
};
const handleConfirm = () => {
  // formData.files = formData.article.concat(formData.file);
  // // for (let i = 0; i < formData.file.length; i++) {
  // //   formData.files.push(formData.file[i]);
  // // }
  // let param: any = {
  //   title: formData.title,
  //   cont: formData.cont,
  //   online: 1,
  // };
  // if (!userData.value.id) {
  //   param.username = formData.username;
  // } else {
  //   param.username = userData.value.username;
  // }
  // if (formData.topic !== "") {
  //   param.topic = formData.topic;
  // }
  // if (wayActive.value === 1) {
  //   param.process = formData.process;
  // }
  console.log(formData);
  // if (route.query.id) {
  //   param.id = route.query.id;
  //   param.way = wayActive.value;
  //   updataEdit(param)
  //     .then((res: any) => {
  //       // console.log(res);
  //       popSubmit.value = true;
  //     })
  //     .catch((error: any) => {
  //       console.log("获取失败！");
  //     });
  // } else {
  postArticle(formData)
    .then((res: any) => {
      popSubmit.value = true;
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
  // }
  visibleSubmit.value = false;
};

const handleMyWorks = () => {
  router.push({ path: "/user" });
};

const visiblecancel = ref(false);
const handleCancel = () => {
  let judgeData = judge();
  if (judgeData) {
    router.push({ path: "/" });
  } else {
    visiblecancel.value = true;
  }
};

// 判空处理
const judge = () => {
  const old: any = reactive({
    username: userData.value.username,
    user_img: userData.value.cover,
    beiyong2: userData.value.id,
    title: "",
    topic: "",
    cont: "",
    process: "",
    cover: "", //添加作品
    beiyong1: "", //过程
    collect: 0,
    collect_number: 0,
    state: 1, //未发布
  });
  let newData = JSON.stringify(formData);
  let oldData = JSON.stringify(old);
  if (newData === oldData) {
    return true;
  } else {
    return false;
  }
};

const formRouteAbi = router.options.history.state.back;
const returnOpen = ref(true);
const toUrl: any = ref("/");
const handleCloseConfirm = () => {
  console.log(toUrl.value);
  visiblecancel.value = false;
  router.push({ path: `${toUrl.value}` });
  returnOpen.value = false;
};
const handleCloseCancel = () => {
  visiblecancel.value = false;
};

const detailsData = () => {
  if (route.query.id) {
    // console.log(route.query.id);
    getArticlesDetail(route.query.id)
      .then((res: any) => {
        formData.article = res.articles;
        formData.username = res.username;
        formData.title = res.title;
        formData.topic = +res.topic;
        formData.cont = res.cont;
        formData.have = res.file.length !== 0 ? 1 : 2;
        if (res.file.length !== 0) {
          wayActive.value = 1;
        }
        formData.process = res.process;
        formData.file = res.file;
        console.log(formData);
      })
      .catch((error: any) => {
        console.log("获取失败！");
      });
  }
};
detailsData();

onBeforeRouteLeave((to, from, next) => {
  if (!popSubmit.value) {
    toUrl.value = to.fullPath;
    if (returnOpen.value) {
      let judgeData = judge();
      if (judgeData) {
        next(true);
      } else {
        visiblecancel.value = true;
      }
    } else {
      next(true);
    }
  } else {
    next(true);
  }
});

const beforeunload = (event: any) => {
  event.returnValue = "我在这写点东西...";
};
onMounted(() => {
  window.addEventListener("beforeunload", beforeunload, false);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeunload, false);
});

// window.onbeforeunload = function (e: any) {
//   // e = e | window.event;
//   if (e) {
//     e.returnValue = "关闭提示";
//   }
//   return true;
// };
</script>

<style lang="less" scoped src="../../assets/css/updata.less"></style>

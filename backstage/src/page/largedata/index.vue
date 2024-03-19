<template>
  <div class="continer">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="continer_box echarts_item">
      <div class="list">
        <div class="echarts" id="main" ref="echarts1"></div>
      </div>
      <div class="list">
        <div class="echarts" id="main1" ref="echarts1"></div>
      </div>
      <div class="list">
        <div class="echarts" id="main3" ref="echarts1"></div>
      </div>
      <div class="list">
        <div class="list_title">
          前十优秀排名
          <span class="tips">更新于2021-05-20 12:00:00</span>
        </div>
        <div class="rank">
          <div class="rank_list">
            <div class="rank_number">排名</div>
            <div class="rank_cover">头像</div>
            <div class="rank_name">昵称</div>
          </div>
          <div
            class="rank_list"
            v-for="(item, index) in shuju.rank"
            :key="index"
          >
            <div class="rank_number">
              {{ index < 10 ? "0" + (index + 1) : index + 1 }}
            </div>
            <img :src="item.cover" class="rank_cover" />
            <div class="rank_name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();

// 声明周期函数，自动执行初始化
onMounted(() => {
  init();
  init1();
  init3();
  handleRank();
});
const shuju = reactive({
  fieldNames: [],
  data: [],
  online: 0,
  notlive: 0,
  rank: [],
});
// 初始化函数
async function init() {
  // 基于准备好的dom，初始化echarts实例
  const Chart = echarts.init(document.getElementById("main"));
  await store.dispatch("classifyData").then((res) => {
    shuju.fieldNames = res.data.fieldNames;
    const values = res.data.list.map((item) => item.split(":")[1].trim());
    shuju.data = values;
  });

  // 绘制图表
  const options = {
    title: {
      text: "作品分类数据",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: shuju.fieldNames,
        // axisTick: {
        //   alignWithLabel: true
        // }
        axisLabel: {
          interval: 0,
          formatter: function (value) {
            var ret = ""; // 拼接加\n返回的类目项
            var maxLength = 5; // 每项显示文字个数
            var valLength = value.length; // X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
            // 如果类目项的文字大于5,
            if (rowN > 1) {
              for (var i = 0; i < rowN; i++) {
                var temp = ""; // 每次截取的字符串
                var start = i * maxLength; // 开始截取的位置
                var end = start + maxLength; // 结束截取的位置
                // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; // 凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "作品",
        data: shuju.data,
        type: "line",
        symbol: "none",
        itemStyle: {
          color: "#0960bd",
        },
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          color: "rgba(9,96,189,0.3)",
          opacity: 0.2,
        },
      },
    ],
  };

  // 渲染图表
  Chart.setOption(options);
}

async function init1() {
  const Chart = echarts.init(document.getElementById("main1"));
  await store.dispatch("classifyDatayuan").then((res) => {
    shuju.online = res.online;
    shuju.notlive = res.notlive;
  });

  // 绘制图表
  const options = {
    title: {
      text: "分类是否上线",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0px",
      right: "center",
    },
    series: [
      {
        type: "pie",
        radius: "70%",
        data: [
          { value: shuju.online, name: `已上线(${shuju.online})` },
          { value: shuju.notlive, name: `未上线(${shuju.notlive})` },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // 渲染图表
  Chart.setOption(options);
}

async function handleRank() {
  await store.dispatch("rankList").then((res) => {
    shuju.rank = res;
  });
}

async function init3() {
  const Chart = echarts.init(document.getElementById("main3"));
  await store.dispatch("workOlineState").then((res) => {
    shuju.online = res.online;
    shuju.notlive = res.notlive;
  });

  // 绘制图表
  const options = {
    title: {
      text: "作品上线状态",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0px",
      right: "center",
    },
    series: [
      {
        type: "pie",
        radius: "70%",
        data: [
          { value: shuju.online, name: `已上线(${shuju.online})` },
          { value: shuju.notlive, name: `未上线(${shuju.notlive})` },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // 渲染图表
  Chart.setOption(options);
}
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>

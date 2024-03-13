<template>
  <div class="competition">
    <div class="notice max-content">
      <div class="swiper-slide" v-for="(item, index) in competitionData" @click="handleswiper(item.id)">
        <div class="teaser-widget">
          <img
            :src='item.cover'
            alt="Joop Swart Masterclass" class="teaser-widget__image js-img-with-txt js-bg-color-el" />
          <div class="teaser-widget__caption js-txt-for-img js-bg-color-el">
            <h4 class="title title--20">{{ item.title }}</h4>
          </div>
        </div>

        <div class="text-widget">
          <p>
            {{ item.cont }}
            <a href="">
              {{ item.cont2 }}
            </a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { competitionList } from "../../models/competition";
import { useRouter } from "vue-router";
const router = useRouter();

const competitionData: any = ref([])
const getCompetitionData = () => {
  let param: any = {
    page: 1,
    per_page: 100,
  };
  competitionList(param)
    .then((res: any) => {
      console.log(res)
      competitionData.value = res.data
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
};

const handleswiper = (id: number) =>{
  router.push({
    name: "competition_detail",
    query: { id: id },
  });
}

onMounted(()=>{
  getCompetitionData()
})

</script>
  
<style lang="less" scoped src="../../assets/css/competition.less"></style>
  
<template>
    <div id="ScheduleManager">
      <div class="switch">
        筛选：
        <span class="scheduleManagerRank" @click="scheduleTab('ScheduleManagerRank')" :class="{isActiveClass:isSchedule}">渠道经理排行</span>
        <span class="areaRank" @click="scheduleTab('AreaRank')" :class="{isActiveClass:!isSchedule}">区域排行</span>
      </div>
      <div class="cont">
        <component :is="isActive"></component>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ScheduleManagerRank from './ScheduleManagerRank'
    import AreaRank from './AreaRank'
    export default {
        name: 'ScheduleManager',
        data() {
            return {
              isActive:'ScheduleManagerRank',
              isSchedule:true
            }
        },
      components:{
        ScheduleManagerRank,
        AreaRank
      },
      methods:{
        scheduleTab(val){
          this.isActive=val
          this.isSchedule=!this.isSchedule
        }
      }

    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  #ScheduleManager{
    padding-right: 50px;
    .switch{
      float: right;
      font: 14px/87px '微软雅黑';
      .scheduleManagerRank{
        padding-right: 22px;
        border-right: 2px solid #fff;
        cursor: pointer;
      }
      .areaRank{
        padding-left: 22px;
        cursor: pointer;
      }
      .isActiveClass{
        color: #4697e8;
        text-decoration: underline;
      }
    }
    .cont{
      width: 100%;
    }
  }
</style>

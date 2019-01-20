<template>
    <div id="work_alert_chart" ref="workAlert"></div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data() {
            return {}
        },
        methods:{

        },
        mounted(){
          this.showWorkAlertChart();
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
  #work_alert_chart{
    .w(100%);
    .h(100%);
  }
</style>

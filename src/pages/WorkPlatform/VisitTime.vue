<template>
      <div id="visit_time" ref="visitTime"></div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts'
    export default {
        name: '',
        data() {
            return {
              nameData:[],
              monthReportComRateData:[],
            }
        },
        computed:{
          visitVal(){
            return this.$store.getters.visitVal;
          }
        },
        watch:{
          visitVal:{
            handler(val){
              this.showChart(val.name,val.times);
            },
            deep:true
          }
        },
        methods:{
          /**
           * 排名情况echarts图：
           * @param name
           * @param val
           */
          showChart(name,val){
            var myChart = echarts.init(this.$refs.visitTime);
            var option = {
              xAxis: {
                type: 'category',
                axisLabel:{
                  color:'#fff',
                  fontFamily:'HiraginoSanGB-W3',
                  fontSize:'14px',
                  align:'center'
                },
                data: name
              },
              yAxis: {
                type: 'value',
                name:'使用次数',
                nameTextStyle:{
                  padding:[13,4,5,-20],
                  color:'#fff'
                },
                axisLine: {
                  show: false
                },
                axisLabel:{
                  color:'#fff',
                  fontFamily:'MicrosoftYaHei',
                  fontSize:'12px',
                  align:'right'
                },
                axisTick: {
                  show: false
                },
                splitLine:{
                  show:true,
                  lineStyle:{
                    color: '#34374d'
                  }
                }
              },
              series: [{
                data: val,
                type: 'bar',
                barGap:'70%',
                barCategoryGap:'60',
                itemStyle:{
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#48c1ff'},
                        {offset: 0.5, color: '#67a9f3'},
                        {offset: 1, color: '#746ae9'}
                      ]
                    )
                  },
                }
              }]
            };
            myChart.setOption(option);
            window.onresize = ()=>{
              myChart.resize();
            };
          }
        }
    }
</script>

<style lang="less">
  #visit_time{
    width:100%;
    height:100%;
    min-height:180px;
  }
</style>

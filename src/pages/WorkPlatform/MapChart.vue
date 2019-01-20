<template>
  <div class="map_chart">
    <el-row class="bottom">
      <el-col :md="24" :lg="24">
        <div class="left_wrapper calendar_wrapper">
          <div class="title">
            <span class="name">地图营销</span>
          </div>
          <div class="content finish_status">
            <div id="map" ref="map"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
    import echarts from 'echarts';
    import chinaJson from './../../assets/js/china.json'
    export default {
        name: '',
        data() {
            return {}
        },
        methods:{
          showMap(){
            echarts.registerMap('china', chinaJson);    //注册地图
            var myChart = echarts.init(this.$refs.map);
            /**
             * 地图标记点的值：
             * @returns {Array}
             */
            var newData=[
              {name:'海门',value:[121.15,31.89,129],num:'628,268'},
              {name:'鄂尔多斯',value:[109.781327,39.608266,152],num:'573.823'},
              {name:'招远',value:[120.38,37.35,152],num:'397.322'},
              {name:'舟山',value:[122.207216,29.985295,212],num:'133.89'},
              {name:'齐齐哈尔',value:[123.97,47.33,144],num:'83,729'},
              {name:'盐城',value:[120.13,33.38,125],num:'63,879'},
              {name:'大庆',value:[125.03,46.58,229],num:'53287'}
            ];

            /**
             * 地图的series数据值：
             * @returns {Array}
             */
            var showSeries=function(){
              var arr=[];
              for(let i=0;i<newData.length;i++){
                arr.push({
                  name: `${newData[i].name}     ${newData[i].num}次`,
                  type: 'effectScatter',
                  coordinateSystem: 'geo',
                  data: [newData[i]],
                  symbolSize: function (val) {
                    return val[2] / 20;
                  },
                  showEffectOn: 'render',
                  rippleEffect: {    //地图上光圈标记点
                    period:100,
                    scale: 4,
                    brushType: 'fill'
                  },
                  hoverAnimation: true,
                  itemStyle: {
                    normal: {
                      color:'#426aa0',     //散点光圈的颜色
                      shadowBlur: 10,
                      shadowColor: '#426aa0',    //散点光圈的阴影颜色
                      label : {
                        show : false,   //隐藏标示文字
                        position:'inside'
                      }
                    }
                  },
                  zlevel: 1
                })
              }
              return arr;
            };

            /**
             * 地图的legend名字：
             * @returns {Array}
             */
            var getName=function(){
              var nameList=[];
              newData.map((item,index)=>{
                nameList.push(`${item.name}     ${item.num}次`);
              });
              return nameList;
            }

            var option={
              legend: {
                orient: 'vertical',
                x: '80%',
                y:'center',
                textStyle:{
                  color:'#fff',
                  background:'red'
                },
                itemGap:20,
                data:getName()
              },
              backgroundColor: '#42485a',     //画布的背景色
              geo: {
                map: 'china',
                show: true,
                roam: false,    //控制地图不缩放
                label: {
                  emphasis: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#34384d',      //地图背景色
                    borderColor: '#42485a'     //地图边界线颜色
                  },
                  emphasis: {
                    areaColor: '#34384d',
                    borderColor: '#42485a'     //地图边界线颜色
                  }
                },
                regions: [                     //去掉南海诸岛区域
                  {
                    name: '南海诸岛',
                    value: 0,
                    itemStyle:
                      {
                        normal:
                          {
                            opacity: 0,
                            label: {
                              show: false
                            }
                          }
                      }
                  }]
              },
              series:showSeries()
            };

            myChart.setOption(option);
            window.onresize = myChart.resize;
          }
        },
        mounted(){
          this.showMap();
        }
    }
</script>

<style lang="less">
  #map{
    width:100%;
    height:100%;
    div{
      border-radius: 5px;
      width:100%!important;
    }
  }
</style>

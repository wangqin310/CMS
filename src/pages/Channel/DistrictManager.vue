<template>
    <div id="districtManager">
          <div class="filter" v-if="isActive=='Card'">
            区域选择：<el-select v-model="cityName" placeholder="全部" class="city" @change="selectCity">
                <el-option  v-for="(city,index) in cityList" :label="city.areaName" :key="index" :value="city.pinYin">
                </el-option>
              </el-select>
          </div>
          <div class="switch">
            切换：
            <span class="List" @click="changeTab('List')" :class="{isActiveClass:isMyChannel}">列表</span>
            <span class="divide">|</span>
            <span class="Card" @click="changeTab('Card')" :class="{isActiveClass:!isMyChannel}">卡片</span>
          </div>
          <div class="table" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
            <component :is="isActive" :isLoginTime="isLoginTime"></component>
          </div>
    </div>
</template>

<script>
  import List from './List';
  import Card from '../../components/Card';
    export default {
        name: "districtManager",
        data(){
            return{
                isMyChannel:true,
                isActive:'List',
                city:'',
                cityName:'',
                cardStore:"",
                tempList:"",
                isLoginTime:false,
                loading:false
            }
        },
        components:{
          List,
          Card
        },
        methods:{
            changeTab(val){
              this.isActive=val;
              this.isMyChannel=!this.isMyChannel;
              this.$store.state.mutations.loginStatusParams.userName='';
              this.loading=true;
                setTimeout(() => {
                  this.loading = false;
                }, 500);
            },
            selectCity(val){
               if(this.cardStore.length==0){
                  this.cardStore = this.$store.state.mutations.filterList;
               }
               if(val!=''){
                 var cardList = [];
                 var num = 0;
                 this.cardStore.forEach(e => {
                    if(e.pinYin==val){
                      cardList[num] = e;
                      num++;
                    }
                 });
                 this.$store.state.mutations.filterList = cardList;
               }else{
                 this.$store.state.mutations.filterList =this.cardStore;
               }
              this.tempList = this.$store.state.mutations.filterList;
            }
        },
        computed:{
          cityList(){
            var cityList = [];
            var item = {};
            item.pinYin = '';
            item.areaName = '全部';
            cityList[0] = item;
            var num = 1;
            this.$store.state.mutations.districtList.forEach(e => {
                  cityList[num] = e;
                  num++;
            });
            if(this.tempList!=''){
              this.$store.state.mutations.filterList = this.tempList;
            }
            return cityList;
          },

      }
    }
</script>

<style lang="less">
  @import "./../../assets/less/common";
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");
#districtManager{
  padding:42px;
  width: 100%;
  height: 100%;
  .filter{
    float: left;
    margin-left: 50px;
    input{
        width: 100px;
        height: 28px;
        border: 1px solid #7ba3ff;
        border-radius: 3px;
        background: #2f3445;
        color: #f5f5f6;
        box-shadow: 0 0 10px #7bb0ff;
        padding-left: 8px;
        font: 12px/28px '微软雅黑';
    }
    .el-input__icon{
          line-height: 30px;
        }
  }
  .switch{
          float: right;
          margin-right: 50px;
          margin-top: 10px;
          .List,.Card{
            cursor:pointer;
          }
          .isActiveClass{
            color: #4697e8;
            text-decoration: underline;
          }
          .divide{
            padding: 0 10px;
          }
        }
}
</style>

<template>
    <div id="Pagination">
      <el-pagination class="page" :current-page="tableTotal.current" layout="prev, pager, next" 
      @current-change="changePage" v-if="tableTotal.total>10" :total="tableTotal.total"></el-pagination>
      <div class="page_text">显示第<span> {{start}} </span>到<span> {{end}} </span>条记录，共<span> {{tableTotal.total}} </span>条记录</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        props:['tableDataName'],
        data() {
            return {}
        },
        computed:{
          tableLimit(){
            return this.$store.getters.tableLimit;
          },
          tableTotal(){
            return this.$store.state.mutations.commonParams[this.tableDataName];
          },
          start(){
            if(this.tableTotal.total==0){
              return 0;
            }else
            if(Math.floor(this.tableTotal.total/this.tableLimit.params.limit)>=this.tableTotal.current){
              return (this.tableTotal.current-1)*this.tableLimit.params.limit+1;
            }else{
              return Math.floor(this.tableTotal.total/this.tableLimit.params.limit)*this.tableLimit.params.limit+1;
            }
          },
          end(){
            if(this.tableTotal.total==0){
              return 0;
            }else
            if(Math.ceil(this.tableTotal.total/this.tableLimit.params.limit)>this.tableTotal.current){
              return this.tableTotal.current*this.tableLimit.params.limit;
            }else{
              return this.tableTotal.total;
            }
          }
        },
        methods:{
          /**
           * 切换页码：
           * @param val
           */
          changePage(val){
            this.tableTotal.current=val;
            if(this.tableDataName == 'areaRankFaList' || this.tableDataName == 'areaRankDaiyuList') {
              if(this.tableTotal.current == 1) {
                this.$store.state.mutations.tableLimit.params.start=3;
              }else{
                this.$store.state.mutations.tableLimit.params.start=(val-1)*this.$store.state.mutations.tableLimit.params.limit+3;
              }
            }else{
              this.$store.state.mutations.tableLimit.params.start=(val-1)*this.$store.state.mutations.tableLimit.params.limit;
            }
            this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
          }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  #Pagination{
    height: 80px;
    .page_text{
      float:right;
      .f-s(14px);
      .m-t(5px);
      .f-f(@workPlatformText);
    }
    .page{
      float:left;
      button,li{
        .b(@contentBodyBg);
        color:@white;
        .w(28px);
        .h(28px);
        .m-r(8px);
        &:last-child{
          .m-r(0);
        }
        min-width:28px;
        &.active{
          color:@white;
          border-radius:28px;
          border:1px solid #7ba3ff;
          box-shadow: 0 0 10px #7bb0ff;
          &:hover{
            color:@white;
          }
        }
        &:hover{
          color:#7ba3ff;
        }
      }
      .btn-next{
        .m-l(8px);
      }
    }
  }
</style>

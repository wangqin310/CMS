<template>
  <div id="myReport">
    <component :is="isMyReportList"></component>
  </div>
</template>

<script>
  import MyReportList from './MyReportList.vue'
  import OnlineEditor from './OnlineEditor.vue'
  import myReportUnderlingList from './myReportUnderlingList.vue'
  import myReportAreaList from './myReportAreaList.vue'
  import AdminReportList from './AdminReportList.vue'
  export default {
    name: "MyReport",
    data(){
      return {}
    },
    components:{
      MyReportList,
      OnlineEditor,
      myReportUnderlingList,
      myReportAreaList,
      AdminReportList
    },
    computed:{
      isMyReportList(){
        return this.$store.getters.isMyReportList;
      }
    },
    mounted(){
      this.$store.commit("reportGetShow");
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  #myReport{
    .h(100%);
  }
  #myReportList,#myReportUnderlingList,#myReportAreaList{
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;
    // .table{
    //   border-radius:5px;
    //   border:1px solid #7ba3ff;
    //   -webkit-box-shadow: 0 0 10px #7bb0ff;
    //   -moz-box-shadow: 0 0 10px #7bb0ff;
    //   box-shadow: 0 0 10px #7bb0ff;
    //   .el-table td,.el-table th.is-leaf{
    //     border-bottom:1px solid #7ba3ff;
    //   }
    //   .el-table__header{
    //     // .b(red);
    //   }
    //   .el-table__header-wrapper{
    //     border-top-left-radius:5px;
    //   }
    //   .el-table .ascending .sort-caret.ascending{
    //     border-bottom-color:#7bb0ff;
    //   }
    //   .el-table .descending .sort-caret.descending{
    //     border-top-color:#7bb0ff;
    //   }
    //   .el-table__empty-block{
    //     .b(#2a2d41);
    //     .el-table__empty-text{
    //       color:@white;
    //     }
    //   }
    //   .cell{
    //     button{
    //       .m(0);
    //       .w(70px);
    //       .b(@orange);
    //       border-radius:12px;
    //       span{
    //         color:@white;
    //       }
    //     }
    //   }
    // }
    .astyle{
      cursor:pointer;
      text-decoration:underline;
    }
    .astyle:hover{
      color: #7ba3ff;
    }
  }
</style>

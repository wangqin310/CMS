<template>
  <div id="channel_allocate_modal">
    <el-dialog :title="currentUser" :visible.sync="showModal" width="600px" @close="close">
      <el-row class="cam_content_row" :gutter="30">
        <el-col class="cam_content_col" :span="12" v-for="(item,index) in listData" :key="index">
          <div class="cam_content_wrapper">
            <div class="cam_title" v-text="item.text"></div>
            <div class="cam_list_wrapper">
              <div class="cam_error_box" v-text="item.val=='allArea'?'-> ->':'<- <-'"></div>
              <ul class="cam_list_content">
                <li class="cam_list" v-for="(list,liIndex) in item.val=='allArea'?allAreaResData:myAreaResData" :key="liIndex"
                    v-text="list.roleName" @click="clickItem({liVal:list,itemVal:item.val})"></li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="transfer">确认转移</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    props:['showChannelAllocationModal','currentEmpId','currentUser','currentUserId'],
    data() {
      return {
        showModal:true,
        listData:[
          {val:'allArea',text:'全部区域'},
          {val:'myArea',text:'我的区域'}
        ],
        allAreaResData:[],       //未分配渠道请求的数据
        myAreaResData:[],                //我的渠道请求的数据
        transferParams:{                    //转移参数
          empId:'',
          roleIdStr:''
        },
        filterArr:[]
      }
    },
    methods:{
      /**
       * 关闭：
       */
      close(){
        this.$parent.isAreaAllocationModalCom='';
      },
      /**
       * 加载全部区域和我的区域
       */
      getListData(){
        this.$axios.post("/api/CMM/taskDistribution_getAreaRoleByUserId",this.$qs.stringify({userId:this.currentUserId,isPage:0}))
          .then(res =>{
            this.myAreaResData=res.data.data;
            let array = [];
            this.myAreaResData.map((item)=>{
              array.push(item.roleName);
            })
            let arrayStr = array.join('-');
            this.$axios.post("/api/CMM/taskDistribution_getAllAreaRole",this.$qs.stringify({isPage:0}))
              .then(res =>{
                res.data.data.map((item)=>{
                  if(arrayStr.indexOf(item.roleName) == -1){
                    this.allAreaResData.push(item);
                  }
                })
              })
              .catch(error=>{
                console.log(error);
              })
          })
          .catch(error=>{
            console.log(error);
          })
      },
      /**
       * 点击
       */
      clickItem(obj){
        switch(obj.itemVal){
          case 'allArea':
            this.allAreaResData.map((item,index)=>{
              if(item.roleName==obj.liVal.roleName){
                this.allAreaResData.splice(index,1);
                this.myAreaResData.push(obj.liVal);
              }
            });
            break;
          case 'myArea':
            this.myAreaResData.map((item,index)=>{
              if(item.roleName==obj.liVal.roleName){
                this.myAreaResData.splice(index,1);
                this.allAreaResData.push(obj.liVal);
              }
            });
            break;
        };
      },
      /**
       * 确认转移：
       * @param itemId
       */
      transfer(itemId){
        var arr=[];
        this.myAreaResData.map((item)=>{
          arr.push(item.roleId);
        })
        this.transferParams.roleIdStr=arr.toString();
        this.$axios.post("/api/CMM/taskDistribution_updateManagerArea",this.$qs.stringify(this.transferParams))
          .then(res =>{
            if(res.data.success){
              this.$message({
                message: '转移成功！',
                type: 'success'
              });
              this.$parent.isAreaAllocationModalCom='';
            }else{
              this.$message({
                message: '转移失败！',
                type: 'warning'
              });
              this.$parent.isAreaAllocationModalCom='';
            }
          })
          .catch(error=>{
            console.log(error);
          })
      }
    },
    created(){
      this.transferParams.empId=this.currentEmpId;
      this.getListData();
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  #channel_allocate_modal{
    .el-dialog{
      border:1px solid #7ba3ff;
      box-shadow: 0 0 10px #7bb0ff;
      border-radius: 10px;
      background: #43475b;
      .el-dialog__title{
        color: #fff
      }
      .el-dialog__body{
        color: #fff;
        .p(0);
        .cam_content_row{
          .m(0)!important;
          .h(400px);
          .p(0 15px 15px);
          .cam_content_col{
            .h(100%);
            .cam_content_wrapper{
              .h(100%);
              .cam_title{
                .h(30px);
                .l-h(30px);
                .p-l(10px);
              }
              .cam_list_wrapper{
                .h(calc(~"100% - 30px"));
                border:1px solid @border;
                .cam_error_box{
                  .h(30px);
                  .l-h(30px);
                  .t-a(center);
                  border-bottom:1px solid @border;
                }
                .cam_list_content{
                  overflow: auto;
                  .h(calc(~"100% - 30px"));
                  .cam_list{
                    .h(30px);
                    .l-h(30px);
                    .p-l(10px);
                    cursor:pointer;
                  }
                }
                //设置滚动条的样式
    .cam_list_content::-webkit-scrollbar {
      width: 6px;/*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
    }
    //滚动条的滑块
    .cam_list_content::-webkit-scrollbar-thumb {
      display: inline-block;
      background-color: #4a88fa;
      border-radius: 3px;
      box-shadow: inset 0 0 5px #4a88fa;
    }
    //滚动条里面轨道
    .cam_list_content::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #43475B;
      border-radius: 0;
      background: #43475B;
    }
    //定义右下角拖动块的样式
    .cam_list_content::-webkit-scrollbar-corner {
      background-color: #43475B;
    }
              }
            




            }
          }
        }
      }
      .el-dialog__footer{
        text-align: center;
      }
    }
  }
</style>

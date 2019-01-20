<template>
    <div id="channel_allocate_modal">
      <el-dialog :title="currentUser" :visible.sync="showModal" width="600px" @close="close">
        <el-row class="cam_content_row" :gutter="30">
          <el-col class="cam_content_col" :span="12" v-for="(item,index) in listData" :key="index">
            <div class="cam_content_wrapper">
              <div class="cam_title" v-text="item.text"></div>
              <div class="cam_list_wrapper">
                <div class="cam_error_box" v-text="item.val=='unallocatedChannel'?'-> ->':'<- <-'"></div>
                <ul class="cam_list_content">
                  <li class="cam_list" v-for="(list,liIndex) in item.val=='unallocatedChannel'?unallocatedChannelResData:myChannelResData" :key="liIndex"
                      v-text="list.channelName" @click="clickItem({liVal:list,itemVal:item.val})"></li>
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
        props:['showChannelAllocationModal','currentEmpId','currentUser'],
        data() {
            return {
              showModal:true,
              listData:[
                {val:'unallocatedChannel',text:'未分配渠道'},
                {val:'myChannel',text:'我的渠道'}
              ],
              ChannelParams:{      //未分配渠道请求参数
                isPage:'0',
              },
              unallocatedChannelResData:[],       //未分配渠道请求的数据
              myChannelResData:[],                //我的渠道请求的数据
              transferParams:{                    //转移参数
                empId:'',
                channelIdStr:''
              },
//              unallocatedChannelCopyData:[],
//              myChannelCopyData:[],
              filterArr:[]
            }
        },
        methods:{
          /**
           * 关闭：
           */
          close(){
            this.$parent.isChannelAllocationModalCom='';
          },
          /**
           * 未分配渠道：
           */
          getListData(dataName,params){
            this.$axios.post("/api/CMM/page/myChannel/myChannel_getUserPeoChannel",this.$qs.stringify(params))
              .then(res =>{
                this[dataName+'ResData']=res.data.data;
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
                case 'unallocatedChannel':
                  this.unallocatedChannelResData.map((item,index)=>{
                    if(item.channelId==obj.liVal.channelId){
                      this.unallocatedChannelResData.splice(index,1);
                      this.myChannelResData.push(obj.liVal);
                    }
                  });
                  break;
                case 'myChannel':
                  this.myChannelResData.map((item,index)=>{
                    if(item.channelId==obj.liVal.channelId){
                      this.myChannelResData.splice(index,1);
                      this.unallocatedChannelResData.push(obj.liVal);
                    }
                  });
                  break;
              };

              var arr=[];
              this.myChannelResData.map((item)=>{
                arr.push(item.channelId);
              })
              this.transferParams.channelIdStr=arr.toString();
          },
          /**
           * 确认转移：
           * @param itemId
           */
          transfer(itemId){
            this.$axios.post("/api/CMM/page/taskDistribution/taskDistribution_updateRoleForUser",this.$qs.stringify(this.transferParams))
              .then(res =>{
                this.$message('转移成功！');
                this.$parent.isChannelAllocationModalCom='';
              })
              .catch(error=>{
                console.log(error);
              })
          }
        },
        created(){
          this.transferParams.empId=this.currentEmpId;
          this.getListData('unallocatedChannel',Object.assign({},{queryTaskType:1,underEmpId:this.currentEmpId},this.ChannelParams));
          this.getListData('myChannel',Object.assign({},{empId:this.currentEmpId},this.ChannelParams));
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

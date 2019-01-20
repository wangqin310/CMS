<template>
    <div id="choose_channel_modal">
      <el-dialog :title="'选择渠道'" class="ji_dialog" :visible.sync="show" width="600px" @close="close">
        <el-row class="row_wrapper">
          <el-col :span="12" class="channel_wrapper">
            <p class="title">渠道</p>
            <div class="col_content_wrapper">
              <el-table :data="chooseChannelResData" class="addUserTable" style="overflow: auto;textAlign: center;over-foll" @selection-change="changeCheckBox">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="50px" align="center" type="index"></el-table-column>
                <el-table-column property="channelName" label="渠道名称" width="80px" align="center"></el-table-column>
                <el-table-column property="cityName" label="所在城市" width="80px" align="center"></el-table-column>
                <el-table-column property="channelType" label="条线" width="80px" align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="12" class="choosed_channel_wrapper">
            <div class="button_wrapper">
              <div class="btn" @click="chooseChannel">&gt;&gt;选择</div>
              <div class="btn remove_btn" @click="removeChannel">&lt;&lt;移除 </div>
            </div>
            <p class="title">已选渠道</p>
            <div class="col_content_wrapper choosed_channel_content">
              <el-table class="addUserTable" :data="chooseChannelList"  style="overflow: auto;textAlign: center;" @selection-change="changeCheckBox1">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="序号" width="50px" align="center" type="index"></el-table-column>
                <el-table-column property="channelName" label="渠道名称"  align="center"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="makeSureChannel" size="mini" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        props:['showChannel'],
        data() {
            return {
              show:false,       //是否展示选择渠道弹框
              addChannelList:[],
              chooseChannelArray:[],
              chooseChannelList:[],
              chooseChannelArray:[],
              chooseChannelList:[],
              removeChannelList:[]
            }
        },
        computed:{
          chooseChannelResData(){
            return this.$store.getters.chooseChannelResData;
          }
        },
        methods:{
          /**
           * 关闭弹框：
           */
          close(){
            this.show=false;
            this.$parent.showChooseChannelModal='';
          },
          /**
           * 选择渠道表格的checkbox：
           */
          changeCheckBox(val){
            console.log(val);
            this.chooseChannelArray=val;
          },
          /**
           * 移除渠道表格的checkbox：
           */
          changeCheckBox1(val){
            this.removeChannelList=val;
          },
          /**
           * 选择渠道：
           */
          chooseChannel(){
            if(this.chooseChannelArray.length===0){
               this.$confirm('请选择需要渠道', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'warning'
                })
            }else{
              if(this.chooseChannelList.length!==0){
                var isSameChannel= false;
                this.chooseChannelArray.forEach( item =>{
                  isSameChannel = false;
                  this.chooseChannelList.forEach( item1 =>{
                    if(item1.channelId ===item.channelId){
                      isSameChannel=true;
                    }
                  });
                  if(!isSameChannel) {
                    this.chooseChannelList.push(item);
                  }
                })
              }else{
                this.chooseChannelList=this.chooseChannelArray;
              }
            }
          },
          /**
           * 移除已选渠道：
           */
          removeChannel(){
            if(this.removeChannelList == ''){
               this.$confirm('请选择需要移除渠道', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'warning'
                })
            }else{
              var remainChannelArray = [];
              this.chooseChannelList.forEach(item => {
                if(this.removeChannelList.indexOf(item) === -1){
                  remainChannelArray.push(item);
                }
              })
              this.chooseChannelList=remainChannelArray;
            }
          },
          /**
           * 选择渠道的确定按钮:
           */
          makeSureChannel(){
            if(this.chooseChannelList.length===0){
               this.$confirm('请选择需要渠道', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton:false,
                  type: 'warning'
                })
            }else{
              var channelNameString='';
              var channelIdString='';
              for(var i=0;i<this.chooseChannelList.length;i++){
                if(i==0){
                  channelNameString=this.chooseChannelList[i].channelName;
                  channelIdString=this.chooseChannelList[i].channelId;
                }else if(i==this.chooseChannelList.length-1){
                  channelNameString=channelNameString+','+this.chooseChannelList[i].channelName;
                  channelIdString=channelIdString+','+this.chooseChannelList[i].channelId;
                }else{
                  channelNameString=channelNameString+','+this.chooseChannelList[i].channelName;
                  channelIdString=channelIdString+','+this.chooseChannelList[i].channelId;
                }
              }
              console.log(this.$store.state.mutations.taskParams);
              this.$store.state.mutations.taskParams.channel=channelNameString;
              this.$store.state.mutations.taskParams.channelId=channelIdString;
              this.show=false;
              this.$parent.showChooseChannelModal='';
            }
          },
        },
        mounted(){
          this.show=this.showChannel;
        }
    }
</script>

<style lang="less">
  @import "../assets/less/reset";
  @import "../assets/less/common";
  #choose_channel_modal{
    .ji_dialog{
      .row_wrapper{
          .h(398px);
          .b-r(3px);
          background: #43475B;
          border: 1px solid #6387FE;
          box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
          //滚动条的宽度
      .channel_wrapper::-webkit-scrollbar {
        width: 6px;/*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
      }
      //滚动条的滑块
      .channel_wrapper::-webkit-scrollbar-thumb {
        display: inline-block;
        background-color: #4a88fa;
        border-radius: 3px;
        box-shadow: inset 0 0 5px #4a88fa;
      }
      //滚动条里面轨道
      .channel_wrapper::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #43475B;
        border-radius: 0;
        background: #43475B;
        border-left:1px solid #4a88fa;
      }
      //定义右下角拖动块的样式
      .channel_wrapper::-webkit-scrollbar-corner {
        background-color: #43475B;
      }
        //滚动条的宽度
      .el-table .el-table__body-wrapper::-webkit-scrollbar {
        width: 6px;/*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
      }
      //滚动条的滑块
      .el-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
        display: inline-block;
        background-color: #4a88fa;
        border-radius: 3px;
        box-shadow: inset 0 0 5px #4a88fa;
      }
      //滚动条里面轨道
      .el-table .el-table__body-wrapper::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #43475B;
        border-radius: 0;
        background: #43475B;
      }
      //定义右下角拖动块的样式
      .el-table .el-table__body-wrapper::-webkit-scrollbar-corner {
        background-color: #43475B;
      }
        .title{
          .h(30px);
          .l-h(30px);
          .b( #43475B);
          .p-l(10px);
          color: #fff;
          border-left: 1px solid #6387FE;

        }
        .el-col{
          .h(396px);
          &.channel_wrapper{
          border-right: 1px solid #6387FE;
            overflow:auto;
          }
          .col_content_wrapper{
            .h(366px);
            .b(#43475B);
            color: #fff;
            .el-table__header-wrapper{
             th{
               background: #43475B;
               border-bottom: 1px solid #6387FE;
               border-top: 1px solid #6387FE;

             }
            }
           .el-table__body-wrapper{
             background: #43475B;
              td{
                  background: #43475B;
                  border-bottom: 1px solid #6387FE;
              }
            }
          }
          &.choosed_channel_wrapper{
              border-right: 1px solid #6387FE;
              .p-l(60px);
              position:relative;
              background: #43475B;
              overflow:auto;
              .el-table__body-wrapper{
                background: #43475B;
              }
              .choosed_channel_content{
                  .b(#43475B);
                  border-left: 1px solid #6387FE;

              }
            .button_wrapper{
                left:0;
                .w(60px);
                .p-t(168px);
                position:absolute;
                .btn{
                    .h(22px);
                    .w(100%);
                    .l-h(20px);
                    .b-r(3px);
                    .b(#43475B);
                    .t-a(center);
                    cursor:pointer;
                    display:block;
                    color:#fff;
                    border:1px solid #6387FE;
                    &.remove_btn{
                      .m-t(20px);
                    }
                }
            }
          }
        }
      }
     
    }
  }
</style>

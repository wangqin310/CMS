<template>
    <div id="ChannelManagers">
      <el-row :gutter="20"  class="cm_row_wrapper">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="card_wrapper" v-for="(manager,index) in ManagersList" :key='index'>
          <div class="card">
            <div class="left">
              <img @click="toRankInfo(manager.empId,manager.positionId)" :src="personUrl" alt="">
              <br>
              {{manager.userName}} <br>{{manager.positionName}}
            </div>
            <div class="right">
              <i class="el-icon-circle-close-outline" @click='clearClick(manager.empId)'></i>
              <span class="id">工号：{{manager.empId}}</span><br>
              <span class="phone">电话：{{manager.mobile}}</span><br>
              <span class="email">邮箱：{{manager.email}}</span><br>
              <span class="login_time">最后一次登录时间：{{manager.loginSessionTime}}</span><br>
              <!-- <span class="sign" @click="recordVisible(manager.empId)">平时签到记录</span> -->
              <!-- 2-区域总监 -->
              <div class="more" style="display:inline-block;" v-if="$root.loginUserInfo.positionId==2">
                  <span class="sign" @click="recordVisible(manager.empId)">平时签到记录</span>
                  <div class="backs" v-if="manager.positionId==7" style="display:inline-block">
                    <span class="back" @click="backClick(manager)">撤回</span>
                  </div>

                  <div class="powers" v-else-if="manager.positionId==0 && showPower == false" style="display:inline-block">
                    <span class="powerYesClick" @click='powerClick(manager)' >转授权</span>
                    <span class="modify" @click='modifyVisible(manager)'>修改条线</span>
                  </div>

                  <div class="powers" v-else-if="manager.positionId==0 && showPower == true" style="display:inline-block">
                    <span class="powerNoClick" >转授权</span>
                    <span class="modify" @click='modifyVisible(manager)'>修改条线</span>
                  </div>
              </div>

              <!--3-大区经理  4-总部总监  5-总部副总 7-代理总监 8-总部副总监-->
              <div class="more" style="display:inline-block;" v-if="$root.loginUserInfo.positionId==3||$root.loginUserInfo.positionId==4
              ||$root.loginUserInfo.positionId==5||$root.loginUserInfo.positionId==7||$root.loginUserInfo.positionId==8">
                  <div class="powers" v-if="manager.positionId==0" style="display:inline-block">
                    <span class="sign" @click="recordVisible(manager.empId)">平时签到记录</span>
                    <!-- <span class="modify" @click='modifyVisible(manager)'>修改条线</span> -->
                  </div>
              </div>

            </div>
          </div>
        </el-col>
      </el-row>

      <channel-sign-record :is="channelSignRecordCom" :tableDataName="tableDataName" :showChannelSignRecord="showChannelSignRecord" :gridData="resTableData"></channel-sign-record>

    <!-- 点击修改线条的弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogmodifyVisible" class="changeLine" width="30%">
      <el-select v-model="dialogmodify" >
        <el-option v-for="item in items"  :key="item.value" :value="item.value" :label="item.lable">
        </el-option>
      </el-select>
      <div slot="footer" class="dialogmodifyVisible-footer">
        <el-button size="mini" @click="dialogmodifyVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="modifySubmit(manager.empId)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击转授权的弹出框 dialogPowerVisible -->
    <el-dialog title="提示" :visible.sync="dialogPowerVisible" width="30%" class="changePower">
      <span>您确认将权限转交给{{manager.userName}}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogPowerVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="powerClear(manager)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击撤回的弹出框 dialogBackVisible -->
    <el-dialog title="提示" :visible.sync="dialogBackVisible" width="30%" >
      <span>您确定撤回{{manager.userName}}的权限吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogBackVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="backClear(manager)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击删除的弹出框 dialogClearVisible -->
    <el-dialog title="提示" :visible.sync="dialogClearVisible" width="30%" class="changePower">
      <span>您确认将该卡片删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogClearVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="clear(manager)">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
  import ChannelSignRecord from './ChannelSignRecord.vue'
  export default {
        name: "channel-managers",
        data(){
            return{
                    personUrl:require('@/assets/images/channel-manager_person.png'),
                    ManagersList:[],
                    items:[],
                    dialogmodify:'',
                    dialogrecordVisible:false,
                    dialogmodifyVisible:false,
                    dialogPowerVisible:false,
                    dialogBackVisible:false,
                    dialogClearVisible:false,
                    items:[
                      {lable:'场景',value:'M'},
                      {lable:'渠道',value:'A'},
                      {lable:'兼有',value:'O'}
                    ],
                    showPower:false,
                    manager:'',
                    showChannelSignRecord:false,
                    channelSignRecordCom:'',
                    tableDataName:'channelSignRecordTableData'
                  }
            },
        components:{
          ChannelSignRecord
        },
      computed:{
        rowData(){
          return this.$store.state.mutations.rowList;
        },
        /**
         * table表格数据：
         */
        resTableData(){
          this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
            if(item.ty==0){
              item.ty='签到';
            }
          });
          return this.$store.getters.resTableData[this.tableDataName];
        }
      },
        methods:{
          toRankInfo(empId,positionId){
            if(positionId == '0'){
              this.$store.state.mutations.myChannelEmpId = empId;
              this.$store.state.mutations.channelListIsActive = 'MyRanking';
            }
          },
          // 获取页面加载的卡片的数据
          getManagerList(){
            this.$axios.get("/api/CMM/page/myChannel/myChannel_getUserInfoByArea",{
              params:{
                areaName:this.rowData
              }
            }
              )
                .then(res =>{
                  if(res.data.data){
                    var datas=[]
                    for (var i = 0; i < res.data.data.length; i++) {
                      datas[i]= res.data.data[i];
                      if(res.data.data[i].positionId=='7'){
                        this.showPower = true;
                      }
                      if(res.data.data[i].positionId=='0'){
                        res.data.data[i].positionName='渠道经理'
                      }
                    }
                    this.ManagersList=datas;
                  }
                })
                .catch(error=>{
                  console.log(error);
                })
            },
            // 平时签到记录的数据
            recordVisible(val){
              this.showChannelSignRecord=true;
              this.channelSignRecordCom='ChannelSignRecord';
              this.$store.state.mutations.commonParams[this.tableDataName].searchParams.empId=val;
              /**
               * 请求表格列表数据：
               */
              this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
            },
            //点击修改线条触发的方法
            modifyVisible(manager){
              this.dialogmodifyVisible=true;
              this.manager = manager;
              this.dialogmodify = manager.assId;
            },
            //点击修改线条后点击确定的方法
            modifySubmit(emp){
              this.dialogmodifyVisible=false;
              this.$axios.get("/api/CMM/page/login/login_updateUserAss",{
                params:{
                  empId:emp,
                  assId:this.dialogmodify
                }
              }
              )
                .then(res =>{
                  this.getManagerList();
                })
                .catch(error=>{
                  console.log(error);
                 })
            },
            // 点击叉号按钮
            clear(emp){
              this.dialogClearVisible=false;
              this.$axios.get("/api/CMM/login_simpleDelUser",{
                params:{
                  empId:emp,
                }
              }
              )
                .then(res =>{
                  this.getManagerList();
                })
                .catch(error=>{
                  console.log(error);
                 })
            },
            //点击回撤的方法
            backClick(manager){
              this.dialogBackVisible=true;
                this.manager=manager;

            },
            //点击回撤后点击确定的方法
            backClear(manager){
              this.dialogBackVisible=false;
              this.$axios.get("/api/CMM/login_delJurisdiction",{
                  params:{
                    empId:manager.empId,
                    userName:manager.userName
                  }
                }
                )
                  .then(res =>{
                    this.showPower = false;
                    this.getManagerList();
                  })
                  .catch(error=>{
                    console.log(error);
                  })
            },
            //点击转授权的方法
            powerClick(manager){
                this.dialogPowerVisible=true;
                this.manager=manager;
            },
            //点击转授权后点击确定按钮
            powerClear(manager){
                this.dialogPowerVisible=false;
              this.$axios.get("/api/CMM/login_addJurisdiction",{
                  params:{
                    empId:manager.empId,
                    userName:manager.userName
                  }
                }
                )
                  .then(res =>{
                    this.getManagerList();
                  })
                  .catch(error=>{
                    console.log(error);
                  })
            },
            //点击删除按钮
            clearClick(manager){
                this.dialogClearVisible=true;
                this.manager=manager;
            }


        },
        created(){
          this.getManagerList();
        }
    }

</script>

<style lang="less">
  @import "./../../assets/less/reset";
  #ChannelManagers{
    .w(100%);
    .h(100%);
    .cm_row_wrapper{
      .m(0)!important;
    }
    .card_wrapper{
    //  .h(240px);
    //  min-height:240px;
      margin-top: 20px;
      .card{
        // .w(100%);
        // .h(100%);
        min-height:236px;
        min-width: 300px;
        border: 1px solid #7ba3ff;
        box-shadow: 0 0 10px #7bb0ff;
        border-radius: 8px;
        overflow: hidden;
        background: #43475b;
        .left{
          float: left;
          width:20%;
          min-height:238px;
          text-align: center;
          min-height: 265px;
        //  height: 100%;
          border-right: 1px solid #687094;
          padding-bottom: 30px;
          img{
            margin: 47px 0 19px 0;
          }
        }
        .right{
          width:80%;
          float: left;
          padding-top: 18px;
          height: 100%;
          position: relative;
        //  border-left: 1px solid #34374d;
          font: 14px/41px '微软雅黑';
          padding-left: 10px;
          .sign,.modify,.back,.powerYesClick{
            font: 12px/40px '微软雅黑';
            color: #4bb4fe;
            text-decoration: underline;
            cursor: pointer;
          }
          .powerNoClick{
            color: #fff
          }
          .sign,.modify,.powerYesClick,.back,.powerNoClick{
            margin-right: 10px;
          }
          .sign:hover,.modify:hover,.power:hover,.back:hover,.powerYesClick:hover{
            color: #fff;

          }
          i{
            font-size: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          }
        }
      }
    }
    .signRecord{
      .el-dialog{
        width: 666px;
        height: 620px;
        background: #43475B;
        border-radius:10px;
        border: 1px solid #6387FE;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-dialog__title{
        color: #fff;
        }
        .el-dialog__body{
          .el-table--fit{
          // width:600px;
          background: #43475B;
          border-radius:3px;
          border: 1px solid #6387FE;
          box-shadow:0px 0px 18px 2px rgba(99,143,254,0.3);
          th,td{
            border-bottom: 1px solid #6387FE;
            background:#43475B!important;
            .cell{
              font: 13px/13px '微软雅黑';
            }
          }
          .el-table::before{
            height: 0;
          }
          }

        }

      }

      .el-table{
        width: 600px;
        height: 439px;
      }
    }
    .changeLine{
      .el-dialog{
        background: #43475B;
        border-radius:10px;
        color: #fff;
        border: 1px solid #6387FE;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-dialog__title{
          color: #fff;
        }
        .el-dialog__body{
        border-radius: 3px;
        background: #43475B;
        color: #f5f5f6;
        input{
        background: #43475B;
        border: 1px solid #6387FE;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        color: #fff;
        }
        }
      }
    }
    .changePower{
      .el-dialog{
        background: #43475B;
        border-radius:10px;
        color: #fff;
        border: 1px solid #6387FE;
        box-shadow:0px 0px 18px 2px rgba(99,135,254,0.3);
        .el-dialog__title{
          color: #fff;
        }
        .el-dialog__body{
        color: #fff;
      }
      }

    }
  }

</style>

<template>
    <div id="user_edit">
      用户名：<input type="text" placeholder="请输入用户名称" class="userName" v-model="userEditTableData.searchParams.userName">
      <el-button  type="primary" size="mini" class="detail" @click="search">查询</el-button>
      <el-button  type="primary" size="mini" class="detail" @click="reset">重置</el-button>
      <div class="table_wrapper">
        <el-table :data="resTableData" height="515" style="width: 100%"
                  :default-sort = "{prop: 'status', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
          <el-table-column sortable prop="userName"  label="姓名" width="120"></el-table-column>
          <el-table-column sortable prop="userAccount"  label="用户号" width="120"></el-table-column>
          <el-table-column sortable prop="empId"  label="工号" width="160"></el-table-column>
          <el-table-column sortable prop="userType" label="用户类型" width="140"></el-table-column>
          <el-table-column sortable prop="positionName" label="用户职务" width="140"></el-table-column>
          <el-table-column sortable prop="orgName" label="所在部门" width="140"></el-table-column>
          <el-table-column sortable prop="tel" label="联系电话" width="180"></el-table-column>
          <el-table-column sortable prop="mobile" label="手机号"  width="140"></el-table-column>
          <el-table-column sortable prop="email" label="电子邮箱"  width="140"></el-table-column>
          <el-table-column sortable prop="action" label="操作" >
            <template slot-scope="scope" >
              <el-button round  type="warning" size="mini" @click="handleClick(scope.row)">
                修改
              </el-button>
              <el-button round  type="warning" size="mini"  @click="delectClick(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="用户信息详情" :visible.sync="dialogFormVisible" class="moreMessage" @close="close()">
          <el-form :model="form">
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="form.userName" autocomplete="off"  ></el-input>
            </el-form-item>
            <el-form-item label="用户号：" :label-width="formLabelWidth">
              <el-input v-model="form.userAccount" autocomplete="off" :disabled='isDisable'></el-input>
            </el-form-item>
            <el-form-item label="工号：" :label-width="formLabelWidth">
              <el-input v-model="form.empId" autocomplete="off" :disabled='isDisable'></el-input>
            </el-form-item>
            <el-form-item label="用户类型：" :label-width="formLabelWidth">
              <el-select v-model="form.assId" >
                <el-option label="场景" value="M"></el-option>
                <el-option label="渠道" value="A"></el-option>
                <el-option label="兼有" value="O"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户职务：" :label-width="formLabelWidth">
              <el-select v-model="form.positionId" >
                <el-option label="渠道经理" value="0"></el-option>
                <el-option label="渠道高级经理" value="1"></el-option>
                <el-option label="区域总监" value="2"></el-option>
                <el-option label="大区经理" value="3"></el-option>
                <el-option label="总部总监" value="4"></el-option>
                <el-option label="总部副总" value="5"></el-option>
                <el-option label="代理总监" value="7"></el-option>
                <el-option label="总部副总监" value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在部门：" :label-width="formLabelWidth">
              <el-input v-model="form.orgName" autocomplete="off" :disabled='isDisable'></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" :label-width="formLabelWidth">
              <el-input v-model="form.tel" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="手机号：" :label-width="formLabelWidth">
              <el-input v-model="form.mobile" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="save()" v-text="btnText"></el-button>
          </div>
        </el-dialog>
      </div>

      <!--分页-->
      <div class="page_wrapper">
        <pagination :tableDataName="tableDataName"></pagination>
      </div>
      <!-- 点击是否删除的弹出框 dialogPowerVisible -->
    <el-dialog title="提示" :visible.sync="dialogisDeleteVisible" width="30%" class="isDelete">
      <span>您确定删除该用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogisDeleteVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="deleteUser(row)">确 定</el-button>
      </span>
    </el-dialog>
    </div>



</template>

<script type="text/ecmascript-6">
    import Pagination from './../../components/Pagination.vue'

    export default {
        name: '',
        data() {
            return {
              btnText:'确定',
              dialogFormVisible: false,
              dialogisDeleteVisible:false,
              isDisable:true,
              form:{
                userName:'',
                userAccount:'',
                empId:'',
                assId:'',
                positionId:'',
                orgName:'',
                tel:'',
                mobile:'',
                email:'',
                operation:'',

                delivery: false,
                type: [],
                resource: '',
                desc: ''
              },
              formLabelWidth: '100px',

              tableDataName:'userEditTableData'    //接口返回的数据名称

            }
        },
      components:{Pagination},
      computed:{
        resTableData(){
          this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
            switch (item.positionId) {
              case '0':
                item.positionName='渠道经理';
                break;
              case '1':
                item.positionName='渠道高级经理';
                break;
              case '2':
                item.positionName='区域总监';
                break;
              case '3':
                item.positionName='大区经理';
                break;
              case '4':
                item.positionName='总部总监';
                break;
              case '5':
                item.positionName='总部副总';
                break;
              case '7':
                item.positionName='代理总监';
                break;
              case '8':
                item.positionName='总部副总监';
                break;
            }
            switch(item.assId){
              case 'M':
                item.userType='场景';
                break;
              case 'A':
                item.userType='渠道';
                break;
              case 'O':
                item.userType='兼有';
                break;
            }
          })
          return this.$store.getters.resTableData[this.tableDataName];
        },
        loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
        userEditTableData(){
          return this.$store.state.mutations.commonParams.userEditTableData;
        }
      },

      mounted(){
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
      },
      methods:{
        search(){
          this.$store.getters.tableLimit.current=1;
          this.$store.state.mutations.tableLimit.params.start=0;
          this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
        },
        /**
         * 重置：
         */
        reset(){
          this.userEditTableData.searchParams.userName='';
          this.$store.state.mutations.commonParams[this.tableDataName].current=1;
          this.$store.state.mutations.tableLimit.params.start=0;
          this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
        },

        handleClick(row) {
          this.isChange=false;
          // this.isDisable=false;
          this.dialogFormVisible=true;
          this.form.userName=row.userName;
          this.form.empId=row.empId;
          this.form.userAccount=row.userAccount;
          this.form.orgName=row.orgName;
          this.form.positionId=row.positionId;
          this.form.assId=row.assId;
          this.form.tel=row.tel;
          this.form.mobile=row.mobile;
          this.form.email=row.email;

        },

        success() {
          this.$message({
            message: '提交成功',
            type: 'success',
          });

        },
        delsuccess() {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        },
         /*保存*/
        save(){
          // this.isDisable=true;
          this.dialogFormVisible=false;
          this.$axios.get("/api/CMM/login_updateUserInfo",
            {
              params:{
                userName:this.form.userName,
                userAccount:this.form.userAccount,
                empId:this.form.empId,
                userType:this.form.assId,
                positionId:this.form.positionId,
                orgName:this.form.orgName,
                officeTel:this.form.tel,
                mobile:this.form.mobile,
                email:this.form.email,
              }
            }
          )
            .then(res =>{
                this.success();
                this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
            })
            .catch(error=>{
              console.log(error);
            })

        },
        /*删除用户弹出框*/
        delectClick(row){
          this.dialogisDeleteVisible=true;
          this.row=row;
        },
         deleteUser(row){
          this.dialogisDeleteVisible=false;
          this.$axios.get("/api/CMM/login_simpleDelUser",
            {
              params:{
                empId:this.form.empId=row.empId,
              }
            }
          )
            .then(res =>{
              console.log(res);
              this.delsuccess();
              this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
            })
            .catch(error=>{
              console.log(error);
            })

        }, 
        /*关闭弹框*/
        close(){
          console.log("弹框关闭");
        }

      }
    }

</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  #user_edit{
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;
    .detail{
      margin: 0 5px;
    }
    .userName{
      background: #2f3445;
      color: #f5f5f6;
      width: 100px;
      height: 28px;
      border: 1px solid #7ba3ff;
      border-radius: 3px;
      box-shadow: 0 0 10px #7bb0ff;
      padding-left: 8px;
      font: 12px/28px '微软雅黑';
      margin-right: 0;
    }
    }
  //对话框
  .el-dialog{
    border: 1px solid #7ba3ff;
    border-radius: 3px;
    box-shadow: 0 0 10px #7bb0ff;
    .el-dialog__header{
      background: #43475B;
      border-bottom: 1px solid #34374D;
      .el-dialog__title{
        color: #fff;
      }
      .el-dialog__headerbtn{
        border: none;
      }
    }
    .el-dialog__body{
      background: #43475B;
      padding-right: 5%;
      .el-form-item__label{
        color: #fff;
      }
      .el-input__inner{
        width: 100%;
        border: 1px solid #7ba3ff;
        border-radius: 3px;
        background: #43475B;

      }
      .el-select{
        width: 100%;
      }
      span{
        color: #fff;
      }
    }
    .el-dialog__footer{
      background: #43475B;
      height: 43px;
      border-top: 1px solid #34374D;

    }
  }
</style>

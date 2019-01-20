<template>
  <div id="myChannel">
   <!-- 筛选按钮 -->
    <div class="filter">
        <el-popover  placement="bottom"   width="200"  trigger="click">
          <template>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(item,index) in tableOptions" :label="item.labelName" :key="index" v-model="checkedCities">{{item.labelName}}</el-checkbox>
            </el-checkbox-group>
          </template>
          <img :src="filterUrl" title="筛选" class="" slot="reference">
        </el-popover>
    </div>
    <!-- 表格 -->
    <div class="table_wrapper">
      <el-table :data="resTableData" height="405" style="width: 100%"
        :default-sort = "{prop: 'status', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading" element-loading-background="#2f3445">
        <el-table-column sortable prop="status"  label="渠道状态" width="120">
          <template slot-scope="scope">
            <div>
              <div class="states">
                <div :class="{success:scope.row.status==1,try:scope.row.status==2,pause:scope.row.status==3,close:scope.row.status==0}">
                  <i></i>
                </div>
               </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column sortable prop="empName"  label="渠道经理"  width="120">
          <template slot-scope="scope">
            <div :style="{color:scope.row.empName=='<未分配>'?'#F00':''}">
              {{scope.row.empName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for='(item,index) in checkedOptions' width="180" sortable="true"  :prop="item.propName" :key="index" :label="item.labelName" ></el-table-column>
        <el-table-column sortable prop="action" label="操作" >
          <template slot-scope="scope" >
            <el-button round  type="warning" size="mini" class="detail" @click="handleClick(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="渠道信息详情" :visible.sync="dialogFormVisible" class="moreMessage">
        <el-form :model="form">
                <el-form-item label="渠道名称(中文)：" :label-width="formLabelWidth">
                  <el-input v-model="form.channelName" autocomplete="off"  :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="渠道经营场所地址：" :label-width="formLabelWidth">
                  <el-input v-model="form.channelAdd" autocomplete="off" :disabled='isDisable'></el-input>
                </el-form-item>
                <el-form-item label="法人：" :label-width="formLabelWidth">
                  <el-input v-model="form.legalPerson" autocomplete="off" :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="法人身份ID：" :label-width="formLabelWidth">
                  <el-input v-model="form.finaLegalRepresentId" autocomplete="off" :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="法人联系方式：" :label-width="formLabelWidth">
                  <el-input v-model="form.legalPertel" autocomplete="off" :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="渠道负责人：" :label-width="formLabelWidth">
                  <el-input v-model="form.channelHead" autocomplete="off" :disabled='isDisable'></el-input>
                </el-form-item>
                <el-form-item label="渠道负责人联系方式：" :label-width="formLabelWidth">
                  <el-input v-model="form.channelHeadtel" autocomplete="off" :disabled='isDisable'></el-input>
                </el-form-item>
                <el-form-item label="渠道成立时间：" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.channelBegin" :disabled='isDisable' type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合作开始时间：" :label-width="formLabelWidth">
                   <el-date-picker v-model="form.cooperaBegin" :disabled='isDisable' type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合作结束时间：" :label-width="formLabelWidth" >
                   <el-date-picker v-model="form.cooperaEnd" :disabled='isDisable' type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <div class="timeTip" v-text="timeTip1"></div>
                </el-form-item>
                <el-form-item label="合同开始时间：" :label-width="formLabelWidth">
                   <el-date-picker v-model="form.contractBegin" :disabled='isDisable' type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  <span>*</span>
                </el-form-item>

                <el-form-item label="合同结束时间：" :label-width="formLabelWidth">
                   <el-date-picker v-model="form.contractEnd" :disabled='isDisable' type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  <span>*</span>
                  <div class="timeTip" v-text="timeTip2"></div>
                </el-form-item>
                <el-form-item label="营业执照注册号：" :label-width="formLabelWidth">
                  <el-input v-model="form.finaLicenseNo" autocomplete="off" :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="渠道营业执照地址(中文)：" :label-width="formLabelWidth">
                  <el-input v-model="form.finaChnAddr" autocomplete="off" :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="经营范围：" :label-width="formLabelWidth">
                  <el-input v-model="form.finaBusunessScope" autocomplete="off" :disabled='isDisable'></el-input>
                  <span>*</span>
                </el-form-item>
                <el-form-item label="渠道传真：" :label-width="formLabelWidth">
                  <el-input v-model="form.finaFax" autocomplete="off" :disabled='isDisable'></el-input>
                </el-form-item>
                <el-form-item label="渠道类型：" :label-width="formLabelWidth">
                  <el-select v-model="form.channelType" :disabled='isDisable'>
                    <el-option label="场景" value="M"></el-option>
                    <el-option label="渠道" value="A"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="渠道联系电话：" :label-width="formLabelWidth">
                  <el-input v-model="form.finaTel" autocomplete="off" :disabled='isDisable'></el-input>
                </el-form-item>
                <div class="tip">
                  	*标注为特殊字段
                </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="changeMessage(btnText)" v-text="btnText" ></el-button>
        </div>
      </el-dialog>

    </div>
    <div style="overflow:hidden;">
      <div class="states">
        <div :class="{[item.name]:item.status}" v-for="(item,index) in statusList" :key="index">
          <i></i>
          {{item.text}}
        </div>
      </div>
    </div>
   
    <div class="page">
      <Pagination :tableDataName="tableDataName"></Pagination>
    </div>
    
  </div>

</template>
<script>
  import Pagination from '../../components/Pagination';
  export default {
    name: "my-channel",
    props:['tableDataName'],
    data(){
      return{
            checkAll: false,
            checkedCities: ['渠道名称', '渠道地址','法人','法人联系方式','渠道负责人','渠道负责人联系方式'],
            tableOptions: [
              {propName:'channelName',labelName:'渠道名称'},
              {propName:'channelAdd',labelName:'渠道地址'},
              {propName:'legalPerson',labelName:'法人'},
              {propName:'legalPertel',labelName:'法人联系方式'},
              {propName:'channelHead',labelName:'渠道负责人'},
              {propName:'channelHeadtel',labelName:'渠道负责人联系方式'},
              {propName:'channelBegin',labelName:'渠道成立时间'},
              {propName:'cooperaBegin',labelName:'合作开始时间'},
              {propName:'contractBegin',labelName:'合同开始时间'},
              {propName:'contractEnd',labelName:'合同结束时间'},
              {propName:'finaTel',labelName:'渠道联系方式'},
              {propName:'channelType',labelName:'渠道类型'}
            ],
            isIndeterminate: true,
            
            filterUrl:require('@/assets/images/filter_white.png'),
            visible: false,
            name:'',
            dialogFormVisible: false,
            isChange:true,
            isDisable:true,
            timeTip1:'',
            timeTip2:'',
            statusList:[
              {name:'success',status:true,text:'合作'},
              {name:'try',status:true,text:'试用'},
              {name:'pause',status:true,text:'暂停'},
              {name:'close',status:true,text:'关闭'}
            ],
            form:{
                channelName:'',
                channelAdd:'',
                legalPerson:'',
                finaLegalRepresentId:'',
                legalPertel:'',
                channelHead:'',
                channelHeadtel:'',
                channelBegin:'',
                cooperaBegin:'',
                cooperaEnd:'',
                contractBegin:'',
                contractEnd:'',
                finaLicenseNo:'',
                finaChnAddr:'',
                finaBusunessScope:'',
                finaFax:'',
                channelType:'',
                finaTel:'',
                status:'',

                delivery: false,
                type: [],
                resource: '',
                desc: ''
                
              },
           formLabelWidth: '180px',

           pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
        },
        value2: '',
        checkedOptions:[]
      }
    },
    components:{
      Pagination
    },
    computed:{
      btnText(){
        return this.isChange?'修改':'保存';
      },
      table(){
        var table=[];
        this.tableOptions.map((item,index)=>{
          table.push(item.labelName) ;
        })
      return  table;

      },
      
      loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
        /**
         * table表格数据：
         */
        resTableData(){
          this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
            switch(item.channelType){
              case 'M':
                item.channelType='场景';
                break;
              case 'A':
                item.channelType='渠道';
                break;
              case 'O':
                item.channelType='兼有';
                break;
            }
            var checked=[];
            for (let i = 0; i < this.tableOptions.length; i++) {
              for (let j = 0; j < this.checkedCities.length; j++) {

                if(this.tableOptions[i].labelName==this.checkedCities[j]){
                  checked.push(this.tableOptions[i]);
                }
              }
            }
            this.checkedOptions=checked;
          })
          return this.$store.getters.resTableData[this.tableDataName];
        }
    },
    methods:{
      handleCheckAllChange(val) {
        console.log(this.table);
        this.checkedCities = val ? this.table : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.table.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.table.length;
      },
      handleClick(row) {
        this.isChange=true;
        this.isDisable=true;
        this.dialogFormVisible=true;
        this.form.channelName=row.channelName;
        this.form.channelAdd=row.channelAdd;
        this.form.legalPerson=row.legalPerson;
        this.form.channelId=row.channelId;
        this.form.finaLegalRepresentId=row.finaLegalRepresentId;
        this.form.legalPertel=row.legalPertel;
        this.form.channelHead=row.channelHead;
        this.form.channelHeadtel=row.channelHeadtel;
        this.form.channelBegin=row.channelBegin;
        this.form.cooperaBegin=row.cooperaBegin;
        this.form.cooperaEnd=row.cooperaEnd;
        this.form.contractBegin=row.contractBegin;
        this.form.contractEnd=row.contractEnd;
        this.form.finaLicenseNo=row.finaLicenseNo;
        this.form.finaChnAddr=row.finaChnAddr;
        this.form.finaBusunessScope=row.finaBusunessScope;
        this.form.finaFax=row.finaFax;
        this.form.channelType=(row.channelType=='场景')?'M':'A';
        this.form.finaTel=row.finaTel;

      },
      change(){
        this.isChange=false;
        this.isDisable=false;
        this.dialogFormVisible=true;
      },
      success() {
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      },
      save(){
        this.isDisable=true;
        // this.dialogFormVisible=false;
        this.$axios.get("/api/CMM/page/myChannel/myChannel_updateChannel",
              {
                params:{
                  channelId:this.form.channelId,
                  channelBegin:this.form.channelBegin,
                  channelHead:this.form.channelHead,
                  channelHeadtel:this.form.channelHeadtel,
                  finaLicenseNo:this.form.finaLicenseNo,
                  finaMerKind:this.form.channelType,
                  finaChnAddr:this.form.finaChnAddr,
                  finaBusunessScope:this.form.finaBusunessScope,
                  finaTel:this.form.finaTel,
                  finaFax:this.form.finaFax,
                  finaLegalRepresentId:this.form.finaLegalRepresentId,
                  legalPerson:this.form.legalPerson,
                  legalPertel:this.form.legalPertel,
                  cooperaBegin:this.form.cooperaBegin,
                  cooperaEnd:this.form.cooperaEnd,
                  contractBegin:this.form.contractBegin,
                  contractEnd:this.form.contractEnd,
                  channelName:this.form.channelName,
                  channelAdd:this.form.channelAdd,
                }
              }
            )
              .then(res =>{
                 if(new Date(this.form.cooperaEnd).getTime()-new Date(this.form.cooperaBegin).getTime()<0){
                   this.dialogFormVisible=true;  
                   this.isDisable=false;
                   this.timeTip1='合作开始时间不能大于合作结束时间';
                   this.timeTip2='';
                   return;
                 }else if(new Date(this.form.contractEnd).getTime()-new Date(this.form.contractBegin).getTime()<0){
                   this.dialogFormVisible=true;  
                   this.isDisable=false;
                   this.timeTip1='';
                   this.timeTip2='合同开始时间不能大于合同结束时间';
                   return;
                 }else{
                   this.timeTip1='';
                   this.timeTip2='';
                   this.dialogFormVisible=false;
                   this.isDisable=true;
                   this.success();
                 }
                
              })
              .catch(error=>{
                console.log(error);
              })

      },
      changeMessage(val){
        switch(val){
          case '修改':
            this.change();
            break;

          case '保存':
            this.save();
            break;
        }
      },
      timeFormatter(row,column){
        row.channelBegin=row.channelBegin.substring(0,10);
        row.cooperaBegin=row.cooperaBegin.substring(0,10);
        row.cooperaEnd=row.cooperaEnd.substring(0,10);
        row.contractBegin=row.contractBegin.substring(0,10);
        row.contractEnd=row.contractEnd.substring(0,10);
        return row.channelBegin;
      }
    },
    mounted(){
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this});
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  @import "./../../assets/less/common";
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");
  #myChannel{
    width: 100%;
    height: 100%;
    .filter{
      text-align: right;
      img{
        cursor: pointer;
      }
    }
    //对话框
      .el-dialog{
        /*width: 700px;
        height: 564px; */
        width: 662px;
        height: 485px;
        .el-dialog__header{
          border-bottom: 1px solid #e5e5e5;
          .el-dialog__headerbtn{
            border: 1px solid #e5e5e5;
          }
        }
        .el-dialog__body{
          text-align: left;
          // height: 430px;
          height: 350px;
          overflow: auto;
          .el-input{
            width: 94%;
          }
          .el-form-item__label{
            text-align: left;
          }
          .tip{
            color:#c0c4cc;
            padding-left: 180px;
            margin-top: -21px;
          }
          .timeTip{
            margin-top: -8px;
            color: red;
            margin-left: -165px;
            text-align: left;
          }
        }
        .el-dialog__footer{
          .h(53px)!important;
          padding: 0;
          padding-top: 10px;
          padding-right: 20px;
          border-top: 1px solid #e5e5e5;
        }
      }
    //表格
    .table_wrapper{
      // height: 515px;
      height: 405px;
    }
    //表格中状态的样式
    div.states{
      float: left;
      overflow: hidden;
      div{
        float: left;
        margin-right: 10px;
      }
      i{
        display: inline-block;
        width: 30px;
        height: 4px;
        border-radius: 2px;
        vertical-align: middle;
      }
      .success{
        i{
          background: #61e884;
        }
      }
      .try{
        i{
          background: #f3c160;
        }
      }
      .pause{
        i{
          background: #ef5656;
        }
      }
      .close{
        position: static!important;
        font-size: 14px;
        i{
          background: #b6b6b6;
        }
      }

    }
    //点击更多弹出的对话框
    .moreMessage{
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
          .el-form-item{
              height: 63px;
              margin-bottom: 0;
          }
          .el-form-item__label{
            color: #fff;
          }
          .el-input__inner{
            width: 100%;
            border: 1px solid #7ba3ff;
            border-radius: 3px;
            background: #43475B;

          }
          span{
            color: #fff;
          }
          .tip{
            color: #fff;
          }
      }
      .el-dialog__footer{
        background: #43475B;
        // height: 43px;
        height: 66px!important;
        border-top: 1px solid #34374D;

      }
      }

    }
  }
  
</style>

<template>
  <div id="ChannelExamination">
    <div class="top">
      <div>
        <el-row>
          <el-col :span="6" v-if="checkPosition($root.loginUserInfo.positionId,2)">
            <el-row>
              <el-col :span="6">修改人：</el-col>
              <el-col :span="12"><el-input placeholder="请输入修改人" size="small" v-model="channelExaminationParams.searchParams.updatePeople"></el-input></el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <div class="statusSearch" style="display:inline-block;">
               状态：<el-select v-model="channelExaminationParams.searchParams.status" size="small" class="status">
                <el-option
                  v-for="item in statusList" :label="item.valDesc" :key="item.paraVal" :value="item.paraVal">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" v-if="checkPosition($root.loginUserInfo.positionId,3)">
            <div class="statusSearch" style="display:inline-block;">
              特殊状态：<el-select v-model="channelExaminationParams.searchParams.specialStatus" size="small" class="status">
              <el-option
                v-for="item in spStatusList" :label="item.valDesc" :key="item.paraVal" :value="item.paraVal">
              </el-option>
            </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search" size="small" >查询</el-button>
            <el-button @click="reset" size="small">重置</el-button>
          </el-col>
          <el-col :span="6" v-if="$root.loginUserInfo.positionId==6">
            <el-row>
              <div class="right">
                <el-button type="primary" @click="showIsExamine(1, -1, '', 1, 0)" size="small">通过</el-button>
                <el-button type="primary" @click="showIsExamine(0, -1, '', 1, 0)" size="small">不通过</el-button>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="table_wrapper">
      <el-table :data="resTableData" style="width: 100%"
                :default-sort = "{prop: 'updateTime', order: 'descending'}" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
        <el-table-column  v-if="$root.loginUserInfo.positionId==6"  type="selection"  width="55">
          <template slot-scope="scope">
            <el-checkbox :disabled="checkArray[scope.$index].isReadonly" v-model="checkArray[scope.$index].isCheck"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column sortable prop="channelName"  label="渠道名称" width="180"></el-table-column>
        <el-table-column sortable prop="updatePeople"  label="修改人"  width="80"></el-table-column>
        <el-table-column sortable v-if="checkPosition($root.loginUserInfo.positionId,1)" prop="updateContent" label="修改内容"  width="180">
          <template slot-scope="scope">
            <a @click="showUpdateContentDetail(scope.row.id,0,scope.row.contentIsUpdate)" class="spanWords">
              {{scope.row.updateContent}}
            </a>
          </template>
        </el-table-column>
        <el-table-column sortable v-if="checkPosition($root.loginUserInfo.positionId,1)" prop="contentIsUpdate"  label="修改内容审批状态"  width="180"> 
          <template slot-scope="scope">
            <span v-if="scope.row.contentIsUpdate==1">待审批</span>
            <span v-if="scope.row.contentIsUpdate==2||scope.row.contentIsUpdate==4">审批通过</span>
            <span v-if="scope.row.contentIsUpdate==3||scope.row.contentIsUpdate==5">审批不通过</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="updateSpecialContent"  label="修改特殊内容"  width="180">
          <template slot-scope="scope">
            <a @click="showUpdateContentDetail(scope.row.id,1,scope.row.specialContentIsUpdate)" class="spanWords">
              {{scope.row.updateSpecialContent}}
            </a>
          </template>
        </el-table-column>
        <el-table-column sortable v-if="$root.loginUserInfo.positionId==0||$root.loginUserInfo.positionId==1" prop="specialContentIsUpdate"  label="修改特殊内容审批状态"  width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.specialContentIsUpdate==4||scope.row.specialContentIsUpdate==5">审批中</span>
            <span v-else-if="scope.row.specialContentIsUpdate==1">待审批</span>
            <span v-else-if="scope.row.specialContentIsUpdate==2">审批通过</span>
            <span @click="seeReason(scope.row.reason)" class="noAdoptStyle" v-else-if="scope.row.specialContentIsUpdate==3">审批不通过</span>
          </template>
        </el-table-column>
        <el-table-column sortable v-if="$root.loginUserInfo.positionId==2||$root.loginUserInfo.positionId==7" prop="specialContentIsUpdate"  label="修改特殊内容审批状态"  width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.specialContentIsUpdate==1">待审批</span>
            <span v-else-if="scope.row.specialContentIsUpdate==2||scope.row.specialContentIsUpdate==3||scope.row.specialContentIsUpdate==4">审批通过</span>
            <span class="noAdoptStyle2" v-else-if="scope.row.specialContentIsUpdate==5">审批不通过</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="updateTime" label="修改时间" min-width="160"></el-table-column>
        <el-table-column sortable prop="status" v-if="$root.loginUserInfo.positionId==0||$root.loginUserInfo.positionId==1" label="状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">待审批</span>
            <span v-if="scope.row.status==2">审批中</span>
            <span v-if="scope.row.status==3">已审批</span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="specialContentIsUpdate" v-if="$root.loginUserInfo.positionId==6" label="状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.specialContentIsUpdate==4">待审批</span>
            <span v-if="scope.row.specialContentIsUpdate==2">审批通过</span>
            <span class="noAdoptStyle2" v-if="scope.row.specialContentIsUpdate==3">审批不通过</span>
          </template>
        </el-table-column>
        <el-table-column v-if="$root.loginUserInfo.positionId==2||$root.loginUserInfo.positionId==7" width="220" label="操作">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="showIsExamine(1, scope.row.id, scope.row.channelId, 0, 0)"
                       :disabled="scope.row.contentIsUpdate!=1"
                       round size="mini">通过</el-button>
            <el-button type="warning"
                       @click="showIsExamine(0, scope.row.id, scope.row.channelId, 0, 0)"
                       :disabled="scope.row.contentIsUpdate!=1"
                       round size="mini">不通过</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="$root.loginUserInfo.positionId==2||$root.loginUserInfo.positionId==7" width="200" label="特殊操作">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="showIsExamine(1, scope.row.id, scope.row.channelId, 1, 1)"
                       :disabled="scope.row.specialContentIsUpdate!=1"
                       round size="mini">通过</el-button>
            <el-button type="warning"
                       @click="showIsExamine(0, scope.row.id, scope.row.channelId, 1, 1)"
                       :disabled="scope.row.specialContentIsUpdate!=1"
                       round size="mini">不通过</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="$root.loginUserInfo.positionId==6" width="220" label="操作">
          <template slot-scope="scope">
            <el-button type="warning"
                       @click="showIsExamine(1, scope.row.id, scope.row.channelId, 1, 0)"
                       :disabled="scope.row.specialContentIsUpdate!=4"
                       round size="mini">通过</el-button>
            <el-button type="warning"
                       @click="showIsExamine(0, scope.row.id, scope.row.channelId, 1, 0)"
                       :disabled="scope.row.specialContentIsUpdate!=4"
                       round size="mini">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page_wrapper">
      <pagination :tableDataName="tableDataName" :isSearch="isSearch"></pagination>
    </div>
    <!-- 显示修改内容详情弹框 -->
    <el-dialog title="审核详情" :visible.sync="updateContentDetailVisible" width="50%" >
      <div class="table_wrapper">
        <el-table :data="detailList" style="width:100%" v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
          <el-table-column prop="term"  label="修改项"></el-table-column>
          <el-table-column prop="front"  label="修改前"></el-table-column>
          <el-table-column prop="after"  label="修改后">
            <template slot-scope="scope">
              <el-input v-model="scope.row.after" :disabled="scope.row.isReadonly==1" v-if="scope.row.labelType==1" size="small"></el-input>
              <el-date-picker class="dateStyle" format="yyyy-MM-dd" :disabled="scope.row.isReadonly==1" v-model="scope.row.after" v-else-if="scope.row.labelType==2" size="small"></el-date-picker>
              <el-select v-model="scope.row.after" :disabled="scope.row.isReadonly==1" size="small" v-else-if="scope.row.labelType==3">
                <el-option v-for="item in assList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div> 
      
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="updateContentDetailVisible=false">取 消</el-button>
        <el-button size="small" v-if="isSave" @click="updateContentDetail" type="primary">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 确认审批通过对话框 -->
    <el-dialog title="提示" :visible.sync="adoptToExamineVisible" width="30%" >
      <h5>你确认审批通过吗?</h5>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="adoptToExamineVisible=false">取 消</el-button>
        <el-button size="small" @click="adoptToExamineDB" type="primary">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 确认审批不通过对话框 -->
    <el-dialog title="提示" :visible.sync="noAdoptToExamineVisible" width="30%" >
      <h5>你确认审批不通过吗?</h5>
      <el-input
        v-if="$root.loginUserInfo.positionId==6"
        type="textarea"
        :rows="2"
        placeholder="请输入审批不通过原因！"
        v-model="hiddenValue.reason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="noAdoptToExamineVisible=false">取 消</el-button>
        <el-button size="small" @click="noAdoptToExamineDB" type="primary">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 查看审批不通过原因对话框 -->
    <el-dialog title="审批不通过原因" :visible.sync="seeReasonVisible" width="30%" >
      <h5>{{reasonValue}}</h5>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="seeReasonVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from './../../components/Pagination.vue'
  export default {
    name: "ChannelExamination",
    data(){
      return{
        seeReasonVisible:false,
        checkArray:[],
        tableDataName:'channelExaminationTableData',    //接口返回的数据名称
        isSearch:false,
        noAdoptToExamineVisible:false,
        adoptToExamineVisible:false,
        isSave:false,
        updateContentDetailVisible:false,
        cooperationList:[],
        tableData:[],
        cityList:[],
        statusList:[],
        spStatusList:[
          {'valDesc':'请选择','paraVal':''},
          {'valDesc':'待审批','paraVal':'1'},
          {'valDesc':'审批通过','paraVal':'2'},
          {'valDesc':'审批不通过','paraVal':'5'}
        ],
        managerList:[],
        value: '',
        isMyChannel:true,
        channelName:'',
        cooperation:'',
        city:'',
        status:'',
        updatePeople:'',
        detailList:[],
        assList:[
          {'label':'渠道','value':'A'},
          {'label':'场景','value':'M'}
        ],
        hiddenValue:{
          'isSpecial':'',
          'id':'',
          'channelId':'',
          'isArea':'',
          'reason':''
        },
        reasonValue: ''
      }
    },
    components:{
      Pagination
    },
    computed:{
      resTableData(){
        this.changData();
        return this.$store.getters.resTableData[this.tableDataName];
      },
      loading(){
        return this.$store.state.mutations.commonParams[this.tableDataName].isLoading;
      },
      channelExaminationParams(){
        return this.$store.state.mutations.commonParams.channelExaminationTableData;
      }
    },
    methods:{
      seeReason(reason){
        reason = reason.length == 0 ? '无' : reason;
        this.reasonValue = reason;
        this.seeReasonVisible = true;
      },
      handleSelectionChange(value){
        if(value.length > 0){//选中
          this.checkArray.map((item,index)=>{
            if(item.isReadonly == false){
              item.isCheck = true;
            }
          });
        }else{//没有选中
          this.checkArray.map((item,index)=>{
            if(item.isReadonly == false){
              item.isCheck = false;
            }
          });
        }
      },
      changData(){
        this.checkArray = [];
        var positionId = this.$root.loginUserInfo.positionId;
        if(positionId == '6'){
          this.$store.getters.resTableData[this.tableDataName].map((item,index)=>{
            var checkItem = {'id':'','isCheck':false,'isReadonly':false,'channelId':''};
            checkItem.id = item.id;
            checkItem.channelId = item.channelId;
            if(item.specialContentIsUpdate!=4){
              checkItem.isReadonly = true;
            }
            this.checkArray.push(checkItem);
          });
        }
      },
      noAdoptToExamineDB(){
        this.$axios.post("/api/CMM/page/myChannel/examination_noAdoptToExamine",
          this.$qs.stringify({
            'id':this.hiddenValue.id,
            'channelId':this.hiddenValue.channelId,
            'isSpecial':this.hiddenValue.isSpecial,
            'isArea':this.hiddenValue.isArea,
            'reason':this.hiddenValue.reason
          }))
          .then(res =>{
            this.noAdoptToExamineVisible = false;
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
            this.hiddenValue.reason = "";
            this.refresh();
          })
          .catch(error=>{
              console.log(error);
            }
          );
      },
      adoptToExamineDB(){
        this.$axios.post("/api/CMM/page/myChannel/examination_updateMyChannel",
          this.$qs.stringify({
            'id':this.hiddenValue.id,
            'channelId':this.hiddenValue.channelId,
            'isSpecial':this.hiddenValue.isSpecial,
            'isArea':this.hiddenValue.isArea
          }))
          .then(res =>{
            this.adoptToExamineVisible = false;
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
            this.refresh();
          })
          .catch(error=>{
              console.log(error);
            }
          );
      },
      showIsExamine(isAdopt, id, channelId, isSpecial, isArea){
        if(id == -1){
          var ids = "";
          var channelIds = "";
          this.checkArray.map((item,index)=>{
            if(item.isReadonly == false && item.isCheck == true){
              ids += item.id + ",";
              channelIds += item.channelId + ",";
            }
          });
          if(ids.length > 0){
            ids = ids.substring(0, ids.length - 1);
            channelIds = channelIds.substring(0, channelIds.length - 1);
            this.hiddenValue.id = ids;
            this.hiddenValue.channelId = channelIds;
          }else{
            this.$message({
              message: '请选择要操作的项！',
              type: 'success'
            });
            return;
          }
        }else{
          this.hiddenValue.id = id;
          this.hiddenValue.channelId = channelId;
        }
        this.hiddenValue.isSpecial = isSpecial;
        this.hiddenValue.isArea = isArea;
        if(isAdopt == 1){
          this.adoptToExamineVisible = true;
        }else{
          this.noAdoptToExamineVisible = true;
        }
      },
      updateContentDetail(){
        var str = "";
        for(var i = 0; i < this.detailList.length; i++){
          var detail = this.detailList[i];
          var newValue = detail.after;
          var oldValue = detail.front;
          if(detail.labelType == 2){
            oldValue = oldValue + " 00.00.00.0";
            if(typeof(detail.after) == "object"){
              var d = new Date(detail.after);
              newValue = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1):(d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? ('0'+d.getDate()):d.getDate()) +  " 00.00.00.0";//月份得+1，且只有个位数时在前面+0
            }else{
              newValue = detail.after + " 00.00.00.0";
            }
          }else if(detail.labelType == 3){
            oldValue = oldValue == "渠道" ? "A" : "M";
          }
          str += "'" + detail.perName + "':'" + oldValue + "," + newValue + "']";
        }
        str = str.substring(0, str.length - 1);
        this.$axios.post("/api/CMM/myChannel/examination_updateChannelExamination",
          this.$qs.stringify({
            id:this.hiddenValue.id,
            isSpecial:this.hiddenValue.isSpecial,
            str:str
        }))
          .then(res =>{
            this.updateContentDetailVisible = false;
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
          })
          .catch(error=>{
            console.log(error);
          })
      },
      showUpdateContentDetail(id,isSpecial, status){
        this.detailList = [];
        this.hiddenValue.id = id;
        this.hiddenValue.isSpecial = isSpecial;
        this.$axios.get("/api/CMM/page/myChannel/examination_getChannelExaminationById",
          {
            params:{
              'id':id,
              'isSpecial':isSpecial
            }
          }
        )
          .then(res =>{
            var list = res.data.data;
            var isReadonly = "0";
            this.isSave = true;
            if(status != "1"){
              isReadonly = "1";
              this.isSave = false;
            }
            for(var i = 0; i < list.length; i++){
              //labelType 1:文本框 2:时间 3:下拉框
              var detail = {'labelType':'1','isReadonly':isReadonly,'term':'','front':'','after':'','perName':''};
              var strs = list[i].split(",");
              if(strs[0] == "channelBegin"||strs[0] =="cooperaBegin"||strs[0] =="cooperaEnd"||strs[0]=="contractBegin"||strs[0]=="contractEnd"){
                var oldTime = strs[2];
                if(oldTime.length > 10){
                  oldTime = oldTime.substring(0,10);
                }
                var newTime = strs[3];
                if(newTime.length > 10){
                  newTime = newTime.substring(0,10);
                }
                detail.labelType = "2";
                detail.term = strs[1];
                detail.front = oldTime;
                detail.after = newTime;
              } else if(strs[0] == "finaMerKind"){
                detail.labelType = "3";
                detail.term = strs[1];
                detail.front = (strs[2] == "A" ? "渠道" : "场景");
                detail.after = strs[3];
              } else{
                detail.labelType = "1";
                detail.term = strs[1];
                detail.front = strs[2];
                detail.after = strs[3];
              }
              detail.perName = strs[0];
              this.detailList.push(detail);
            }
            this.updateContentDetailVisible=true;
          })
          .catch(error=>{
              console.log(error);
            }
          );
      },
      checkPosition(positionId,type){
        if(type == 1){
          if(positionId == 0 || positionId == 1 || positionId == 2 || positionId == 7){//渠道经理或区域总监
            return true;
          }else{
            return false;
          }
        }else if(type == 2){
          if(positionId == 6 || positionId == 2 || positionId == 7){//审核人或区域总监
            return true;
          }else{
            return false;
          }
        }else if(type == 3){
          if(positionId == 2 || positionId == 7){//区域总监
            return true;
          }else{
            return false;
          }
        }
      },
      getStatus(){
        var positionId = this.$root.loginUserInfo.positionId;
        if(positionId=='0' || positionId=='1'){
          this.statusList = [
            {'valDesc':'请选择','paraVal':''},
            {'valDesc':'待审批','paraVal':'1'},
            {'valDesc':'审批中','paraVal':'2'},
            {'valDesc':'已审批','paraVal':'3'}
          ];
        }else if(positionId=='2' || positionId=='7'){
          this.statusList = [
            {'valDesc':'请选择','paraVal':''},
            {'valDesc':'待审批','paraVal':'1'},
            {'valDesc':'审批通过','paraVal':'2'},
            {'valDesc':'审批不通过','paraVal':'3'}
          ];
        }else{
          this.statusList = [
            {'valDesc':'请选择','paraVal':''},
            {'valDesc':'待审批','paraVal':'4'},
            {'valDesc':'审批通过','paraVal':'2'},
            {'valDesc':'审批不通过','paraVal':'3'}
          ];
        }
      },
      search(){
        this.isSearch=true;
        this.$store.state.mutations.commonParams[this.tableDataName].current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this,isSearch:this.isSearch});
      },
      reset(){
        this.channelExaminationParams.searchParams.status = '';
        this.channelExaminationParams.searchParams.specialStatus = '';
        this.channelExaminationParams.searchParams.updatePeople = '';
      },
      refresh(){
        this.channelExaminationParams.searchParams.status = '';
        this.channelExaminationParams.searchParams.updatePeople = '';
        this.isSearch=true;
        this.$store.state.mutations.commonParams[this.tableDataName].current=1;
        this.$store.state.mutations.tableLimit.params.start=0;
        this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this,isSearch:this.isSearch});
      }
    },
    mounted(){
      //重置搜索条件
      this.reset();
      this.$store.state.mutations.tableLimit.params.order='desc';
      /**
       * 请求表格列表数据：
       */
      this.$store.dispatch("getAjaxTableData",{tableDataName:this.tableDataName,vm:this,isSearch:this.isSearch});
    },
    created(){
      this.getStatus();
    }
  }
</script>

<style lang="less">
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");
  @import "./../../assets/less/common";
        
  #ChannelExamination{
    // width: 95%;
    min-width: 1024px;
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 48px;
    // overflow: hidden;
    // padding-top: 2.4%;
    // margin-left: 2.4%;
    font: 14px/32px '微软雅黑';
    .top{
      margin-bottom: 20px;
      overflow: hidden;
      margin-bottom: 15px;

      select{
        width: 100px;
        height: 28px;
        border: 1px solid #7ba3ff;
        border-radius: 3px;
        background: #2f3445;
        color: #f5f5f6;
        box-shadow: 0 0 10px #7ba3ff;
        padding-left: 8px;
        font: 12px/28px '微软雅黑';
        // margin-right: 20px;
        margin-right: 0;
      }
      .el-input__icon{
        line-height: 30px;
      }

    }
    .table_wrapper{
      // .dateStyle input{
          // width: 180px;
        // }
        .spanWords{
          white-space:nowrap;          /* 不换行 */
          overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow:ellipsis;
          cursor:pointer;
        }
        .spanWords:hover {
          color: #7ba3ff;
        }
        .noAdoptStyle{
          color: #DD483B;
          cursor:pointer;
        }
        .noAdoptStyle2{
          color: #DD483B;
        }
        .noAdoptStyle:hover {
          color: #7ba3ff;
        }
    }
    
  }
  .el-dialog{
      background: #43475B;
      border: 1px solid #6387FE;
      box-shadow:0px 0px 18px 2px rgba(99,143,254,0.3);
      .el-dialog__header{
        .el-dialog__title{
          color: #fff;
        }
      }
      .el-dialog__body{
        color: #fff;
        .el-table--fit{
          background: #43475B;
          border-radius:3px;
          box-shadow:0px 0px 18px 2px rgba(99,143,254,0.3);
          th,td{
            border-bottom: 1px solid #6387FE;
            background:#43475B!important;
            .cell{
              font: 13px/13px '微软雅黑';
              .el-date-editor.el-input{
                input{
                width: 80%;
              }
              }
              
            }
          }
          td:last-child .cell{
            text-align: left;
          }
          .el-table::before{
            height: 0;
          }
        }
        .el-input__inner{
          border: 1px solid #6387FE;
        }
        .el-textarea{
          .el-textarea__inner{
            background: #43475B;
            border:1px solid #6387FE;
          }
        }
     }
    }
  .el-button--warning{
    padding: 4px 11px!important;
  }
</style>

<template>
    <div id="list">
      <div class="table_wrapper">
      <el-table :data="tableData"  height='600'  style="width: 100%"  :default-sort = "{prop: 'areaName', order: 'descending'}" 
      v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#2f3445">
        <el-table-column sortable  prop="areaName" label="区域名称">
        </el-table-column>
        <el-table-column sortable prop="channelNum" label="渠道总数">
        </el-table-column>
        <el-table-column sortable  prop="Person" label="区域负责人">
        </el-table-column>
        <el-table-column sortable  prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleClick(scope.row)" round  type="warning"  size="mini">
            查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
</template>

<script>
    export default {
      name: "list",
      data(){
          return{
            tableData: [],
            loading:false
        }
      },
      methods:{
          getList(){
            this.loading=true;
              this.$axios.get("/api/CMM/page/myChannel/myChannel_getAreaInfoByUser"
            )
              .then(res =>{
            this.loading=false;
                if(res.data.data){
                  var selectData = [];
                  for (let i = 0; i < res.data.data.length; i++) {
                    if(res.data.data[i].Person=="&nbsp;&nbsp;"){
                      res.data.data[i].Person=''
                    }
                    selectData[i] = res.data.data[i];
                  }
                  this.tableData=selectData;
                  this.$store.state.mutations.districtList=this.tableData;
                  this.$store.state.mutations.filterList=this.tableData.filter((item)=>item.name==this.cityName);
                }
              })
              .catch(error=>{
                console.log(error);
              })
          },
          handleClick(row){
              this.$store.state.mutations.rowList=row.areaName;
              this.$store.state.mutations.commonParams.myChannelTableData.searchParams.areaName=this.$store.state.mutations.rowList;
              this.$store.state.mutations.isDisplayList='ChannelList';
              this.$store.state.mutations.commonParams.myChannelTableData.current=1;
              this.$store.state.mutations.tableLimit.params.start=0;
          }
      },
      created(){
          this.getList();
      }

    }
</script>

<style lang="less">
  @import "./../../assets/less/common";
  @import url("//unpkg.com/element-ui@2.4.7/lib/theme-chalk/index.css");

#list{
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background: #2f3445;
  .el-table::before{
        height: 0;
    }
}
</style>

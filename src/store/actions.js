export default{
  getVisitTimeData(context,vm){
    return new Promise((resolve,reject)=>{
      vm.$axios.post("/api/CMM/page/main/workbench_getAreaAllLoginTime")
        .then((res)=>{
          context.commit("visitTimeData",res.data.data?res.data.data.slice(0,5):[]);
        })
    })
  },
  /**
   * 工作台新增日程、我的工作添加任务弹框的选择渠道数据：
   */
  chooseChannel(context,vm){
    vm.$axios.post("/api/CMM/page/myChannel/myChannel_getUserPeoChannel",
      vm.$qs.stringify(context.state.mutations.chooseChannel.params))
      .then(res =>{
        context.state.mutations.chooseChannel.resData=res.data.data;
        console.log(context.state.mutations.chooseChannel.params.empId);
      })
      .catch(error=>{
        console.log(error);
      })
  },
  /**
   * 舆情处理：
   */
  getResData(context,obj){
    obj.vm.$axios.post(obj.url,
      obj.vm.$qs.stringify(obj.params))
      .then(res =>{
        context.commit("getResData",{resDataName:obj.resDataName,resData:res.data.data||[]});
      })
      .catch(error=>{
        console.log(error);
      })
  },
  /**
   * 表格列表及查询数据请求：
   */
  getAjaxTableData(context,obj){
    context.state.mutations.commonParams[obj.tableDataName].isLoading=true;
    var params=Object.assign({},context.state.mutations.tableLimit.params,context.state.mutations.commonParams[obj.tableDataName].searchParams);
    obj.vm.$axios.post(context.state.mutations.commonParams[obj.tableDataName].tableUrl,
      obj.vm.$qs.stringify(params))
      .then(res =>{
        console.log(res);
        context.state.mutations.commonParams[obj.tableDataName].isLoading=false;
        context.state.mutations.commonParams[obj.tableDataName].total=res.data.data?Number(res.data.data.total):0;
        context.commit("getResTableData",{tableDataName:obj.tableDataName,resData:res.data.data?res.data.data.rows:[]});
      })
      .catch(error=>{
        console.log(error);
      })
  }
}

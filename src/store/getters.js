export default{
  filterNavs:(state)=>state.filterNavList,                      //导航数据
  isActive:(state)=>state.isActive,                             //导航激活状态
  visitVal:(state)=>state.visitVal,                             //工作台拜访次数数据
  loginUserInfo:(state)=>state.loginUserInfo,                   //登录信息
  isDisplayList:(state)=>state.isDisplayList,                   //我的渠道，动态展示组件
  warningTableData:(state)=>state.warningTableData,             //舆情预警表格数据
  chooseChannelResData:(state)=>state.chooseChannel.resData,    //选择渠道返回的数据
  taskParams:(state)=>state.taskParams,                         //新增日程、添加任务表单参数
  tableLimit:(state)=>state.tableLimit,                         //分页参数
  resTableData:(state)=>state.resTableData,                     //获取ajax的返回表格数据
  ajaxResData:(state)=>state.ajaxResData,                       //获取ajax返回的数据
  myWorkTableData:(state)=>state.myWorkTableData,               //我的工作表格数据
  isMyReportList:(state)=>state.isMyReportList                  //我的报告，动态展示组件
}

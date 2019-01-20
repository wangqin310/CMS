import getters from './getters'
const state={
  navList  :[    //所有导航数据
    {name:'navMainPage',text:'工作台',defaultUrl:require('@/assets/images/workPlatform-default.png'), activeUrl:require('@/assets/images/workPlatform-active.png')},
    {name:'navCustomerPage',text:'我的渠道',defaultUrl:require('@/assets/images/myChannel-default.png'),activeUrl:require('@/assets/images/myChannel-active.png')},
    {name:'navMarketingPage',text:'业绩排行榜',defaultUrl:require('@/assets/images/myRating-default.png'),activeUrl:require('@/assets/images/myRating-active.png')},
    {name:'navRecordingPage',text:'我的工作',defaultUrl:require('@/assets/images/myWork-default.png'),activeUrl:require('@/assets/images/myWork-active.png')},
    {name:'navReportPage',text:'我的报告',defaultUrl:require('@/assets/images/myReport-default.png'),activeUrl:require('@/assets/images/myReport-active.png')},
    {name:'navEarlyWarn',text:'舆情预警',defaultUrl:require('@/assets/images/warning-default.png'),activeUrl:require('@/assets/images/warning-active.png')},
    {name:'navSysMsg',text:'系统消息',defaultUrl:require('@/assets/images/systemNews-default.png'),activeUrl:require('@/assets/images/systemNews-active.png')},
    {name:'navChannelApproval',text:'渠道审批',defaultUrl:require('@/assets/images/ChannelExamination-default.png'),activeUrl:require('@/assets/images/channelexamination-active.png')},
    {name:'navChannelAllocation',text:'渠道分配',defaultUrl:require('@/assets/images/ChannelAllocation-default.png'),activeUrl:require('@/assets/images/ChannelAllocation-active.png')},
    {name:'navAreaAllocation',text:'区域分配',defaultUrl:require('@/assets/images/myReport-default.png'),activeUrl:require('@/assets/images/myReport-active.png')},
    {name:'navBehaviorRank',text:'行为排行榜',defaultUrl:require('@/assets/images/BehaviorRank-default.png'),activeUrl:require('@/assets/images/behaviorrank-active.png')},
    {name:'navAddUser',text:'用户新增',defaultUrl:require('@/assets/images/UserAdd-default.png'),activeUrl:require('@/assets/images/UserAdd-active.png')},
    {name:'navUpdateUser',text:'用户修改',defaultUrl:require('@/assets/images/UserEdit-default.png'),activeUrl:require('@/assets/images/UserEdit-active.png')},
    {name:'navUserOpinion',text:'帮助与反馈',defaultUrl:require('@/assets/images/HelpFeedback-default.png'),activeUrl:require('@/assets/images/helpFeedback-active.png')},
    {name:'navMyRankList',text:'我的排名',defaultUrl:require('@/assets/images/myRating-default.png'),activeUrl:require('@/assets/images/myRating-active.png')},
    {name:'navParameterSet',text:'参数设置',defaultUrl:require('@/assets/images/myRating-default.png'),activeUrl:require('@/assets/images/myRating-active.png')},
  ],
  // isLoading     :false,    //加载
  temNavData    :[],       //请求的导航数据的临时变量
  filterNavList :[],       //过滤后的导航
  isActive      :0,        //点击的导航的坐标
  visitVal      :{
    name:[],               //工作台--拜访次数名称
    times:[]               //工作台--拜访次数数值
  },
  showLoginStatus:'',      //工作台--系统使用次数--更多--区域卡片/登录次数
  loginStatusParams:{      //工作台--系统使用次数--更多--从区域卡片跳转到登录次数的参数
    userName:''
  },
  isFromWorkPage:false,    //是否从工作台页面进来
  channelTableData:[],
  loginUserInfo:{         //登录用户的基本信息
    isLogin:false,        //是否登录
    userName:'',
    positionId:'',
    description:'',
    empId:''
  },
  isDisplayList:'',       //我的渠道首页组建展示
  myChannelEmpId:'',      //我的渠道保留参数(用户工号)
  channelListIsActive:'MyChannel', //我的渠道保留参数(组件切换标识)
  isMyReportList:'',      //我的报告首页组件展示
  EditReportCom:'',       //我的报告弹框组件展示
  EditReportModalParams:null, //我的报告弹框参数
  isMyReportParams:{flag:true,positionId:''},        //判断是否是我的报告的参数
  reportFormData:{},          //我的报告表单数据
  enclosureUrl:'',            //我的报告附件路径
  onlineReportEditContent:'', //在线编辑的报告内容
  reprotTypeArray:[],      //报告类型
  districtList:[],        //大区经理我的渠道内容首页内容展示
  filterList:[],
  rowList:{},             //大区经理我的渠道首页每一行的数据
  tableLimit:{            //表格的分页参数
    params:{
      limit:10,             //一页展示多少条
      start:0,              //从第几条开始
      order:'asc',          //"升序"还是"降序"
    }
  },
  workPlanTaskParams:{    //工作台新增日程和我的工作添加任务弹框参数
    fromPage:'',          //从哪个页面跳转过来
  },
  warningTableData:[],    //舆情预警table数据
  chooseChannel:{         //选择渠道请求参数
    params:{
      empId:'',
      isPc:1,
      limit:0,
      page:1,
      start:0,
      sort:'channelName',
      dir:'DESC'
    },
    resData:[],           //选择渠道请求返回的数据
  },
  taskParams:{            //新增日程、添加任务参数
    taskType:null,        //任务类型
    channel:'',           //拜访渠道
    channelId:'',
    isPhoto:0,            //是否照片
    flow:false,           //审核状态
    taskDesc:'',          //任务描述
    taskFrequency:0,      //拜访频率
    forwardTaskId:'',
    forwardTaskSummary:'',
    zstaffName:'',        //任务执行人
    zstaffId:'',
    zstaffIdGroupVal:'',
    isYourSelf:1          //是否是自己
  },
  showAddModal:false, //是否显示新增日程、添加计划弹框
  showWarningModal:false,  //是否显示舆情处理弹框
  showCheckDialog:false, //我的工作-安排任务弹窗


  /**
   *  列表请求参数：
   */
  commonParams:{
    warningTableData:{         //舆情预警表格参数：
      tableUrl:'/api/CMM/page/earnWarn/earlyWarn_getEarlyWarnList',     //舆情预警表格列表请求参数
      // tableParams:{},        //表格参数
      searchParams:{         //查询参数
        earlyWarnTitle:'',   //舆情信息
        earlyWarnStatus:''   //舆情状态
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    myChannelTableData:{       //我的渠道表格参数：
      tableUrl:'/api/CMM/page/myChannel/myChannel_getMyChannelList',      //我的渠道表格列表请求参数
      searchParams:{          //查询参数
        myChannelName:'',     //渠道名称
        stdName:'',           //合作机构
        cityName:'',       //城市名称
        empId:'', //渠道经理
        status:'1' ,           //状态
        areaName:null         //大区经理的区域名称
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    behaviorRankTableData:{       //行为排行榜参数：
      tableUrl:'/api/CMM/page/BehaviorRank/rankList_getRankList',      //表格列表请求参数
      searchParams:{          //查询参数
        dateFrom:'',
        dateEnd:'',
        sortType:'channelVisitNum',
        area:'',
        assId:'A',
        status:'2',
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    SystemNewsTableData:{ //系统消息表格参数
      tableUrl:'/api/CMM/page/messTol/messTol_getMessTolList',
      searchParams:{},
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    channelSignRecordTableData:{   //我的渠道->渠道经理->平时签到记录->渠道签到记录表格参数：
      tableUrl:'/api/CMM/page/myChannel/myChannel_getSignByUser',      //渠道签到记录表格列表请求参数
      searchParams:{           //表格参数
        empId:''
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    channelExaminationTableData:{       //渠道审批表格参数：
      tableUrl:'/api/CMM/page/myChannel/examination_getChannelExamination',      //渠道审批表格列表请求参数
      searchParams:{          //查询参数
        status:'',      //状态
        specialStatus:'',//特殊内容状态
        updatePeople:'',   //修改人
        sort:'update_time'          //默认按修改时间排
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    channelManagerTableData:{          //渠道分配->渠道经理表格参数
      tableUrl:'/api/CMM/page/login/login_getAllUnderlingUserForPage',
      searchParams:{                   //查询参数
        channelManagerName:''          //渠道经理名称
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    allChannelTableData:{          //渠道分配->全部渠道表格参数
      tableUrl:'/api/CMM/page/myChannel/myChannel_getUserPeoChannel',
      searchParams:{                   //查询参数
        userName:'',                   //渠道经理名称
        queryTaskType:'1',              //渠道状态
        isPage:'1'
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    areaManagerTableData:{          //区域分配->大区经理经理表格参数
      tableUrl:'/api/CMM/login_getAllCashAreaManager',
      searchParams:{                   //查询参数
        userName:''          //大区经理名称
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    allAreaTableData:{          //区域分配->全部区域表格参数
      tableUrl:'/api/CMM/taskDistribution_getAllAreaRole',
      searchParams:{                   //查询参数
        roleName:'',                   //区域名
        isSystem:'0',
        isPage:'1'
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    areaRankFaList:{                //业绩排行榜
      tableUrl: '/api/CMM/page/ranking_getAllAreaRank',
      searchParams: {                   //查询参数
        limit: 10, order: 'asc', rankType: 0
      },
      current: 1,
      total: 0,
      isLoading     :false,    //加载
    },
    areaRankDaiyuList: {
      tableUrl: '/api/CMM/page/ranking_getAllAreaRank',
      searchParams: {                   //查询参数
        limit: 10, order: 'asc', rankType: 1
      },
      current: 1,
      total: 0,
      isLoading     :false,    //加载
    },
    myWorkTableData:{         //舆情预警表格参数：
      tableUrl:'/api/CMM/page/taskDistribution/taskDistribution_getTaskDistributionList',     //我的工作 表格 列表请求参数
      searchParams:{         //查询参数
        taskTitle:'',        //报告标题
        taskTypeParam:'',    //任务类型
        taskStatusParam:'',  //任务状态
        staffIdParam:'',     //执行人
      },
      current: 1,
      total: 0,
      isLoading     :false,    //加载
    },
    myReportTableData:{
      tableUrl:'/api/CMM/report_getReportList',      //我的报告列表请求参数
      searchParams:{          //查询参数
        isMyReport:0,
        empReport:'',
        myReportTitle:'',
        empReportStatus:''
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    adminReportTableData:{
      tableUrl:'/api/CMM/report_getAllReportList',      //管理员报告列表请求参数
      searchParams:{          //查询参数
        empId:'',
        reportTitle:'',
        reportType:'',
        isDelete:'0'
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    myReportUnderlingTableData:{
      tableUrl:'/api/CMM/login_getAllUnderlingUserForPage',      //我的报告下属人员列表请求参数
      searchParams:{          //查询参数
        channelManagerName:'',
        userId:'',
        userName:'',
        orgId:'',
        status:'2'
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    myReportAreaTableData:{
      tableUrl:'/api/CMM/report_getAllDep',      //我的报告下属人员列表请求参数
      searchParams:{                         //查询参数
        status: '2'
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    userEditTableData:{       //用户修改表格参数：
      tableUrl:'/api/CMM/page/UserEdit/login_getAllUserInfo',      //用户修改格列表请求参数
      searchParams:{          //查询参数
        userName:'',          //用户名
      },
      current:1,
      total:0,
      isLoading     :false,    //加载
    },
    helpFeedbackTableData:{           //帮助与反馈
      tableUrl:'/api/CMM/page/login/report_getOpinionQuestion',
      searchParams:{},
      current:1,
      total:0
    }
  },

  /**
   *  获取列表返回数据：
   */
  resTableData:{
    warningTableData:[],              //舆情预警表格请求的接口返回的数据
    myChannelTableData:[],            //我的渠道表格请求的接口返回的数据
    channelSignRecordTableData:[],    //我的渠道->渠道经理->平时签到记录->渠道签到记录表格请求的接口返回的数据
    channelExaminationTableData:[],   //渠道审批表格请求的接口返回的数据
    channelManagerTableData:[],       //渠道分配->渠道经理表格请求的接口返回数据
    allChannelTableData:[],           //渠道分配->全部渠道表格请求的接口返回数据
    areaRankFaList: [],               //发放量排行榜
    areaRankDaiyuList: [],            //贷余排行榜
    Top3AreaRankDaiyuList:[],         //贷余排行榜前三名
    Top3AreaRankFaList:[],            //发放量排行榜前三名
    myWorkTableData:[],               //我的工作表格数据
    myReportTableData:[],             //我的报告表格数据
    adminReportTableData:[],          //管理员我的报告表格数据
    SystemNewsTableData:[],           //系统消息表格数据
    behaviorRankTableData:[],         //行为排行榜表格数据
    myReportUnderlingTableData:[],    //我的报告人员列表表格数据
    myReportAreaTableData:[],         //我的报告区域列表表格数据
    userEditTableData:[],             //用户修改区域列表表格数据
    areaManagerTableData:[],          //区域分配->大区经理表格请求的接口返回数据
    allAreaTableData:[],              //区域分配->全部区域表格请求的接口返回数据
    helpFeedbackTableData:[]          //帮助与反馈列表表格数据
  },
  // 小铃铛中最新消息的数据
  hotNewsList:[],

  /**
   * ajax请求返回的数据：
   */
  ajaxResData:{
    warningDealResData:[]           //舆情预警表格操作->舆情处理请求数据
  },


  /**
   * 舆情预警：
   */
  warningParams:{
    showWarningDialogModal:false,  //是否显示舆情处理会话弹框
    showWarningAlertModal:false,   //是否显示舆情预警弹框
    publicId:'',              //上报人员Id
    dstaffId:''
  }
};

const mutations={
  /**
   * 导航切换
   * @param state
   * @param index
   */
  changeNav(state,index){
    state.showLoginStatus='';
    state.isActive=index;
    sessionStorage.setItem("activeNavIndex",index);
    state.isActive=sessionStorage.getItem("activeNavIndex");
  },
  /**
   * 导航过滤：
   * @param state
   * @param data
   */
  filterNavs(state,data){
    state.temNavData = [];
    data.map((item,index)=>{
      state.temNavData.push(item.sourceCode.substring(item.sourceCode.lastIndexOf("-")+1));
    });
    state.filterNavList=state.navList.filter((navItem)=>state.temNavData.indexOf(navItem.name)!=-1);
    sessionStorage.setItem("filterNavList",JSON.stringify(state.filterNavList));
  },
  /**
   * 获取拜访次数请求的数据
   * @param state
   * @param data
   */
  visitTimeData(state,data){
    state.visitVal.name = [];
    state.visitVal.times = [];
    data.map((item,index)=>{
      if(index < 5){
        state.visitVal.name.push(item.userName)
        state.visitVal.times.push(item.monthReportComNum);
      }
    })
  },
  /**
   * 获取用户的登录信息：
   */
  getUerInfo(state,obj){
    var userObj=Object.assign(state.loginUserInfo,obj);
    sessionStorage.setItem("loginUserInfo",JSON.stringify(userObj));
  },
  getShow(state){
    state.isDisplayList=
      state.loginUserInfo.positionId=='3'||
      state.loginUserInfo.positionId=='4'||
      state.loginUserInfo.positionId=='5'||
      state.loginUserInfo.positionId=='8'?'DistrictManager':'ChannelList';
  },
  /**
   * 业绩排行榜获取前三名数据：
   */
  getTop3Data(state,obj){
    state.resTableData[obj.tableDataName]=obj.resData;
  },
  /**
   * 获取返回数据：
   */
  getResData(state,obj){
    state.ajaxResData[obj.resDataName]=obj.resData;
  },
  /**
   * 分页信息：获取总条数
   */
  getTableData(state,obj){
    state.tableLimit=obj;
  },
  getResTableData(state,obj){
    state.resTableData[obj.tableDataName]=obj.resData;
  },
  /**
   * 我的报告根据职位显示组件
   */
  reportGetShow(state){
    var positionId = state.loginUserInfo.positionId;
    if(positionId == '0' || positionId == '1'){
      state.isMyReportList='MyReportList';
    }else if(positionId == '2' || positionId == '7'){
      state.isMyReportList='myReportUnderlingList';
    }else if(positionId == '3' || positionId == '4' || positionId == '5' || positionId == '8'){
      state.isMyReportList='myReportAreaList';
    }else if(positionId == '99'){
      state.isMyReportList='AdminReportList';
    }
  }
};

/**
 * 缓存vuex里的数据，防止刷新时数据小时的问题
 */
// for (var item in state) {
//   sessionStorage.getItem(item) ? state[item] = JSON.parse(sessionStorage.getItem(item)) : false;
// }
export default {
  state,
  mutations,
  getters
}

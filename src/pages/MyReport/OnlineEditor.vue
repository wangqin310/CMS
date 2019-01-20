<template>
  <div id="online_editor">
    <el-row class="oe_btn_wrapper">
      <el-button size="mini" @click="back">返回</el-button>
      <el-button size="mini" v-if="$store.state.mutations.EditReportModalParams.type=='editReport'" type="primary" @click="confirm">确认</el-button>
    </el-row>
    <vue-ueditor-wrap class="u_editor"  v-model="msg" :config="myConfig"></vue-ueditor-wrap>
  </div>
</template>
<script>
  import VueUeditorWrap from 'vue-ueditor-wrap';
  import ReportContent from './../../assets/js/ReportContent'
  export default {
    name: "MyReport",
    data(){
      return {
        myConfig: {
          // 如果需要上传功能,找后端小伙伴要服务器接口地址
          // serverUrl: 'http://api.demo.com/ueditor/upload',
          // 你的UEditor资源存放的路径,相对于打包后的index.html
          //UEDITOR_HOME_URL: './static/UEditor/',
          UEDITOR_HOME_URL: './theme/static/UEditor/',
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: '100%',
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 关闭自动保存
          enableAutoSave: false
        }
      }
    },
    computed:{
      msg:{
        get(){
          switch(this.$store.state.mutations.EditReportModalParams.type){
            case 'editReport':
              return ReportContent;
            case 'showDetail':
              return this.$store.state.mutations.reportFormData.reportMess;
          }
        },
        set(val){
          this.$store.state.mutations.onlineReportEditConten = val;
        }
      }
    },
    components:{VueUeditorWrap},
    methods:{
      /**
       * 返回：
       */
      back(){
        this.$store.state.mutations.onlineReportEditConten = '';
        this.$store.state.mutations.isMyReportList='MyReportList';
        this.$store.state.mutations.EditReportCom='EditReport';
      },
      /**
       * 确定：
       */
      confirm(){
        this.$store.state.mutations.isMyReportList='MyReportList';
        this.$store.state.mutations.EditReportCom='EditReport';
      },
      mounted(){
        this.$store.state.mutations.onlineReportEditConten=this.msg;
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  #online_editor{
    .w(100%);
    .h(100%);
    .p(0 50px 50px);
    .oe_btn_wrapper{
      .h(50px);
    }
    .u_editor{
      .h(calc(~"100% - 50px"));
      .edui-editor{
        .h(100%);
        .edui-editor-iframeholder{
          .h(calc(~"100% - 85px"))!important;
          .p(20px)!important;
        }
      }
      #edui1_iframeholder{
        .h(100%);
        .p-b(60px);
      }
      .edui-editor-breadcrumb{
        display:none;
      }

    }
  }
</style>


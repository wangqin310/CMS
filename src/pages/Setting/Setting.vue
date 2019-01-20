<template>
    <div id="setting">
      <div class="setting_content">
        <el-tabs :tab-position="'top'" style="height: 200px;">
          <el-tab-pane :label="item.label" v-for="(item,index) in tabPaneList" :key="index" @tabClick="tabClick">
            <iframe class="iframe_wrapper" :src="item.srcUrl"></iframe>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data() {
            return {
              tabPaneList:[
                {label:'用户管理',srcUrl:'http://172.16.22.144:9080/OSS/admin/user/UserList.jsp'},
                {label:'资源管理',srcUrl:'http://172.16.22.144:9080/OSS/admin/source/SourceTree.jsp'},
                {label:'部门管理',srcUrl:'http://172.16.22.144:9080/OSS/admin/org/org_getOrgList.jsp'},
                {label:'角色管理',srcUrl:'http://172.16.22.144:9080/OSS/admin/role/RoleList.jsp'},
                {label:'角色组管理',srcUrl:'http://172.16.22.144:9080/OSS/admin/rolegroup/RoleGroupList.jsp'},
                {label:'用户密码重置管理',srcUrl:'http://172.16.22.144:9080/OSS/admin/user/UserPassReset.jsp'},
                {label:'渠道基本信息维护',srcUrl:+'http://172.16.22.144:9080/OSS/cmm/cmm_t_channel.jsp'},
                {label:'技术参数维护',srcUrl:'http://172.16.22.144:9080/OSS/admin/syspara/z99_tech_para.jsp'},
//                {label:'查询',srcUrl:'http://192.169.2.250:8081/CMM/pages/test/test.jsp'}
              ]
            }
        },
        methods:{
          tabClick(val){
            console.log(val);
          }
        }
    }
</script>

<style lang="less">
  @import "./../../assets/less/reset";
  #setting{
    .w(100%);
    .h(100%);
    .p(42px);
    .setting_content{
      .w(100%);
      .h(100%);
      .el-tabs{
        .h(100%)!important;
        .el-tabs__content{
          .h(calc(~"100% - 55px"));
          .el-tab-pane{
            .w(100%);
            .h(100%);
            .iframe_wrapper{
              .w(100%);
              .h(100%);
              border:none;
            }
          }
        }
        .el-tabs__item{
          color:@white;
          &.is-active{
            color:@border;
          }
        }
        .el-tabs__active-bar{
          .b(@orange);
        }
        .el-tabs__nav-wrap::after{
          .b(@border);
        }
      }
    }
  }
  .x-border-box{
    .w(600px);
    .h(400px);
  }
</style>

<template>
    <div id="Robot" >
        <transition enter-active-class="animated slideInRight">
            <img class="robot_img" src="../assets/images/robot.png" v-show="robot_img" 
            @click="dialogFormVisible = true" title="咨询在线客服">
        </transition>
        <!-- 点击机器人弹出对话框 -->
        <el-dialog title="小智" :visible.sync="dialogFormVisible" top='10vh' ref="xwBody" :close-on-click-modal='modal' :fullscreen='screen' :show-close='showClose'>
          <i class="iconfont icon-zuidahua1" @click="changeScreen"></i>
          <i class="iconfont icon-cuohao-copy" @click="closeScreen"></i>
            <!-- 聊天部分 -->
            <ul>
              <li v-for="(item,index) in records" :key="index">
                <!-- 机器人说话 -->
                <div v-if="item.type==1">
                  <div class="talkTime">{{item.time}}</div>
                  <div class="xiaozhiTalk">
                    <img class="xiaozhi" src="./../assets/images/xiaozhi.png" alt="">
                    <div class="talk">
                      <span>小智：</span>    
                        <div class="src">
                            <div class="cont">
                                <div class="src_cont" v-html="replaceFace(item.cont)"></div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                
                <!-- 客户说话 -->
                <div v-else>
                  <div class="talkTime">{{item.time}}</div>
                  <div class="meTalk">
                    <img class="me" src="./../assets/images/me.png" alt="">
                    <div class="talk">
                      <span>我：</span>
                        <div class="src" v-html="replaceFace(item.cont)"></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          <!-- 输入部分 -->
          <div slot="footer" class="dialog-footer">
            <textarea id="" class="footer-input" placeholder="请输入您要咨询的问题" v-model="cont" @keyup.enter='sendMsg'>
            </textarea>           
            <div class="footer_text">
              <span class="from">Powered By 奇智机器人</span>
              <!-- <el-button type="primary" round>人工客服</el-button> -->
              <el-button round @click="sendMsg">发起消息</el-button>
              <el-popover
                placement="top"
                width="200"
                trigger="click">
                <ul>
                    <li v-for="(item,index) in EXPS" :key="index" class="faceEmoji">
                        <img :src="item.file" :data="item.code" v-on:click="cont+=item.code">
                    </li>
                </ul>
                <i class="iconfont icon-xiaolian" slot="reference"></i>
              </el-popover>
            </div>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "robot",
      data(){
          return{
            dialogFormVisible: false,
            modal:false,
            robot_img:false,
            screen:false,
            showClose:false,
            cont:'',
            EXPS: [],
            records:[
              {
                type:2,
                time:new Date().toLocaleTimeString(),
                cont:`小智，给我一个表格`
              },
               {
                type:1,
                time:new Date().toLocaleTimeString(),
                cont:`<p>
                    截至2018年12月28日
                      </p>
                      <p>
                          <br/>
                      </p>
                      <p>
                          <br/>
                      </p>
                      <table width="606" height="532">
                          <colgroup>
                              <col width="587"/>
                              <col width="442"/>
                              <col width="587"/>
                          </colgroup>
                          <tbody>
                              <tr height="19" class="firstRow">
                                  <td class="et2" x:str="" height="7" width="220" style="font-size: 11pt; font-weight: 700; text-align: center; vertical-align: bottom;">
                                      区域中心
                                  </td>
                                  <td class="et2" x:str="" height="7" width="165" style="font-size: 11pt; font-weight: 700; text-align: center; vertical-align: bottom;">
                                      渠道经理人数
                                  </td>
                                  <td class="et2" x:str="" height="7" width="220" style="font-size: 11pt; font-weight: 700; text-align: center; vertical-align: bottom;">
                                      渠道经理签到数
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      重庆区域中心
                                  </td>
                                  <td class="et3" x:num="6" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      6
                                  </td>
                                  <td class="et3" x:num="25" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      25
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      辽宁区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="5" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      5
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      四川区域中心
                                  </td>
                                  <td class="et3" x:num="5" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      5
                                  </td>
                                  <td class="et3" x:num="38" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      38
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      河南区域中心
                                  </td>
                                  <td class="et3" x:num="3" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      3
                                  </td>
                                  <td class="et3" x:num="19" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      19
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      云南区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="8" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      8
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      福建区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="8" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      8
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      江西区域中心
                                  </td>
                                  <td class="et3" x:num="6" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      6
                                  </td>
                                  <td class="et3" x:num="22" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      22
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      苏州区域中心
                                  </td>
                                  <td class="et3" x:num="3" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      3
                                  </td>
                                  <td class="et3" x:num="15" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      15
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      湖北区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="14" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      14
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      广西区域中心
                                  </td>
                                  <td class="et3" x:num="1" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      1
                                  </td>
                                  <td class="et3" x:num="4" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      4
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      天津区域中心
                                  </td>
                                  <td class="et3" x:num="1" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      1
                                  </td>
                                  <td class="et3" x:num="12" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      12
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      内蒙古区域中心
                                  </td>
                                  <td class="et3" x:num="5" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      5
                                  </td>
                                  <td class="et3" x:num="18" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      18
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      江苏区域中心
                                  </td>
                                  <td class="et3" x:num="7" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      7
                                  </td>
                                  <td class="et3" x:num="31" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      31
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      山东区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="9" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      9
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      湖南区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="8" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      8
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      深圳区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="8" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      8
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      河北区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="8" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      8
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      山西区域中心
                                  </td>
                                  <td class="et3" x:num="1" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      1
                                  </td>
                                  <td class="et3" x:num="6" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      6
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      贵州区域中心
                                  </td>
                                  <td class="et3" x:num="3" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      3
                                  </td>
                                  <td class="et3" x:num="16" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      16
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      上海区域中心
                                  </td>
                                  <td class="et3" x:num="3" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      3
                                  </td>
                                  <td class="et3" x:num="15" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      15
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      吉林区域中心
                                  </td>
                                  <td class="et3" x:num="1" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      1
                                  </td>
                                  <td class="et3" x:num="9" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      9
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      广东区域中心
                                  </td>
                                  <td class="et3" x:num="5" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      5
                                  </td>
                                  <td class="et3" x:num="26" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      26
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      海南区域中心
                                  </td>
                                  <td class="et3" x:num="1" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      1
                                  </td>
                                  <td class="et3" x:num="12" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      12
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      北京区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="7" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      7
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      安徽区域中心
                                  </td>
                                  <td class="et3" x:num="3" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      3
                                  </td>
                                  <td class="et3" x:num="13" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      13
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      陕西区域中心
                                  </td>
                                  <td class="et3" x:num="4" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      4
                                  </td>
                                  <td class="et3" x:num="16" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      16
                                  </td>
                              </tr>
                              <tr height="19">
                                  <td class="et3" x:str="" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      浙江区域中心
                                  </td>
                                  <td class="et3" x:num="2" height="7" width="165" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      2
                                  </td>
                                  <td class="et3" x:num="14" height="7" width="220" style="font-size: 9pt; text-align: center; vertical-align: middle; white-space: normal; border-width: 0.5pt; border-color: rgb(0, 0, 0);">
                                      14
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <p>
                          <br/>
                      </p>`
              },
               {
                type:2,
                time:new Date().toLocaleTimeString(),
                cont:`小智，中银的美女是谁？`
              },
              {
                type:1,
                time:new Date().toLocaleTimeString(),
                cont:`你是不是傻啊，还用问吗，彭莉洁，<img src="http://img.baidu.com/hi/jx2/j_0045.gif" alt="">`
              },
            ]
        }
      },
      methods:{
          transfor_cont(cont){
              if(cont.toString().indexOf('/:')>-1){
                  var exp=this.EXPS;
                  for (var i = 0; i < exp.length; i++) {
                  cont=cont.replace(exp[i].code, exp[i].title);
                }
                return cont;
              }else{
                  return cont;
              }
          },
        showRobot(){
          setTimeout(()=>{
            this.robot_img=true;
          },500)
        },
        changeScreen(){
            this.screen=!this.screen;
        },
        closeScreen(){
            this.dialogFormVisible=false;
            this.screen=false;
        },
        replaceFace(con) {
            if (!con) {
            return;
            }
            if (con.toString().indexOf('/:') > -1) {
            var exps = this.EXPS;
            for (var i = 0; i < exps.length; i++) {
                con = con.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
            }
            }
            return con;
        },
        sendMsg(){
          var cont=this.cont.trim();
          if(cont!=''){
            this.records.push({
            type:2,
            time:new Date().toLocaleTimeString(),
            cont:cont,
          });
        // 获取机器回复内容
            this.$axios('/proxy/cloud/robot/5aebd3e50e000027424ac35f/answer',{
            params: {
                question: this.transfor_cont(this.cont),
                channel:'app/web/weixin',
                userId:0,
                sessionId:0
              }
        })
        .then(res=>{
            setTimeout(()=>{
                this.records.push({
                type:1,
                time:new Date().toLocaleTimeString(),
                cont:res.data.answers[0].answer,
            })
            this.scrollToBottom();
            },800)
            console.log(res);
        })
          this.cont='';
          }
        },
        //滚动到底
        scrollToBottom(){
          this.$nextTick(() => {
            var container =this.$refs.xwBody.$refs.dialog.childNodes[1];
              container.scrollTop = container.scrollHeight;
          })},
        onFocusText(){
          this.scrollToBottom();
        },
        getEmojiData(){
            this.$axios.get("../static/emojiDB.json").then(res => {
                var json = eval('('+res.data+')');
                this.EXPS=json.EXPS.slice(0);
                console.log(this.EXPS);
        });

        },
      },
      updated(){
        this.scrollToBottom();
      },
      mounted (){
        this.scrollToBottom();
        this.getEmojiData();
      },
      created(){
        this.showRobot();
      },
    }
</script>

<style lang="less">
  @import "../assets/less/common";
#Robot{
  .robot_img{
    width: 10%;
    position: fixed;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
  .el-dialog{
    // height: 560px;
      position: relative;
    .el-dialog__header{
      height: 60px;
      z-index: 1;
    }
    .el-dialog__body{
      height: 45vh;
      // min-height: 400px;
      overflow: auto;
      i{
        z-index: 3;
        position: absolute;
        font-size: 16px;
        color: #909399;
        cursor: pointer;
      }
      .icon-zuidahua1{
        top: 20px;
        right: 40px;
      }
      .icon-cuohao-copy{
        top: 20px;
        right: 16px;
      }
      i:hover{
        color: #409EFF;
      }
      // 聊天
      .talkTime{
        margin: 0 auto;
        text-align: center;
        width: 132px;
        color: #8a9699;
        padding: 0 15px;
        border-radius: 10px;
        line-height: 24px;
        font-size: 12px;
        background: #2a2d41;
      }
      img{
        //   width: 40px;
        //   margin-right: 10px;
          }
      .xiaozhiTalk{
        overflow: hidden;
        margin-bottom: 40px;
        img.xiaozhi{
            width: 40px;
            float: left;
        }
        .talk{
          color: #fff;
          span{
            display: block;
          }
          .src{
            max-width: 65%; 
            position: relative;
            top: -14px;
            left: 50px;
            .cont{
                width: 100%;
                height: 100%;
                overflow: auto;
                .src_cont{
                    color:#000;
                    // width: 100%;
                height: 100%;
                    overflow: auto;
                    padding: 10px 20px 10px 10px;
                    border-radius: 5px;
                    font: 14px/20px '微软雅黑';
                    background: #ebf8fc;
                    margin-left: 23px;
                    // position: relative;
                    float: left;
                }
            }
                        
          }
          .src::before{
                content: "";
                display: inline-block;
                width: 0;
                height: 0;
                border-right:30px solid #ebf8fc;
                border-top:3px solid transparent ;
                border-left:30px solid transparent ;
                border-bottom:10px solid transparent ;
                position: absolute;
                left: -37px;
                top: 30px;
            }
        }
      }
      .meTalk{
          overflow: hidden;
          margin-bottom: 10px;
          img.me{
            width: 40px;            
            float: right;
        }
        .talk{
          color: #fff;
          span{
            display: block;
            text-align: right;
          }
          .src{
            color:#000;
            max-width: 65%;
            word-wrap: break-word;
            padding: 10px 20px 10px 10px;
            border-radius: 5px;
            font: 14px/20px '微软雅黑';
            background: #2d8ef2;
            margin-right: 40px;
            float: right;
            position: relative;
            color: #fff;
            // img{
            //   width: 100%;
            //   height: 100%;
            // }
          }
          .src::before{
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-left:30px solid #2d8ef2;
            border-top:3px solid transparent ;
            border-right:30px solid transparent ;
            border-bottom:10px solid transparent ;
            position: absolute;
            right: -58px;
          }
        }
      }
    }
    .el-dialog__footer{
      border-top:1px solid #2a2d41; 
        .dialog-footer{
              .footer-input{
                height: 105px;
                resize: none;
                color: #fff;
                font: 14px/16px '微软雅黑';
                background: transparent;
                border: none;
                outline: none;
                overflow: auto;
                width: 100%;
                min-height: 20vh;
              }
              .footer_text{
                width: 98%;
                height: 20px;
                position: absolute;
                right: 1px;
                bottom: 8px;
                text-align: left;
                color: #fff;
                .icon-xiaolian{
                  float: right;
                  font-size: 22px;
                  cursor: pointer;
                }
                
                .icon-xiaolian:hover{
                  color:#2d8ef2 ;
                }
                button{
                  float: right;
                  padding: 2px 5px;
                  margin:0 10px;
                  font: 12px/15px '微软雅黑';
                }
              }
      }
      
    }
  }
  
}
.faceEmoji{
    display: inline-block;
    }
</style>

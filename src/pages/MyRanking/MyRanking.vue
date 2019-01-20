<template>
    <div id="myRanking">
        <div class="top">
            <div class="left">
                <span class="job1" @click="toBack">返回</span>
                <span class="name">{{userRankInfo.userName}}</span>
                <span class="job">渠道经理</span>
            </div>
            <span class="description ">在职时间{{userRankInfo.time}}，上一年总评级为{{userRankInfo.lastYearGrade}}</span>
            <div class="right">
                区域： <span class="place">{{userRankInfo.orgName}}</span>
            </div>
        </div>
        <el-row :gutter="10" type="flex" class="content">
            <el-col  :lg="12" :xl="24">
                <div class="contLeft">
                    <div class="leftContainer">
                        <img class="centerCircle" :src="people2Url" alt="">
                        <img class="outsideCircle channelCircle" :src="channelUrl" alt="">
                        <img class="outsideCircle footCircle" :src="footUrl" alt="">
                        <img class="outsideCircle monthCircle" :src="monthUrl" alt="">
                        <img class="outsideCircle taskCircle" :src="taskUrl" alt="">
                        <img class="outsideCircle weekCircle" :src="weekUrl" alt="">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                        <span class="line line4"></span>
                        <span class="line line5"></span>
                        <div class="channelText text"> <span>渠道覆盖率</span>{{userRankInfo.channelRate}}%</div>
                        <div class="footText text"><span>走访次数</span>{{userRankInfo.visitNum}}次</div>
                        <div class="monthText text"><span>报告完成率</span> {{userRankInfo.reportRate}}%</div>
                        <div class="taskText text"><span>上级布置任务完成率</span> {{userRankInfo.taskRate}}%</div>
                        <div class="weekText text"><span>日常任务完成率</span>{{userRankInfo.dailyTaskRate}}%</div>
                    </div>
                </div>
            </el-col>
            <el-col  :lg="12" :xl="24">
                <div class="contRight">
                    <div class="contRightTop">
                        <div class="title">
                            <img class="point" :src="pointUrl" alt="">
                            <span class="visitTime">走访次数</span>
                        </div>
                        <div class="cont">
                            <ul>
                                <li>走访次数 <br> <span>{{userRankInfo.visitNum}}</span></li>
                                <li>击败区域内 <br> <span>{{userRankInfo.visitArea}}%</span></li>
                                <li>比上次提高 <br> <span>{{userRankInfo.visitLast}}%</span></li>
                            </ul>
                            <div class="description">
                                区域内走访次数{{userRankInfo.visitNum}}，击败区域内{{userRankInfo.visitArea}}%的人，比上次提高{{userRankInfo.visitLast}}%
                            </div>
                        </div>

                    </div>
                    <div class="contRightTBottom">
                        <div class="title">总结</div>
                        <ul>
                            <li><span>总名次</span> <br/> {{userRankInfo.fraction}}</li>
                            <li><span>击败区域内</span> <br/> {{userRankInfo.fractionArea}}%</li>
                            <li><span>比上次提高</span> <br/> {{userRankInfo.fractionLast}}%</li>
                        </ul>
                        <div class="cont">
                            <div class="person">
                                <span class="name">{{userRankInfo.userName}}</span>
                                <span class="position">{{userRankInfo.orgName}}渠道经理</span>
                            </div>
                            <div class="conText">
                              本年度完成走访次数{{userRankInfo.visitNum}}次，相比上一年增长{{userRankInfo.visitLast}}%；
                              提交了周报{{userRankInfo.weekReportNum}}次，提交了月报{{userRankInfo.monthReprotNum}}次，
                              报告完成率{{userRankInfo.reportRate}}%；完成上级发布的任务{{userRankInfo.taskNum}}次，
                              完成率{{userRankInfo.taskRate}}%；经常拜访{{userRankInfo.channelName}}渠道。
                            </div>
                            <img v-if="userRankInfo.ThisYearGrade=='A'" :src="ScoreUrlA" class="score" alt="">
                            <img v-if="userRankInfo.ThisYearGrade=='B'" :src="ScoreUrlB" class="score" alt="">
                            <img v-if="userRankInfo.ThisYearGrade=='C'" :src="ScoreUrlC" class="score" alt="">
                            <img v-if="userRankInfo.ThisYearGrade=='D'" :src="ScoreUrlD" class="score" alt="">
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'myRanking',
        data() {
            return {
                people1Url:require('@/assets/images/myReport_photo1.png'),
                people2Url:require('@/assets/images/myReport_photo2.png'),
                channelUrl:require('@/assets/images/myRanking_channel.png'),
                footUrl:require('@/assets/images/myRanking_foot.png'),
                monthUrl:require('@/assets/images/myRanking_month.png'),
                taskUrl:require('@/assets/images/myRanking_task.png'),
                weekUrl:require('@/assets/images/myRanking_week.png'),
                pointUrl:require('@/assets/images/myRanking_point.png'),
                ScoreUrlA:require('@/assets/images/myRanking_iconA.png'),
                ScoreUrlB:require('@/assets/images/myRanking_iconB.png'),
                ScoreUrlC:require('@/assets/images/myRanking_iconC.png'),
                ScoreUrlD:require('@/assets/images/myRanking_iconD.png'),
                defaultHeadPic: require("@/assets/images/defaultHeadPic.jpg"),
                userRankInfo: {},
            }
        },
        methods:{
          toBack(){
            this.$store.state.mutations.channelListIsActive = 'ChannelManagers';
          },
          getMyRankInfo(){
            this.$axios.get("/api/CMM/rankList_getMyRank",
              {
                params:{empId:this.$store.state.mutations.myChannelEmpId}
              }
            )
              .then(res =>{
                this.userRankInfo = res.data.data;
              })
              .catch(error=>{
                  console.log(error);
                }
              );
          }
        },
        mounted(){
          this.getMyRankInfo();
        }
    }
</script>

<style lang="less">
  @import "../../assets/less/reset";
#myRanking{
    width: 100%;
    height: 100%;
    // padding-left: 40px;
    // padding-top: 20px;
    // padding-right: 48px;
    min-width: 840px;
    .top{
        width: 100%;
        height: 100px;
        border: 1px solid #7ba3ff;
        border-radius: 6px;
        box-shadow: 0 0 10px #7bb0ff;
        background: #43475b;
        padding-left:2%;
        padding-right:3%;

        .left{
            float: left;
            padding-top: 0;
            .name{
                font: 22px/98px '微软雅黑';
            }
            .job{
                font: 16px/98px '微软雅黑';
            }
            .job1{
              cursor: pointer;
              font: 14px/98px '微软雅黑';
              text-decoration:underline;
            }
        }
        .description{
            padding-left: 40px;
            font: 16px/100px '微软雅黑';
        }
        .right{
            float: right;
            font: 20px/100px '微软雅黑';
        }
    }
    .content{
        width: 100%;
        height: 100%;
        .contLeft{
            .h(calc(~"100% - 100px"));
            // background: rebeccapurple;
            // padding-left: 15%;
            // padding-top: 15%;
            @media screen and (min-width:1400px)and(max-width: 1600px){
                padding-left: 3%;
                padding-top:3%;
            }
            @media screen and (min-width:1400px)and(max-width:1679px){
                padding-left: 0;
                padding-top: 0;
            }
            @media screen and (min-width:1679px){
                padding-left: 2%;
                padding-top: 2%;
            }
            .leftContainer{
                text-align: center;
                position: relative;
                width: 514px;
                height: 460px;
                // background: orange;
                @media screen and (min-width:1679px){
                    width:660px ;
                    height:628px ;
                 }
                .centerCircle{
                    width: 126px;
                    position: absolute;
                    .m-t(calc(~"50% - 57px"));
                    left:200px;
                    z-index: 2;
                @media screen and (min-width:1679px){
                    width: 169px;
                    left:240px;                    
                 }
                }
                .outsideCircle{
                    width: 138px;
                    position: absolute;
                    z-index: 1;
                @media screen and (min-width:1679px){
                    width: 146px;
                 }
                }
                .footCircle{
                    top: 13px;
                    left: 200px;
                 @media screen and (min-width:1679px){
                    top: 32px;
                    left: 243px;
                 }   
                }
                .weekCircle{
                    top: 150px;
                    left: 20px; 
                }
                .monthCircle{
                    top: 150px;
                    right: 20px;
                }
                .channelCircle{
                    left: 60px;
                    bottom: 12px;
                }
                .taskCircle{
                    bottom: 14px;
                    right: 60px;
                }
                .line{
                    position: absolute;
                    border: 1px solid #7ba3ff;
                    box-shadow: 0 0 10px #7bb0ff;
                    z-index: 0;
                }
                .line1{
                    width: 100px;
                    height: 0px;
                    transform:rotate(90deg);
                    top: 150px;
                    left: 219px;
                @media screen and (min-width:1679px){
                    width: 141px;
                    top: 232px;
                    left: 243px
                 }  
                        
                }
                .line2{
                    width: 100px;
                    height: 0px;
                    transform:rotate(15deg);
                    top: 225px;
                    left: 108px;
                  @media screen and (min-width:1679px){
                        width: 146px;
                        transform: rotate(33deg);
                        top: 288px;
                        left: 119px;
                 }   
                }
                .line3{
                    width: 100px;
                    height: 0px;
                    transform:rotate(-15deg);
                    top: 225px;
                    right: 108px;
                @media screen and (min-width:1679px){
                        width: 181px;
                        transform: rotate(-29deg);
                        top: 278px;
                        right: 115px;
                 } 
                }
                .line4{
                    width: 160px;
                    height: 0px;
                    transform:rotate(135deg);
                    bottom: 140px;
                    left: 120px;
                    @media screen and (min-width:1679px){
                        width: 181px;
                        transform: rotate(-46deg);
                        bottom: 174px;
                        left: 118px;
                 } 
                }
                .line5{
                    width: 160px;
                    height: 0px;
                    transform:rotate(-135deg);
                    bottom: 140px;
                    right: 120px;
                    @media screen and (min-width:1679px){
                        width: 181px;
                        transform: rotate(46deg);
                        bottom: 174px;
                        right: 141px;
                 } 
                }
                .text{
                    position: absolute;
                    z-index: 1;
                    width: 120px;
                    margin: 0;
                    padding-top: 0;
                    text-align: center;
                    span{
                        text-align: center;
                        width: 136px;
                        float: left;
                    }
                }
                .channelText{
                    bottom: -33px;
                    left: 55px;
                    @media screen and (min-width:1679px){
                        left:84px;
                        bottom: 5px;

                 } 
                }
                .footText{
                        top: 135px;
                        left: 205px;
                        // font: 14px/16px '微软雅黑';
                    @media screen and (min-width:1679px){
                        top: 164px;
                        left: 249px;
                 }
    
                }
                .monthText{
                    top: 272px;
                    left: 20px;
                    @media screen and (min-width:1679px){
                        top: 277px;
                        right: 58px;
                 } 
                }
                .taskText{
                    bottom: -31px;
                    right: 75px;
                    @media screen and (min-width:1679px){
                        bottom: -8px;
                        right: 58px;
                 } 
                }
                .weekText{
                        top: 271px;
                        right: 29px;
                    @media screen and (min-width:1679px){
                        top: 281px;
                        right: 51px;
                 }
                        
                }
            }
            

        }
        .contRight{
            .h(calc(~"100% - 100px"));
            // background: pink;
            // padding: 8%;
            padding: 8% 0 8% 8%;
            .contRightTop{
                .title{
                        margin-bottom: 5%;
                        .visitTime{
                            font: 24px/30px '微软雅黑';
                        }
                    }
                .cont{
                    padding-left: 5%;
                    font-size: 16px;
                    ul{
                    overflow: hidden;
                    display: inline-block;
                        li{
                            text-align: center;
                            float: left;
                            span{
                                font-size: 28px;
                            }
                        }
                    }
                    .description{
                        margin-top:5%; 
                    }
                }
            }
            .contRightTBottom{
                position: relative;
                margin-top: 3%;
                border: 1px solid #7ba3ff;
                border-radius: 6px;
                box-shadow: 0 0 10px #7bb0ff;
                background: #43475b;
                padding: 3%;
                .title{
                    font: 24px/36px '微软雅黑';
                    margin-bottom: 3%;
                }
                ul{
                    overflow: hidden;
                    li{
                        text-align: center;
                        float: left;
                        font-size: 26px;
                        span{
                            font-size: 16px;                            
                        }
                    }
                    }
                .cont{
                    .conText{
                        margin-top: 3%;
                        font-size: 16px;
                    }
                    .score{
                        position: absolute;
                        right: 3px;
                        bottom: 3px;
                    }
                }
                
            }
        }
    }
}
</style>

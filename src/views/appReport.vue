<template>
    <div class="ui-page">
      <div class="ui-flex">
        <div class="ui-flex-item">
          <div class="page-header">
            <tag-tempate class="page-header-tag" :desc="`1234`" iconClass="icon-manage" rgb-color="229, 131, 8">
              <span slot="icon">
                <svg t="1712717946060" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1512" width="28" height="29"><path d="M224 423.84V231.744l192-0.096 0.096 192.096L224 423.84z m192.096-256.096H223.904A64 64 0 0 0 160 231.68v192.192a64 64 0 0 0 63.904 63.904h192.192A64 64 0 0 0 480 423.84V231.68a64 64 0 0 0-63.904-63.904zM224 807.84v-192.096l192-0.096 0.096 192.096L224 807.84z m192.096-256.096H223.904A64 64 0 0 0 160 615.68v192.192a64 64 0 0 0 63.904 63.904h192.192A64 64 0 0 0 480 807.84V615.68a64 64 0 0 0-63.904-63.904zM704.064 463.616l-135.84-135.84 135.712-135.84 135.904 135.744-135.776 135.936z m181.024-181.024l-135.904-135.904a64 64 0 0 0-90.368 0L522.912 282.56a63.456 63.456 0 0 0-18.656 45.056 63.456 63.456 0 0 0 18.656 45.312l135.904 135.936a63.904 63.904 0 0 0 90.368-0.032l135.904-135.904a63.936 63.936 0 0 0 0-90.368zM608 807.84v-192.096l192-0.096 0.096 192.096-192.096 0.096z m192.096-256.096h-192.192A64 64 0 0 0 544 615.68v192.192a64 64 0 0 0 63.904 63.904h192.192A64 64 0 0 0 864 807.84V615.68a64 64 0 0 0-63.904-63.904z" fill="#ffffff" p-id="1513"></path></svg>
              </span>
              <span>5678</span>
            </tag-tempate>
            <begun-run-num-tag ref="begunRunNumTag" class="page-header-tag" :runInfo="runInfo" />
            <actuator-tag ref="actuatorTag" class="page-header-tag" :actuatorStat="actuatorStat"  />
            <ac-date-tag v-model="date" show-refresh class="page-header-tag ac-date-tag" @change="queryPageInfo" @refresh="queryPageInfo"/>
          </div>
        </div>
        <div class="ui-flex-item">
          <div class="content-row">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import tagTempate from '../components/tagTempate.vue'
  import begunRunNumTag from '../components/begunRunNumTag'
  import actuatorTag from '../components/actuatorTag'
  import acDateTag from '../components/acDateTag'
  export default {
    components: {
      tagTempate,
      begunRunNumTag,
      actuatorTag,
      acDateTag
    },
    data(){
      return {
        /** 批量日期，timestamp */
        date: new Date().getTime(),
        /** 任务调度监控统计 */
        runInfo: {
          FailedNumCount: 0,
          RunningNumCount: 0,
          SucceedNumCount: 0,
          noneNumCount: 0,
          StoppingNumCount: 0
        },
        /** 作业耗时排行列表 */
        timeRankList: [],
        /** 关注任务列表 */
        followTaskList: [],
        /** 告警列表 */
        alarmList: [],
        /** 执行器组统计 */
        actuatorStat: {aliveNum: 0, deadNum: 0}
      }
    },
    watch: {},
    computed:{
    },
    mounted() {
    },
    methods: {
      initAcDate() {
  
      },
      queryPageInfo(){
  
      },
      queryAlarmList(){
  
      }
    }
  }
  </script>
  
  <style scoped>
  .ui-page {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    margin: 1px 0;
    padding: 8px;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .page-header /deep/ .page-header-tag {
    margin: 0 8px;
  }
  
  .page-header /deep/ .page-header-tag:first-child {
    margin-left: 0;
  }
  
  .page-header /deep/ .page-header-tag:last-child {
    margin-right: 0;
  }
  
  .page-header /deep/ .page-header-tag.ac-date-tag {
    min-width: 300px;
  }
  
  .content-row {
    box-sizing: border-box;
    padding-top: 10px;
    height: 49%;
    display: flex;
    justify-content: space-between;
  }
  
  .content-row .content-col-left {
    width: 39%;
  }
  
  .content-row .content-col-right {
    width: 59%;
    margin-left: 10px;
  }
  </style>
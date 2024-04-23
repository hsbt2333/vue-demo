<!-- 任务数标签 -->
<template>
    <tag-tempate rgb-color="115, 192, 222" desc="运行中 / 已调度任务数" icon-class="icon-menu_task">
        <span slot="icon">
          <svg t="1712717985698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" width="28" height="29"><path d="M877.714286 0H146.285714A146.285714 146.285714 0 0 0 0 146.285714V877.714286a146.285714 146.285714 0 0 0 146.285714 146.285714H877.714286a146.285714 146.285714 0 0 0 146.285714-146.285714V146.285714A146.285714 146.285714 0 0 0 877.714286 0z m73.201371 877.889829a72.967314 72.967314 0 0 1-73.142857 73.025828H146.461257c-19.543771 0-38.034286-7.489829-51.843657-21.357714a72.557714 72.557714 0 0 1-21.533257-51.668114V146.344229A73.435429 73.435429 0 0 1 146.461257 73.142857h731.311543a73.142857 73.142857 0 0 1 73.142857 73.259886v731.5456z" p-id="1692" fill="#ffffff"></path><path d="M832.190171 329.084343h-292.571428a36.512914 36.512914 0 1 0 0 73.084343h292.571428a36.512914 36.512914 0 0 0 0-73.084343zM832.190171 673.031314h-292.571428a36.512914 36.512914 0 0 0 0 73.084343h292.571428a36.512914 36.512914 0 0 0 0-73.084343zM320.073143 581.632a127.970743 127.970743 0 1 1 0 256 127.970743 127.970743 0 0 1 0-256z m10.766628 74.1376a54.8864 54.8864 0 1 0-21.416228 107.666286 54.8864 54.8864 0 0 0 21.416228-107.666286zM403.982629 266.825143L283.560229 387.364571l-47.338058-47.338057a36.571429 36.571429 0 0 0-51.668114 51.726629l73.142857 73.142857a36.512914 36.512914 0 0 0 51.668115 0l146.285714-146.285714a36.512914 36.512914 0 0 0-51.668114-51.726629z" p-id="1693" fill="#ffffff"></path></svg>
        </span>
        <span class="task-tag__running">{{runInfo.RunningNumCount}}</span>/<span class="task-tag__begun-run">{{begunRunNum}}</span>
    </tag-tempate>
</template>

<script>
import tagTempate from './tagTempate'
export default {
    components: {
        tagTempate
    },
    props: {
        /** 任务调度情况 */
        runInfo: {
            type: Object,
            default: () => ({
                FailedNumCount: 0,
                RunningNumCount: 0,
                SucceedNumCount: 0,
                noneNumCount: 0,
                StoppingNumCount: 0
            })
        }
    },
    computed: {
        begunRunNum() {
            let {FailedNumCount = 0, RunningNumCount = 0, SucceedNumCount = 0, StoppingNumCount = 0} = this.runInfo
            return FailedNumCount + RunningNumCount + SucceedNumCount + StoppingNumCount
        },
    }
}
</script>

<style scoped>
.task-tag__begun-run {
    font-size: 16px;
}
</style>
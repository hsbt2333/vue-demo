<!-- 执行器存活情况 -->
<template>
    <tag-tempate rgb-color="59, 162, 114" desc="执行器在线数 / 离线数" icon-class="icon-menu_data">
        <span slot="icon">
          <svg t="1712719940946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2043" width="28" height="29"><path d="M892.928 96.256c38.093 0 63.488 27.853 63.488 69.632v487.424c0 41.78-25.395 69.632-63.488 69.632H131.072c-38.093 0-63.488-27.853-63.488-69.632V165.888c0-41.78 25.395-69.632 63.488-69.632h761.856z m0-69.632H131.072c-69.837 0-126.976 62.67-126.976 139.264v487.424c0 76.595 57.14 139.264 126.976 139.264h761.856c69.837 0 126.976-62.669 126.976-139.264V165.888c0-76.593-57.14-139.264-126.976-139.264" p-id="2044" fill="#ffffff"></path><path d="M638.976 931.84V788.505H385.024V931.84H194.56v69.632h634.88V931.84H638.976zM308.838 373.553H410.42V635.22H308.84V373.553z m304.745-87.224h101.58v354.025h-101.58V286.33z m152.371 143.66h101.58v210.365h-101.58V429.99zM156.467 481.3h101.581v153.92h-101.58V481.298z m304.745-302.715H562.79v461.77H461.212v-461.77z" p-id="2045" fill="#ffffff"></path></svg>
        </span>
        <span class="actuator-tag__alive">{{actuatorStat.aliveNum}}</span>/<span class="actuator-tag__dead">{{actuatorStat.deadNum}}</span>
    </tag-tempate>
</template>

<script>
import tagTempate from './tagTempate'
export default {
    components: {
        tagTempate
    },
    props: {
        actuatorStat: {
            type: Object,
            default: () => ({aliveNum: 0, deadNum: 0})
        }
    },
}
</script>

<style scoped>
.actuator-tag__alive {
    color: #3ba272;
}
.actuator-tag__dead {
    color: #d33b30;
    font-size: 16px;
}
</style>
<!-- 批量日期时间 -->
<template>
    <div class="ac-date-tag-container">
        <tag-tempate rgb-color="245, 108, 108" desc="批量日期" icon-class="icon-activity">
            <span slot="icon">
              <svg t="1712717384447" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1301" width="28" height="29"><path d="M800 845.088c0 1.76-0.736 2.784-0.096 2.88l-574.656 0.416C224.992 848.192 224 847.04 224 845.088v-477.12h576v477.12zM224 210.88c0-1.728 0.64-2.752 0.096-2.912H352V224a32 32 0 1 0 64 0v-16h192V224a32 32 0 1 0 64 0v-16h127.008a4.736 4.736 0 0 1 0.992 2.88V304H224V210.88zM799.84 144H672V128a32 32 0 0 0-64 0v16h-192V128a32 32 0 0 0-64 0v16H223.712C188.576 144 160 174.016 160 210.88V845.12c0 36.896 28.608 66.88 63.744 66.88h576.512c35.136 0 63.744-29.984 63.744-66.88V210.88c0-36.896-28.768-66.912-64.16-66.912z" fill="#ffffff" p-id="1302"></path><path d="M384 560h256a32 32 0 0 0 0-64h-256a32 32 0 0 0 0 64M384 720h256a32 32 0 0 0 0-64h-256a32 32 0 0 0 0 64" fill="#ffffff" p-id="1303"></path></svg>
            </span>
            <span :class="{'pointer-cursor': !disabled}" title="选择批量日期" @click="onDatePickerClick">{{dateFormat}}</span>
            <span style="float: right">
              <i v-if="!disabled" class="el-icon-edit-outline pointer-cursor" style="font-size: 20px;" title="选择批量日期" @click="onDatePickerClick" />
              <i v-if="showRefresh" class="el-icon-refresh-right pointer-cursor" style="font-size: 20px;" title="刷新" @click="$emit('refresh')" />
            </span>
        </tag-tempate>
        <el-date-picker ref="datePicker" :value="value" :disabled="disabled" type="date" value-format="timestamp" :clearable="false" class="ac-date-picker" />
    </div>
</template>

<script>
import tagTempate from './tagTempate.vue'
export default {
    components: {
        tagTempate
    },
    props: {
        value: Number,
        disabled: {
            type: Boolean,
            default: false
        },
        showRefresh: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        dateFormat() {
          let str = '';
          if(this.value){
            let date = new Date(this.value)
            str = String(date.getFullYear()).padStart(4, "0") + '-' +
              String(date.getMonth() + 1).padStart(2, "0") + '-' +
              String(date.getDate()).padStart(2, "0")
          }
          return str
        }
    },
    methods: {
        onDatePickerClick() {
            this.$refs.datePicker.focus()
        }
    }
}
</script>

<style scoped>
.ac-date-tag-container {
    position: relative;
}

.ac-date-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
}

.pointer-cursor {
    cursor: pointer;
}
</style>
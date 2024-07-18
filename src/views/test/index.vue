<template>
    <div>
        <!-- <my-align />
        <my-array /> -->
        <my-tabs />
    </div>
</template>
<script>
import myAlign from './align/myAlign';
import myArray from './watch/myArray';
import myTabs from './tabs';
export default {
    components:{
        myAlign,
        myArray,
        myTabs
    }
}
</script>

<style scoped>

</style>
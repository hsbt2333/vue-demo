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
    },
    mounted(){
        this.$axios({
            method: 'post',
            url: '/login',
            data: {}
        }).then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
    },
    methods:{}
}
</script>

<style scoped>

</style>
<template>
    <div>
        <ul>
            <li v-for="(item,index) in myArr" :key="index">{{ item }} <el-button @click="setMyArr(index,count++)" >setMyArr</el-button></li>
        </ul>
        <el-button @click="pushMyArr" >pushMyArr</el-button>
        <el-button @click="popMyArr" >popMyArr</el-button>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      myArr: [],
    };
  },
  watch: {
    myArr: {
        handler(val){
            console.log('watch myArr val',val)
        },
        deep: true
    },
    "myArr.0":{
        handler(val){
            console.log('watch myArr.0 val',val)
        },
        deep: true
    }
  },
  methods: {
    pushMyArr() {
      this.myArr.push('654321');
    },
    popMyArr() {
      this.myArr.pop();
    },
    setMyArr(index, value) {
        console.log(this.myArr[index])
        console.log(value)
        //this.myArr[index] = value
        this.myArr.splice(index,1,value);
    },
  },
};
</script>
<style scoped>
</style>
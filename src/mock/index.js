import Mock from 'mockjs'

const data = Mock.mock("/login",(req,res)=>{
  return {
    username: 'admin',
    nickname: '管理员'
  }
})

export default {data}
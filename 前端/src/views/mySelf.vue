<template>
  <div class="mySelf my-container">
    <myHeader></myHeader>

    <div class="main col-xs-16 col-xs-offset-8">
      <table>
        <thead>
        <tr>
          <th class="setting-head"></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="top-line">
            <div class="avatar">
              <img src="../../static/default-avatar.jpg">
            </div>
          </td>
          <td class="top-line">
            <a href="javascript:void(0)" class="btn btn-hollow">
              <input type="file" class="hide">
              更改头像
            </a>
          </td>
        </tr>
        <tr>
          <td class="setting-title">昵称</td>
          <td>
            <input type="text" placeholder="请输入昵称" name="nick-name">
          </td>
        </tr>
        <tr>
          <td class="setting-title">真实姓名</td>
          <td>
            <input type="text" placeholder="请输入真实姓名" name="nick-name">
          </td>
        </tr>
        <tr>
          <td class="setting-title setting-editor">性别</td>
          <td>
            <div class="col-xs-8">
              <input type="radio" value="plain" name="sex" checked>
              <span>男</span>
            </div>
            <div class="col-xs-16">
              <input type="radio" value="markdown" name="sex">
              <span>女</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="setting-title setting-editor">手机号</td>
          <td>
            <input type="text" placeholder="请输入手机号" name="nick-name">
          </td>
        </tr>
        </tbody>
      </table>
      <input type="submit" class="btn btn-success setting-save" value="保存">
    </div>
  </div>
</template>
<script>
  import myHeader from '../components/myHeader.vue'
  export default{
      name:'mySelf',
    data(){
          return{
            isBind:false,
          }
    },
    components:{
        myHeader
    }
  }
</script>
<style scoped>
  .main{
    padding-top: 100px;
    /*margin: 100px auto;*/
  }
  .avatar{
    width: 32px;
    height: 32px;
    display: block;
    cursor: pointer;
  }
  .col-xs-8{
    width: 25%;
    float: left;
  }
  .col-xs-16{
    width: 75%;
    float: left;
  }
  .col-xs-offset-8{
    margin-left: 12.5%;
  }
  table{
    width: 100%;
  }
  th{
    text-align: left;
  }
  .setting-head{
    width: 150px;
  }
  .top-line{
    padding-top: 0;
  }
  td{
    padding: 20px 0;
  }
  .avatar{
    width: 100px;
    height: 100px;
  }
   .avatar img{
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
   .btn-hollow{
    padding: 3px 12px;
    font-size: 14px;
    box-shadow: none;
    border: none;
  }
   .hide{
    position: absolute;
    display: block;
    width: 82px;
    opacity: 0;
  }
  .setting-title{
    font-size: 15px;
    color: #969696;
  }
  input[type=text]{
    width: 80%;
    padding: 5px 10px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
  }
  .setted div{
    font-size: 15px;
    display: inline-block;
  }
  .setted i{
    margin-left: 10px;
    font-size: 12px;
    color: #969696;
    vertical-align: middle;
  }
  .setted a{
    margin-left: 11px!important;
  }
  .setted a , .main .setted span{
    margin-left: 3px;
    font-size: 14px;
    color: #969696!important;
  }
  span{
    margin: 0 20px 0 6px;
    font-size: 15px;
    vertical-align: middle;
  }
   p{
    margin: 0;
    padding: 8px 0 0;
    font-size: 12px;
    color: #969696;
    clear: both;
  }
  .setting-save{
    width: 100px;
    margin: 30px 0 60px;
    border-radius: 20px;
    border: none;
    box-shadow: none;
  }
</style>

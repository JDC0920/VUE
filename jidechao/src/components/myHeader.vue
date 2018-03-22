<template>
    <div>
        <nav class="navbar navbar-default nav-fixed-top">
            <div class="width-limit">
                <!--logo-->
                <router-link to="/" class="navlogo">
                    <h1>纪德朝</h1>
                </router-link>
                <!--登录注册按钮-->
                <router-link to="/sign-up" :class="nickName.length>0? 'show' :'' " class="btn sign-up">注册</router-link>
                <router-link to="/sign-in" :class="nickName.length>0? 'show' :'' " class="btn sign-in">登录</router-link>
                <!--&lt;!&ndash;如果用户登录，那么显示用户头像&ndash;&gt;-->
                <a href="javascript:void(0)" :class="nickName.length>0?'':'show'">
                    <span style="color: red;font-size: 20px;">{{nickName}}</span>&#x3000;欢迎你
                </a>
                <div class="user" :class="nickName.length>0?'':'show'" @mouseover="userShow=true" @mouseleave="userShow=false">
                    <div class="drop-down">
                        <a href="javascript:void(0)" class="avatar">
                            <img src="../assets/img/default-avatar.jpg" />
                        </a>
                    </div>
                    <div v-show="userShow" class="drop-menu">
                        <ul>
                            <li>
                                <router-link to="/mySelf">
                                    <i class="fa fa-user"></i>
                                    我的个人资料
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/car">
                                    <i class="fa fa-bookmark"></i>
                                    我的购物车
                                </router-link>
                            </li>
                            <li>
                                <a href="javascript:void(0)" @click="logout()">
                                    <i class="fa fa-sign-out"></i>
                                    退出
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--导航-->

                <div class="my-container">
                    <ul class="nav-list">
                        <li class="search">
                            <form method="post">
                                <input type="text" placeholder="搜索" @focus="bgShow=true" @blur="bgShow=false">
                                <a href="javascript:void(0)" class="search-btn" :class="{active:bgShow}">
                                    <i class="fa fa-search"></i>
                                </a>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<style scoped>
    nav {
        width: 100%;
        height: 56px;
    }
    .navbar{
        padding: 0;
        border-bottom: 1px solid #e7e7e7;
        margin-bottom: 20px;
        background-color: #fff;
    }
    .nav-fixed-top{
        position: fixed;
        top:0;
        left: 0;
        z-index: 9999;
    }
    nav .width-limit{
        min-width: 768px;
        width: 1440px;
        margin: 0 auto;
    }
    nav .navlogo{
        float: left;
        height: 56px;
        padding: 0;
    }
    nav .navlogo img{
        height: 100%;
    }
    nav a.write-btn{
        float: right;
        width: 100px;
        height: 40px;
        margin: 8px 15px 0;
        line-height: 24px;
        font-size: 15px;
        background-color: #ea6f5a;
        color: #fff!important;
        border-radius: 20px;
    }
    nav a.sign-in{
        float: right;
        margin: 11px 6px 0 10px;
        line-height: 24px;
        font-size: 15px;
        padding: 6px 12px;
        color: #969696!important;
    }
    nav a.sign-up{
        float: right;
        width: 80px;
        height: 38px;
        margin: 10px 6px 0 10px;
        line-height: 24px;
        font-size: 15px;
        border: 1px solid #ea6f5a;
        border-radius: 20px;
        color: #ea6f5a!important;
    }
    nav a.sign-in:focus{
        box-shadow: none;
    }
    nav a.sign-up:hover{
        background-color: rgb(254,247,246);
    }
    nav .user{
        position: relative;
        float: right;
        z-index: 10000;
    }
    nav .user .avatar{
        position: relative;
        width: 40px;
        height: 40px;
        display: block;
        margin: 8px 28px 8px 20px;
    }
    nav .user:hover{
        background-color: #f5f5f5;
    }
    nav .user .avatar:before{
        content: "";
        position: absolute;
        top: 18px;
        right: -14px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #999;
    }
    nav .user .avatar img{
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 50%;
    }
    nav .user .drop-menu{
        position: absolute;
        left: 0;
        min-width: 160px;
        font-size: 15px;
        box-shadow: 0 0 5px rgba(0,0,0,.1);
        z-index: 99;
        background-color: #fff;
    }
    nav .user .drop-menu ul{
        border: 1px solid #ccc;
        padding: 10px 0;
        margin: 0;
    }
    nav .user .drop-menu ul li a{
        padding: 10px;
        display: block;
    }
    nav .user .drop-menu ul li a:hover{
        background-color: #f5f5f5;
    }
    nav .user .drop-menu ul li a i{
        margin-right: 15px;
        margin-left: 10px;
        color: #ea6f5a;
        font-size: 18px;
    }
    nav .nav-list:after{
        content: '';
        height: 0;
        display: block;
        visibility: hidden;
        clear: both;
    }
    nav .nav-list>li{
        float: left;
        margin-right: 5px;
    }
    nav .nav-list>li:hover{
        background-color: #f5f5f5;
    }
    nav .nav-list>li>a{
        display: block;
        height: 55px;
        padding: 15px;
        font-size: 17px;
    }
    nav .nav-list>li a i{
        margin-right: 10px;
        font-size: 20px;
        text-align: center;
        margin-top: 5px;
    }
    nav .nav-list>li.active{
        color: #ea6f5a;
        background-color: #fff;
    }
    /*搜索*/
    nav .nav-list .search{
        padding-left: 15px;
        font-size: 15px;
    }
    nav .nav-list .search:hover{
        background-color: #fff;
    }
    nav .nav-list .search form{
        position: relative;
        margin-top: 9px;
    }
    nav .nav-list .search form input{
        width: 240px;
        height: 38px;
        padding: 0 30px 0 20px;
        border: none;
        background-color: #eee;
        border-radius: 20px;
        transition:  width ease-in .2s;
    }
    nav .nav-list .search form input:focus{
        width: 320px;
    }
    nav .nav-list .search form .search-btn{
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 5px;
        top: 5px;
        text-align: center;
    }
    nav .nav-list .search form a.active{
        background-color: #969696;
        border-radius: 50%;
        color: #fff!important;
    }
    nav .nav-list .search form a.search-btn i {
        margin-right: 0;
        font-size: 18px;
    }
    @media (max-width: 1440px) {
        nav .nav-list>li>a>i{
            display: none;
        }
        nav .nav-list .search form input{
            width: 160px;
        }
        nav .nav-list .search form input:focus{
            width: 240px;
        }
    }
    @media (max-width: 1080px) {
        nav .nav-list>li>a>i {
            display: block;
        }
        nav .nav-list>li>a>span{
            display: none;
        }
        nav .nav-list .search form input{
            width: 150px;
        }
        nav .nav-list .search form input:focus{
            width: 150px;
        }
    }
    @media (max-width: 768px) {
        nav .nav-list {
            display: none;
        }
    }
    nav .nav-list .notify{
        position: relative;
    }
    nav .nav-list .notify .drop-menu{
        position: absolute;
        z-index: 9999;
        left: 0;
        min-width: 160px;
        font-size: 15px;
        box-shadow: 0 0 5px rgba(0,0,0,.1);
        background-color: #fff;
    }
    nav .notify .drop-menu ul{
        padding: 10px 0;
        margin: 0;
    }
    nav .notify .drop-menu ul li a{
        padding: 10px 20px;
        display: block;
    }
    nav .notify .drop-menu ul li a:hover{
        background-color: #f5f5f5;
    }
    nav .notify .drop-menu ul li a i{
        margin-right: 15px;
        color: #ea6f5a;
        font-size: 18px;
    }
</style>
<script>
    import {mapState} from 'vuex'
    import axios from 'axios'
    export default{
//        components: {NuxtLink},
        name:'myHeader', //给组件命名
        data(){
            return {
                userShow:false,
                notifyShow:false,
                bgShow:false,
            }
        },
        computed:{
          ...mapState(['nickName','cartCount','userId'])
        },
      created(){
            console.log(111111111)
            console.log(this.nickName)
      },
        methods:{
          logout:function () {
            axios.post('/users/logout').then((res)=>{
                var res = res.data;
                if(res.status == '0'){
                  this.$store.commit("updateUserInfo",'');
                  this.$store.commit("updateUserId",'');
                  this.$router.push({
                    path:'/'
                  })
                }
            })
          }
        }

    }
</script>
<style scoped>
  .show{
    display: none;
  }
</style>

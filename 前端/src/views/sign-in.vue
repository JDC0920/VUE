<template>
    <div class="sign">
        <!--logo-->
        <div class="logo">
          <router-link to="/">
            <img src="../assets/img/logo.png">
          </router-link>
        </div>
        <!--登录表单-->
        <div class="main">
            <div class="title">
                <h4>
                    <router-link class="active" to="/sign-in">
                        登录
                    </router-link>
                    <b>·</b>
                    <router-link  to="/sign-up">
                        注册
                    </router-link>
                </h4>
            </div>
            <div class="js-sign-in">
                <form method="post">
                    <div class="input-prepend">
                        <input type="text" placeholder="输入用户名" value="" ref="userName" class="top-radius userName">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="input-prepend">
                        <input type="text" placeholder="密码" value="" ref="passWord" class="bottom-radius passWord">
                        <i class="fa fa-lock"></i>
                    </div>
                    <div class="remember">
                        <input type="checkbox">&nbsp;
                        <span>记住我</span>
                    </div>
                    <div class="help">
                        <a href="javascript:void(0)">
                            登录遇到问题?
                        </a>
                    </div>
                    <input class="btn btn-primary" type="button" value="登录" @click="login()">
                </form>
                <div class="more-sign">
                    <p>社交账号登录</p>
                    <ul>
                        <li class="weibo">
                            <a href="#">
                                <i class="fa fa-weibo"></i>
                            </a>
                        </li>
                        <li class="weixin">
                            <a href="#">
                                <i class="fa fa-weixin"></i>
                            </a>
                        </li>
                        <li class="qq">
                            <a href="#">
                                <i class="fa fa-qq"></i>
                            </a>
                        </li>
                        <li class="other">
                            <a href="#">
                                其他
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//    import 'assets/css/sign.css'
import {mapState} from 'vuex'
import axios from 'axios'
    export default {
        name:'sign-in',//指明当前页面所使用的默认模板是layouts文件夹下的sign.vue
        data () {
            return {
                title:"登录-简书",
                meta:[
                    {hide:'description',name:'description',content:'登录页面'}
                ],
              mes:''
            }
        },
      computed:{
        ...mapState(['nickName','cartCount','userId'])
      },
      methods:{
            login(){
                var userName =this.$refs.userName.value;
                var passWord = this.$refs.passWord.value;
                axios.post('users/login',{
                    userName:userName,
                    passWord:passWord
                }).then((res)=>{
                    var res = res.data;
                    if(res.status == '0'){
                      this.$store.commit("updateUserInfo",res.result.userName);
                      console.log(this.nickName);
                      this.$store.commit("updateUserId",res.result.userId);
                      window.location.href = '/'
                    }else {
                        this.mes = res.msg;
                    }
                })
            }
      }
    }
</script>

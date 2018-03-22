<template>
    <div class="sign">
        <!--logo-->
        <div class="logo">
            <router-link to="/">
                <img src="../assets/img/logo.png">
            </router-link>
        </div>
        <!--注册表单-->
        <div class="main">
            <div class="title">
                <h4>
                    <router-link to="/sign-in">
                        登录
                    </router-link>
                    <b>·</b>
                    <router-link class="active" to="/sign-up">
                        注册
                    </router-link>
                </h4>
            </div>
            <div class="js-sign-up">
                <form method="post">
                    <div class="input-prepend">
                        <input type="text" name="userName" ref="userName" placeholder="你的昵称" class="top-radius userName">
                        <i class="fa fa-user"></i>

                    </div>
                    <div class="input-prepend">
                        <input type="text" ref="phone" value="" placeholder="手机号" class="phone">
                        <i class="fa fa-phone"></i>
                    </div>
                    <div class="input-prepend">
                        <input type="text" ref="passWord" value="" placeholder="设置密码" class="bottom-radius passWord">
                        <i class="fa fa-lock"></i>
                    </div>
                    <input type="button" class="btn btn-success sign-up-btn" value="注册" @click="reg()">
                    <p class="sign-up-msg">
                        点击注册即表示您同意并愿意遵守该网站<br>
                        用户协议和隐私政策
                    </p>
                </form>
                <div class="more-sign">
                    <p>社交账号登录</p>
                    <ul>
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
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//    import 'assets/css/sign.css'
import axios from 'axios'
    export default {
        name:'sign-up',//指明当前页面所使用的默认模板是layouts文件夹下的sign.vue
        data () {
            return {
                title:"注册-简书",
                meta:[
                    {hide:'description',name:'description',content:'注册页面'}
                ],
              mes:''
            }
        },
        methods:{
            reg(){
                var userName = this.$refs.userName.value;
                var phone = this.$refs.phone.value;
                var passWord = this.$refs.passWord.value;
//                console.log(userName,phone,passWord)
                axios.post('/users/reg',{
                    userName:userName,
                    phone:phone,
                    passWord:passWord
                }).then((res)=>{
                    var res = res.data;
                    if(res.status == '0'){
                        this.$router.push({
                          path:'/sign-in'
                        })
                    }else {
                        this.mes = res.msg;
                    }
                })

            }
        }
    }
</script>

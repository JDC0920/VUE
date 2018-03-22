<template>
  <div>
    <my-header></my-header>
    <!--<div class="container" v-if="showList==false">-->
      <!--<h1 style="text-align: center;">亲，你还没有登录哦！</h1>-->
    <!--</div>-->
    <div class="container" v-if="showList==false">
      <h5 style="padding-bottom:10px;border-bottom:2px solid red">我的购物车</h5>
      <table>
        <tr>
          <th style="width: 10%;">选择</th>
          <th style="width: 15%;">图片</th>
          <th style="width: 35%;">商品名称</th>
          <th style="width: 10%;">价格</th>
          <th style="width: 10%;">购买数量</th>
          <th style="width: 10%;">小计</th>
          <th style="width: 10%;">操作</th>
        </tr>
        <tr v-for="(pro,index) in cartList">
          <td><input type="checkbox" class="checked" @click="checke(index)"></td>
          <td><img :src="'/static/img/'+pro.productImage" alt=""></td>
          <td>{{pro.productName}}</td>
          <td>{{pro.salePrice}}</td>
          <td><button @click="changeCount(pro.productId,pro.checked,pro.productNum,-1,
          pro.salePrice)">-</button>
            <span class="count">{{pro.productNum}}</span>
            <button @click="changeCount(pro.productId,pro.checked,pro.productNum,1,
            pro.salePrice)">+</button>
          </td>
          <td>{{pro.salePrice*pro.productNum}}</td>
          <td><span style="color: red;cursor: pointer;" @click="cartDel(pro.productId,pro.productNum,pro.salePrice,pro.checked)">删除</span></td>
        </tr>

      </table>
      <div style="display: flex;justify-content: space-between;margin-top: 30px">
        <p>总价：<span style="color: red;font-size: 26px">{{sPrice}}</span>元</p>
        <router-link class="jiezhang" to="/">去结账</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../components/myHeader.vue'
  import { mapState } from 'vuex'
  import axios from 'axios'
  export default {
    name: "cart",
    components:{
      Header:myHeader,
    },
    data(){
      return{
        cartList:[],
        count:0,
        sPrice:0,
        lastNum:-1,
        time:0,
        time2:0,
        myTimeout:null,
        myTimeout2:null,
        showList:false,
      }
    },
    computed:{
      ...mapState(['nickName','cartCount','userId'])
    },
    mounted(){
      this.getCartList();
    },
    methods:{
      checke(index){
        var a=document.querySelectorAll('.checked');
        if(a[index].checked){
          this.cartList[index].checked='0'
          this.sPrice +=this.cartList[index].salePrice * this.cartList[index].productNum
        }else{
          this.cartList[index].checked='1'
          this.sPrice -=this.cartList[index].salePrice * this.cartList[index].productNum
        }
      },
      getCartList(){
        axios.get("/users/cartList").then((response)=>{
          let res = response.data;
          this.cartList = res.result.list;
          console.log(this.cartList)
          if(this.cartList){
            this.showList=true;
          }else{
            this.showList=false
          }
        });
      },
      done:function (){
        if(this.time == 0){
          clearInterval(this.myTimeout);
        }
        else{
          this.time=this.time-1;
        }
      },
      done2:function (){
        if(this.time2 == 0){
          clearInterval(this.myTimeout2);
        }
        else{
          this.time2=this.time2-1;
          console.log(this.time2)
        }
      },
      changeCount(proId,proCheck,proNum,num,price){
        if(this.time==0){
          if(proCheck=='0'){
            this.sPrice += price * num
          }
          this.time=3;
          this.myTimeout=setInterval(()=>{
            this.done()
          },1000);
          var productNum =proNum*1+num;
          var productId=proId
          var checked=proCheck
          if(productNum==0){
            this.cartDel(productId,num)
          }else{
            axios.post("/users/changeCount",{
              userId:this.userId,productId:productId,productNum:productNum,checked:checked
            }).then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                this.getCartList();
                this.$store.commit("updateCartCount",num);
              }
            });
          }
        }else{
          console.log(222222222)
        }
      },
      cartDel(proId,num,price,checke){
        if(this.time2==0){
          this.time2=3;
          this.myTimeout2=setInterval(()=>{
            this.done2()
          },1000);
          if(checke == '0'){
            this.sPrice -=num*price;
            this.count=num;
          }
          axios.post("/users/cartDel",{
            userId:this.userId,productId:proId
          }).then((response)=>{
            let res = response.data;
            if(res.status == '0'){
              this.getCartList();
              this.$store.commit("updateCartCount",-this.count);
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  table{
    background-color: #fff;
    margin-top: 20px;
  }
  table tr{
    border-bottom: 1px solid #f0f0f0;
  }
  table th{
    background-color: #f0f0f0;
  }
  table th,table td{
    text-align: center;
  }
  table img{
    width: 100%;
  }
  table td .count{
    border: 1px solid#969696;
    padding: 3px 10px;
  }
  .jiezhang{
    display:inline-block;
    width: 80px;
    height: 40px;
    line-height:40px;
    text-align:center;
    border-radius: 5px;
    background-color: #ffad52;
    color: #fff;
  }
</style>

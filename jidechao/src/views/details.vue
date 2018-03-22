<template>
  <div>
    <my-header></my-header>
  <div class="detail my-container">
    <div class="row detail-proinfo">
      <div class="col-5 detail-left">
        <img :src="'../../static/'+proMes[0].productImage" alt="" alt="" style="width: 100%;height: 100%;">
      </div>
      <div class="col-7 detail-right">
        <div class="detail-title">
          <h1>
            {{proMes[0].productName}}
          </h1>
          <p>8天超长待机 / 137g轻巧机身 / 高通骁龙处理器</p>
          <span>￥{{proMes[0].salePrice}}</span>
        </div>
        <a href="javascript:void(0)" @click="addCart()" class="btn btn-primary">加入购物车</a>
        <div class="detail-policy">
          <span>支持7天无理由退货</span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import myHeader from '../components/myHeader.vue'
  import axios from 'axios'
  import {mapState} from 'vuex'
  export default{
      name:'detail',
    data(){
          return{
            proMes:[{productName:'ss',productImage:'ss'}],
            proId:''
          }
    },
    mounted(){
        this.getId()
    },
    methods:{
      getId(){
          this.proId = this.$route.query.orderId;
          var param = {
              productId:this.proId
          };
          axios.get('/good/list2',{params:param}).then((res)=>{
              var res = res.data;
              if(res.status == '0'){
                  this.proMes = res.result.list;
              }else {
                  this.proMes=[]
              }
          })
      }  ,
      addCart(){
          axios.post('/goods/addCart',{productId:this.proId,userId:this.userId}).then((res)=>{
              var res = res.data;
              if(res.status == '0'){
                  this.$store.commit('updateCartCount');
                  alert('成功添加购物车')
              }else {}
              alert('你还没登录')
          })
      }
    },
    components:{
        myHeader
    }
  }
</script>
<style scoped>
  .detail{
    padding-top: 100px;
  }
  .detail .row{
    margin: 0px;
  }
  .detail .row .col-5{
    margin: 0px;
  }
  .detail .detail-left img{
    display: block;
    width: 100%;
  }
  .detail .detail-right .detail-title h1{
    margin:0;
    padding: 0;
    font-size: 24px;
    font-weight: normal;
    color: #212121;
    }
  .detail .detail-right .detail-title p{
    color: #b0b0b0;
    padding: 8px 0 0 0;
    margin: 0;
  }
  .detail .detail-right .detail-title span{
    display: block;
    font-size: 18px;
    color: #ff6700;
    border-bottom: 1px solid #e0e0e0;
    padding: 12px 0 20px;
  }
  .detail .detail-right .detail-list{
    background-color: #f9f9fa;
    padding: 30px;
    margin-bottom: 30px;
  }
  .detail .detail-right .detail-list ul li{
    line-height: 30px;
    color: #616161;
  }
  .detail .detail-right .detail-list .detail-price{
    color: #ff6700;
    font-size: 24px;
    padding-top: 20px;
  }
  .detail .detail-right .btn-primary{
    background-color: #ff6600;
    border-color: #ff6600;
    color: #fff!important;
    width: 298px;
    height: 52px;
    font-size: 16px;
    line-height: 40px;
  }
  .detail .detail-right .detail-policy{
    padding: 0 10px;
    margin: 20px 0;
    color: #b0b0b0;
    font-size: 14px;
  }
</style>

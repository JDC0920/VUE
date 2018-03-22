<template>
  <div>
  <myHeader></myHeader>
  <div class="my-container index">

    <div class="row">
      <div class="col-3 list">
        <ul class="trigger-menu">
          <li :class="{active:currentTab == 'NewArticle'}">
            <a href="javascript:void(0)" @click="toggleTab('NewArticle')">
              电视
            </a>
          </li>
          <li :class="{active:currentTab == 'NewComment'}">
            <a href="javascript:void(0)" @click="toggleTab('NewComment')">
              冰箱
            </a>
          </li>
          <li :class="{active:currentTab == 'Contents'}">
            <a href="javascript:void(0)" @click="toggleTab('Contents')">
              洗衣机
            </a>
          </li>
          <li :class="{active:currentTab == 'Contents'}">
            <a href="javascript:void(0)" @click="toggleTab('Contents')">
              空调
            </a>
          </li>
          <li :class="{active:currentTab == 'Contents'}">
            <a href="javascript:void(0)" @click="toggleTab('Contents')">
              电磁炉
            </a>
          </li>
          <li :class="{active:currentTab == 'Contents'}">
            <a href="javascript:void(0)" @click="toggleTab('Contents')">
              电风扇
            </a>
          </li>
        </ul>
      </div>
      <div class="col-9 main">
        <div class="swiper-container banner" :option="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in banners">
              <img :src="banner">
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
      <div id="list-container">
        <!--动态组件-->
        <component :is="currentTab" keep-alive></component>
      </div>
      <div>
        <ul class="note-list">
          <li v-for="(item,index) in goodsList">
            <div class="pic">
              <a href="javascript:void(0)">
                <img :src="'../../static/'+item.productImage" @click="toProMes(tejia.productId)">
              </a>
            </div>
            <div class="main">
              <h4 style="text-align: center;font-size: 16px;margin-top: 15px;">{{item.productName}}</h4>
              <div style="color: #ea6f5a;font-weight: 600;font-size: 18px;margin: 20px 0;text-align: center;">{{item.salePrice}}</div>
              <div style="text-align: center;">
                <a href="#" class="btn btn-success" style="color:#fff!important;" @click="addCart()">加入购物车</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

  import myHeader from '../components/myHeader.vue'
  import '../assets/css/main.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import NewArticle from '../components/NewArticle'
  import 'swiper/dist/css/swiper.css'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import axios from 'axios'
  export default{
      name:'index',
    data(){
      return{
        goodsList:[],
        banners:[
          '../../static/lunbo1.jpg',
          '../../static/lunbo2.jpg',
          '../../static/lunbo3.jpg',
          '../../static/lunbo4.jpg'
        ],
        currentTab:'NewArticle',
        swiperOption: {
          autoplay: {
              delay: 1000,
          },
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          pagination : '.swiper-pagination',
        },
      }
    },
    mounted(){
      this.getGoodsList();
    },
    methods:{
      toggleTab:function(tab){
        this.currentTab = tab;
      },
      getGoodsList(flag){
        console.log(this.goodsList)
        var param = {
//          productType:'dianshi'
        };
        axios.get('/goods/list').then((res)=>{

          var res = res.data;
          if(res.status == '0'){
            this.goodsList = res.result.list;

          }else{
            this.goodsList= [];
          }
        })
      },
      toProMes(id){
        this.$router.push({
          path:'/details?orderId='+id
        })
      },
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
      myHeader,
      swiper,
      swiperSlide,
      NewArticle,
    },

    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  }
</script>

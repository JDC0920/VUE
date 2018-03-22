<template>
    <div>
      <div >
        <ul class="note-list">
          <li v-for="(item,index) in goodsList">
            <div class="pic">
              <a href="javascript:void(0)">
                <img :src="'../../static/电视/'+item.productImage">
              </a>
            </div>
            <div class="main">
              <div>{{item.productName}}</div>
              <div>{{item.salePrice}}</div>
              <div>
                <a href="#" class="btn" @click="add(item.productId)">加入购物车</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import axios from 'axios'
    export default {
        name:'NewArticle',
      data(){
            return{

            }
      },


    }
</script>

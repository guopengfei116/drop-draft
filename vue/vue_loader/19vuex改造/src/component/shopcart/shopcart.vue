<template>
  <article class="shopcart-list">

    <!-- 商品列表 -->
    <div class="goods" v-for="item in buyGoodsList" v-bind:key="item.id">
      <mt-switch class="switch" v-model="item.isSelected"></mt-switch> 
      <img class="img" v-bind:src="item.thumb_path">
      <div class="inforight">
        <h4 class="mui-ellipsis-2">{{ item.title }}</h4>
        <div class="bottom">
          <ul>
            <li>￥{{ item.sell_price }}</li>
            <li>
              <app-numbox :initVal="goodsBuyData[item.id]" @change="goodsBuyData[item.id] = $event"></app-numbox>
            </li>
            <li>
              <a href="javascript:void(0)" @click="delGoods(item.id)">删除</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 总价 -->
    <div class="total">
      <div class="total_val">
        <ul>
          <li>总计（不含运费）</li>
          <li>已勾选商品{{ selectedGoodsTotal }}件,总价:￥{{ selectedGoodsPriceTotal }}元</li>
        </ul>
      </div>
      <div class="total_btn">
        <mt-button type="primary">付 款</mt-button>
      </div>
    </div>

  </article>
</template>

<script>
import storage from '../../js/storage.js';

export default {
  data() {
    return {
      buyGoodsList: [],
      goodsBuyData: storage.get('goodsBuyData') || {}
    }
  },

  methods: {
    // 获取购物车列表数据
    getBuyGoodsList() {
      let ids = Object.keys(this.goodsBuyData).join(',');
      this.axios.get(this.api.shopcL + ids)
      .then( 
        rsp => {
          // 给每个商品补充一个isSelected属性, 默认值为true
          rsp.data.message.forEach(goods => goods.isSelected = true);
          this.buyGoodsList = rsp.data.message;
        }
      );
    },

    // 删除商品
    delGoods(id) {
      // 从购买数量中删除, 在vue中删除数据需要使用$delete方法, 否则vue无法得知数据的变化
      this.$delete(this.goodsBuyData,id);

      // 从商品列表中删除
      this.buyGoodsList = this.buyGoodsList.filter(item => item.id != id);
    }
  },

  created() {
    this.getBuyGoodsList();
  },

  watch: {
    // 深度监听购买数据的变化, 实时存储到本地storage
    goodsBuyData: {
      handler() {
        storage.set('goodsBuyData', this.goodsBuyData);
      },
      deep: true
    }
  },

  computed: {
    // 已勾选的商品总件数
    selectedGoodsTotal() {
      // 遍历购物车商品列表, 如果该商品是选中状态, 那么获取这个商品的购买数量累加起来
      return this.buyGoodsList.reduce((sum, goods) => {
        return goods.isSelected? sum + this.goodsBuyData[goods.id] : sum;
      }, 0);
    },

    // 已勾选的商品总价
    selectedGoodsPriceTotal() {
      // 遍历购物车商品列表, 如果该商品是选中状态, 那么获取这个商品的价格 * 购买数量, 然后结果累加起来
      return this.buyGoodsList.reduce((sum, goods) => {
        return goods.isSelected? sum + this.goodsBuyData[goods.id] * goods.sell_price : sum;
      }, 0);
    }
  }
};
</script>

<style lang="less">
  .shopcart-list {
    .goods {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      height: 102px;
      display: flex;
      padding: 5px;
      .switch {
        flex: 0 0 52px;
      }
      .img {
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
      }
      .inforight {
        margin-left: 5px;
        flex: 1;
      }
      .inforight ul {
        padding-left: 0px;
      }
      .inforight li {
        list-style: none;
        display: inline-block;
      }
      .inforight h4 {
        color: #0094ff;
        font-size: 14px;
      }
      .bottom li:first-child {
        color: red;
        margin-right: 5px;
      }
      .bottom li:last-child {
        margin-left: 5px;
      }
    }
    .total {
      height: 84px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      padding: 5px 14px;
      ul {
		    padding-left: 0px;
		    margin: 14px 0;
		    li {
		      list-style: none;
		      font-size: 14px;
		    }
		  }
		  &_val {
		  	flex: 1;
		  }
		  &_btn {
		  	flex: 0 0 60px;
	      margin: 18px 0 0 0;
		  }
    }
  }
</style>

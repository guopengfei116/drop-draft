// 本地存储的key
const STORAGE_KEY = 'goodsBuyData';

export default {

    // 状态定义
    state: {
        buyData: storage.get('goodsBuyData')
    },

    // 作用与使用方式类似于computed计算属性
    getter: {
        // 获取商品购买的ids
        getIds(state, getters) {
            return Object.keys(state.buyData);
        },
        
        // 获取商品购买总数
        getBuyTotal(state, getters) {
            return Object.values(state.buyData).reduce((sum, v) => sum + v, 0);
        }
    },

    // 作用与使用方式类似于methods方法
    mutations: {

        // 增加或修改商品购买数量
        updateBuyData(state, params) {
            state.buyData[params.id] = params.total;
        },

        // 删除商品购买数量
        delBuyData(state, params) {
            Vue.delete(state.buyData, params.id);
        }
    }

};

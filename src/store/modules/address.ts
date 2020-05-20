import Address from "@/api/address";
// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)

export default{
    state: {
        list: []
    },
    getters: {
        default: (state) => {
            let items=state.list.find((item: any) => {
                return item.is_default
            })
            return items
        }
    },
    mutations: {
        setAddressList(state, list) {
            state.list = list
        }
    },
    actions: {
        getAddressList({commit}, callback) {
            Address.list().then((res: any) => {
                commit('setAddressList', res.data)
                callback()
            })
        }
    }
}

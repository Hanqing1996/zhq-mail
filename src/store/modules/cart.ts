import Cart from "@/api/cart";

export default{
    state: {
        count: 0
    },
    mutations: {
        setCount(state, count) {
            state.count = count
        }
    },
    actions: {
        getCount({commit}, callback) {
            Cart.count().then((res: any) => {
                commit('setCount', res.data)
                callback()
            })
        }
    }
}

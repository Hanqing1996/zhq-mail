import fetch from '@/api/fetch.ts'

class Order {
    static checkout () {
        return fetch('orderCheckout')
    }

    static list (data) {
        return fetch('orderList', data)
    }

    static view (data) {
        return fetch('orderView', data)
    }
}

export default Order
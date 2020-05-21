import fetch from '@/api/fetch.ts'

class Cart {
    static count () {
        return fetch('cartCount',{})
    }
}

export default Cart
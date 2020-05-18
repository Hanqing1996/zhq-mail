import fetch from '@/api/fetch.ts'

class Address {
    static list () {
        return fetch('addressList',{})
    }

    static add (data:any) {
        return fetch('addressAdd', data)
    }

    static save (data:any) {
        return fetch('addressSave', data)
    }

    static view (id:any) {
        return fetch('addressView', {
            address_id: id
        })
    }

    static romve (id:any) {
        return fetch('addressDel', {
            address_id: id
        })
    }

    static all () {
        return fetch('addressAll',{})
    }

    static region (id:any) {
        return fetch('addressRegion', {
            parent: id
        })
    }
}

export default Address
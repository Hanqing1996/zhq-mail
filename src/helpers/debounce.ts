const debounce=(action: Function, wait: number)=>{
    let timer: null | number = null
    return function () {
        if (timer)
            clearTimeout(timer)
        timer = setTimeout(action, wait)
    }
}

export default debounce
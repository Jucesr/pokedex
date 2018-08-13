
export const urlToId = (url) => {
    let aux_arr = url.split('/') 
    return aux_arr[aux_arr.length - 2] 
}

export const replaceAll = (target, search, replacement) => {
    return target.replace(new RegExp(search, "g"), replacement)
}
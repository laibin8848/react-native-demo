export const getCurDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export const showLogToServer = (msg) => {
    try {
        console.log(msg)
        fetch(`http://172.20.39.143:8000/json?${msg}`)
    } catch(e) {
        //
    }
}
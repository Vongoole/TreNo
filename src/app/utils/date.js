const getCurrentDateTime = () => {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    const month = normalizeDateValue(currentDate.getMonth() + 1)
    const day = normalizeDateValue(currentDate.getDate())
    const hours = normalizeDateValue(currentDate.getHours())
    const minutes = normalizeDateValue(currentDate.getMinutes())

    return {year, month, day, hours, minutes}

}
const normalizeDateValue = (val) => val.toString().length === 1 ? `0${val}` : val

export const getDateValue = () => {
    const {year, month, day} = getCurrentDateTime()
    return `${year}-${month}-${day}`
}
export const getTimeValue = () => {
    const {hours, minutes} = getCurrentDateTime()
    return `${hours}:${minutes}`
}
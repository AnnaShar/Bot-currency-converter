const _MS_PER_DAY = 1000 * 60 * 60 * 24;

const getDifferenceInDays = (date1String, date2String) => {
    const date1 = new Date(date1String);
    let date2;

    date2String ? date2 = new Date(date2String) : date2 = new Date();

    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export default {
    getDifferenceInDays
}

//TODO look for better way to compare dates and maybe a better name for this file

const equal = (date1, date2) => {
    const date1Obj = dateToObj(date1);
    const date2Obj = dateToObj(date2);
    for (let i = 0; i < Object.keys(date1Obj).length; i++) {
        if (date1Obj[Object.keys(date1Obj)[i]] !== date2Obj[Object.keys(date1Obj)[i]])
            return false;
    }
    return true;
};

const dateToObj = (date) => {
    return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }
};

export default {
    equal: equal
}

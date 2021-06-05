import {readFile, readFileAsync, writeFile} from "../../utils/file-reader-writer.js";
import config from "../../config.js";

let log = null;
const type = 'currencies';

const getLog = async () => {
    if (!log) {
        try {
            log = await uploadLog();
        } catch (e) {
            throw new Error('Log file not found.');
        }
    }
    return log;
};

const updateLog = async (date, time) => {
    const log = await getLog();
    const newLog = {
        date: date,
        time: time
    };

    log[type].push(newLog);
    saveLog();
};

const getLastChange = async () => {
    const log = await getLog();
    const lastIndex = log[type].length-1;
    return log[type][lastIndex];
};

const saveLog = () => {
    writeFile(config.files.log, log);
};

const uploadLog = async () => {
    const data = await readFile(config.files.log);
    return data;
};


export default {
    update: updateLog,
    getLastChange: getLastChange
}
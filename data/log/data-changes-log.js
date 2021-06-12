import {readFile, readFileAsync, writeFile} from "../../utils/file-reader-writer.js";
import config from "../../config.js";
import {dataEvents} from "../data-events.js";

let log = null;

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

const updateLog = async (type, date) => {
    const log = await getLog();
    log[type].push(date.toString());
    saveLog();
};

const getLastChange = async (type) => {
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

dataEvents.on('dataUpdated', (type, date)=>{
    updateLog(type, date);
});

export default {
    update: updateLog,
    getLastChange
}
import changesLog from './log/data-changes-log.js';
import dates from '../utils/dates.js';
import dataRequest from './data-request.js';
import {writeFile} from '../utils/file-reader-writer.js';
import currencyParser from './currency-parser.js';
import config from '../config.js';
import cron from 'node-cron';
import {emitDataUpdatedEvent} from "./data-events.js";

const securities = [
    {
        type: 'currency',
        validDataPeriod: 0,
        parser: currencyParser,
        updatePeriod: '0 19 * * MON-FRI'
    }
];

const keepDataUpdated = () => {
    securities.forEach((security) => {
        if (!isLastChangeValid(security)) {
            updateData(security);
        }
        scheduleUpdates(security);
    });

};

const isLastChangeValid = (security) => {
    const lastChange = changesLog.getLastChange(security.type);
    const acceptableDayDifference = security.validDataPeriod;
    const actualDayDifference = dates.getDifferenceInDays(lastChange);
    return actualDayDifference <= acceptableDayDifference;
};

const updateData = async (security) => {
    try {
        const actualData = await dataRequest.getData(config.urls[security.type]);
        const parsedData = security.parser.parse(actualData);
        writeFile(config.files.dataStorage[security.type], parsedData);
        emitDataUpdatedEvent(security.type);
    } catch (e) {
        throw new Error(e.message);
    }
};

const scheduleUpdates = (security) => {
    // const task = cron.schedule('*/10 * * * * MON-FRI', () => { //test (every 10 second)
    const task = cron.schedule(security.updatePeriod, () => {
        updateData(security);
    });
    task.start();
};

export default {
    keepDataUpdated: keepDataUpdated
}

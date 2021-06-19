import changesLog from './log/data-changes-log.js';
import dates from '../utils/dates.js';
import dataRequest from './data-request.js';
import {writeFile} from '../utils/file-reader-writer.js';
import config from '../constants/config.js';
import cron from 'node-cron';
import dataUpdatedEvent from './data-events-emitter.js';
import {securities} from '../constants/MOEX-securities.js';

const keepDataUpdated =  () => {
    securities.forEach(async(security) => {
        if (!(await isLastChangeValid(security))) {
            updateData(security);
        }
        scheduleUpdates(security);
    });

};

const isLastChangeValid = async (security) => {
    const lastChange = await changesLog.getLastChange(security.type);
    const acceptableDayDifference = security.validDataPeriod;
    const actualDayDifference = dates.getDifferenceInDays(lastChange);
    return actualDayDifference <= acceptableDayDifference;
};

const updateData = async (security) => {
    try {
        const actualData = await dataRequest.getData(config.urls[security.type]);
        const parsedData = security.parser.parse(actualData);
        writeFile(config.files.dataStorage[security.type], parsedData);
    } catch (e) {
        throw new Error(e.message);
    }
    dataUpdatedEvent.emit(security.type);
};

const scheduleUpdates = (security) => {
    const task = cron.schedule(security.updatePeriod, () => {
        updateData(security);
    });
    task.start();
};

export default {
    keepDataUpdated
}

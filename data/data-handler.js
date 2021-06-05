import changesLog from './log/data-changes-log.js';
import dates from '../utils/dates.js';
import dataRequest from './data-request.js';
import {writeFile} from '../utils/file-reader-writer.js';
import currencyParser from './currency-parser.js';
import config from '../config.js';

const securities = [
    {
        type: 'currency',
        validDataPeriod: 1,
        parser: currencyParser
    }
];

const keepDataUpdated = async () => {
    securities.forEach((security) => {
        if (!isLastChangeValid(security)) {

            //TODO make it depends from each other. ERRORS from both? And try again
            updateData();
            changesLog.update(new Date());

            //TODO make scheduled data updates
        }
    });

};

//TODO think the better way to check it
const isLastChangeValid = (security) => {
    //TODO count date difference between last change and now
    const lastChange = changesLog.getLastChange();
    const lastChangeDate = new Date(lastChange.date);
    const actualDate = new Date();
    return dates.equal(lastChangeDate, actualDate);
};

const updateData = async () => {
    const actualData = await dataRequest.getData();
    //TODO parse data here
    writeFile(config.files.currencyRates, actualData);
};

export default {
    keepDataUpdated: keepDataUpdated
}

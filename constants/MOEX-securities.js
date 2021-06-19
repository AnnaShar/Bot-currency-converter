import currencyParser from '../data/currency-parser.js';

export const securities = [
    {
        type: 'currency',
        validDataPeriod: 0,
        parser: currencyParser,
        updatePeriod: '0 19 * * MON-FRI'
    }
];
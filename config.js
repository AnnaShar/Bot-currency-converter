export default {
    urls: {
        currency: 'https://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities.json'
    },
    files: {
        dataStorage: {
            currency: './data/currency-rates-storage.json'
        },
        log: './data/log/changes-log-storage.json'
    }
}
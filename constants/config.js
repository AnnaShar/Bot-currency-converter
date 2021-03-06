export default {
    urls: {
        currency: 'https://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities.json'
    },
    files: {
        dataStorage: {
            currency: './data/storage/currency-rates-storage.json'
        },
        log: './data/log/changes-log-storage.json',
        users: './data/users'
    }
}
export default {
    urls: {
        currencyRates: 'https://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities.json'
    },
    files: {
        //TODO check paths during actual testing
        currencyRates: './data-storage.json',
        log: './data/log/changes-log-storage.json'
    }
}
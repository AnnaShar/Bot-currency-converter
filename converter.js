const fixer = require('fixer-api');

fixer.set({accessKey: "a3464775c7e7bcfb5e1dc78d592b259e"});

function convert(value, currencyTo) {
    return new Promise((resolve, reject) => {
        fixer.latest()
            .then((data) => {
                const rate = data.rates[currencyTo];
                if (rate) {
                    resolve(rate * value);
                }
                else{
                    reject('Bad request');
                }
            });

    })
}

module.exports = {
    convert: convert
};
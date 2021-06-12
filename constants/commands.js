//TODO recheck all texts

export default {
    customCommands: ['conversions', 'currencies', 'language'],

    start: {
        text: {
            eng: 'I can convert currencies by MOEX rates.\n' +
                'To see available conversions press /conversions.\n' +
                'To see all available actions press /help.',
            ru: 'Я конвертирую валюту по курсу закрытия прошедших торгов на Мосбирже.\n' +
                'Список доступных конвертаций можно посмотреть, используя команду /conversions.\n' +
                'Список доступных команд вы найдете в разделе /help.\n' +
                'Буду рад помочь!'
        },
        hello: {
            eng: 'Hello',
            ru: 'Привет'
        }
    },

    help: {
        name: '/help',
        text: {
            eng: 'Here is the list of actions you can do. \n',
            ru: 'Вам доступны следующие действия. \n'
        }
    },
    conversions: {
        name: '/conversions',
        description: {
            eng: 'show all available conversions',
            ru: 'показывает все возможные конвертации'
        },
        text: {
            eng: 'Choose what conversion you want to make.\nIf you do not know currencies abbreviations, press /currencies.\n',
            ru: 'Выберите валюты для конвертации.\nЕсли вы не знаете сокращенные наименования валют, нажмите /currencies.\n'
        }
    },
    language: {
        name: '/language',
        description: {
            eng: 'let choose different language',
            ru: 'позволяет выбрать другой язык интерфейса'
        },
        text: {
            eng: 'Choose interface language from below.',
            ru: 'Выберите язык интерфейса из представленных ниже.'
        }
    },
    currencies: {
        name: '/currencies',
        description: {
            eng: 'shows list of available currencies names',
            ru: 'показывает список доступных валют и их расшифровки'
        }
    },
    changeLanguage: {
        text: {
            eng: 'You switched interface language to English.',
            ru: 'Вы поменяли язык интерфейса на русский.'
        }
    },
    saveConversion: {
        text: {
            eng: 'Enter a number to convert',
            ru: 'Введите число для конвертации'
        }
    },
    convert:{
        failedConversion: {
            eng:'Please, choose what do you need to convert.\n' +
                'The list of available conversions is below.\n',
            ru:'Пожалуйста, выберите валюты для конвертации. \n' +
                'Список доступных конвертаций ниже. \n'
        },
        invalidNumber: {
            eng:'Please, enter a valid number.',
            ru:'Пожалуйста, введите валидное число.'
        }
    }
}
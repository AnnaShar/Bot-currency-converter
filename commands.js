export default {
    help: {
        name: '/help'
    },
    conversions:{
        name: '/conversions',
        description: {
            eng: 'show all available conversions',
            ru: 'показывает все возможные конвертации'
        },
        text:{
            eng: 'Choose what conversion you want to make.\nIf you do not know currencies abbreviations, press /currencies.\n',
            ru: 'Выберите способ конвертации.\nЕсли вы не знаете сокращенные наименования валют, нажмите /currencies.\n'
        }
    },
    language:{
        name: '/language',
        description: {
            eng: 'let choose different language',
            ru: 'дает выбрать другой язык интерфейса'
        }
    },
    mode:{
        name: '/currencies',
        description: {
            eng: 'shows list of available currencies names',
            ru: 'показывает список доступных валют и их расшифровки'
        }
    }
}
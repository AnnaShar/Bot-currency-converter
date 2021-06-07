//TODO check how to keep data from updated. Events?

const getRate = ()=>{

};

const start = (name) => {

    const text = `Привет${name ? ', ' + name : ''}! 
    Я умею считать актуальную стоимость евро в любой валюте.
    Напиши необходимое количество и код необходимой валюты.
    Например, запрос "7 USD" сконвертирует 7 евро в доллары.
    Если не указать код валюты, конвертация по умолчанию будет произведена в рубли.
    Чтобы получить список кодов валют и их расшифровок нажмите /help."
`;
    return text
};

export default {
    start: start,
    getRate:getRate
}
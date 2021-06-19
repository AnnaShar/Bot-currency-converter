import EventEmitter from 'events';

let dataEventsEmitter = new EventEmitter();

const emit = (dataType) => {
    dataEventsEmitter.emit('dataUpdated', dataType, new Date());
};

const subscribe = (event, eventHandler) => {
    dataEventsEmitter.on(event, (dataType, date) => {
        eventHandler(dataType, date);
    });
};

export default {
    emit,
    subscribe
}


import EventEmitter  from 'events';

export let dataEvents = new EventEmitter();

export const emitDataUpdatedEvent = (dataType) => {
    dataEvents.emit('dataUpdated', dataType, new Date());
};


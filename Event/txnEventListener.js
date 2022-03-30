const { EventListener } = require('./events');

let ManufacturerEvent = new EventListener();

ManufacturerEvent.txnEventListener("manufacturer", "Admin", "autochannel",
    "KBA-Automobile", "CarContract", "createCar", "car999", "Nissan", "Sunny",
    "Grey", "01/12/2021", "QQQ");
const { EventListener } = require('./events');

let UserEvent = new EventListener();

UserEvent.blockEventListener("registrar", "Admin", "propertychannel");

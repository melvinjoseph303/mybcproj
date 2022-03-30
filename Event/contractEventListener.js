const { EventListener } = require('./events');

let UserEvent = new EventListener();

UserEvent.ContractEventListener("registrar", "Admin", "propertychannel",
    "LandRegistration", "UserContract", "addUserEvent");

const { clientApplication } = require('./client');

let manufacturerClient = new clientApplication()
let dealerClient = new clientApplication();

/*
manufacturerClient.generateAndSubmitTxn(
    "manufacturer",
    "Admin",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "createCar",
    "car01",
    "Maruthi",
    "Alto",
    "White",
    "12/12/2021",
    "factory06"
).then(msg => {
    console.log(msg.toString());
});
*/



manufacturerClient.generateAndEvaluateTxn(
    "manufacturer",
    "appUser",
    "autochannel",
    "KBA-Automobile",
    "CarContract",
    "queryAllCars"
).then(msg => {
    console.log(msg.toString());
});


const transientData = {
    make: Buffer.from('Honda'),
    model: Buffer.from('Accord'),
    color: Buffer.from('White'),
    dealerName: Buffer.from('Dealer-01')
}

/*
dealerClient.generateAndSubmitPvtTxn(
    "dealer",
    "Admin",
    "autochannel",
    "KBA-Automobile",
    "OrderContract",
    "createOrder",
    transientData,
    "Ord01"
).then(msg => {
    console.log(msg.toString())
});
*/

/*
dealerClient.generateAndEvaluateTxn(
    "dealer",
    "Admin",
    "autochannel",
    "KBA-Automobile",
    "OrderContract",
    "readOrder",
    "Ord01"
).then(msg => {
    console.log(msg.toString())
});
*/

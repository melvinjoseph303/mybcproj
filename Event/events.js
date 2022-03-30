const { profile } = require('./profile');
const fs = require('fs');
const path = require('path');
const { Wallets, Gateway } = require('fabric-network');

class EventListener {
    async blockEventListener(role, identityLabel, channelName) {

        let gateway = new Gateway();
        try {
            let Profile = profile[role.toLowerCase()];
            const ccpPath = path.resolve(Profile["ccp"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(Profile["wallet"]);
            await gateway.connect(ccp, {
                wallet,
                identity: identityLabel,
                discovery: { enabled: true, asLocalhost: true }
            });

            let network = await gateway.getNetwork(channelName);

            await network.addBlockListener(async (event) => {
                console.log("Block details: ", event);
                console.log("Block number: ", event.blockNumber.toString());
            });


        } catch (error) {
            console.log("Error occure:", error)
        }
    }

    async ContractEventListener(role, identityLabel, channelName, chaincodeName,
        contractName, eventName) {

        let gateway = new Gateway();
        try {
            let Profile = profile[role.toLowerCase()];
            const ccpPath = path.resolve(Profile["ccp"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(Profile["wallet"]);
            await gateway.connect(ccp, {
                wallet,
                identity: identityLabel,
                discovery: { enabled: true, asLocalhost: true }
            });

            let network = await gateway.getNetwork(channelName);
            let contract = await network.getContract(chaincodeName, contractName);
            await contract.addContractListener(async (event) => {
                if (event.eventName === eventName) {
                    console.log("Event received: ", event.payload.toString());
                }
            })



        } catch (error) {
            console.log("Error occure:", error)
        }
    }

    async txnEventListener(role, identityLabel, channelName, chaincodeName,
        contractName, transactionName, ...args) {

        let gateway = new Gateway();
        try {
            let Profile = profile[role.toLowerCase()];
            const ccpPath = path.resolve(Profile["ccp"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(Profile["wallet"]);
            await gateway.connect(ccp, {
                wallet,
                identity: identityLabel,
                discovery: { enabled: true, asLocalhost: true }
            });

            let network = await gateway.getNetwork(channelName);
            let contract = await network.getContract(chaincodeName, contractName);
            let transaction = contract.createTransaction(transactionName);
            let transactionId = transaction.getTransactionId();
            let peers = network.channel.getEndorsers();

            await network.addCommitListener((error, event) => {
                if (error) {
                    console.log("Commit error: ", error)
                } else {
                    console.log("TransactionId: ", event.transactionId);
                    console.log("Transaction status: ", event.status);
                }

            }, peers, transactionId);

            await transaction.submit(...args);

        } catch (error) {
            console.log("Error occure:", error)
        } finally {
            console.log("Disconnect from gateway");
            gateway.disconnect();
        }

    }




}

module.exports = { EventListener }

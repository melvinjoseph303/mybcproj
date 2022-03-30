const { profile } = require('./profile');
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

class clientApplication {

    async generateAndSubmitTxn(role, identityLabel, channelName, chaincodeName,
        contractName, txnName, ...args) {

        let gateway = new Gateway();

        try {

            this.Profile = profile[role.toLowerCase()];
            const ccpPath = path.resolve(this.Profile["ccp"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(this.Profile["wallet"]);
            await gateway.connect(ccp, {
                wallet,
                identity: identityLabel,
                discovery: { enabled: true, asLocalhost: true }
            });
            let channel = await gateway.getNetwork(channelName);
            let contract = await channel.getContract(chaincodeName,contractName);
            let result = await contract.submitTransaction(txnName, ...args);
            console.log(result);
        return Promise.resolve(result)

        } catch (error) {
            console.log("Error occured:", error);
            return Promise.reject(error);
        } finally {
            console.log("Disconnect from gateway");
            gateway.disconnect();

        }
    }


    async generateAndEvaluateTxn(role, identityLabel, channelName, chaincodeName,
        contractName, txnName, ...args) {

        let gateway = new Gateway();

        try {

            this.Profile = profile[role.toLowerCase()];
            const ccpPath = path.resolve(this.Profile["ccp"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(this.Profile["wallet"]);
            await gateway.connect(ccp, {
                wallet,
                identity: identityLabel,
                discovery: { enabled: true, asLocalhost: true }
            });
            let channel = await gateway.getNetwork(channelName);
            let contract = await channel.getContract(chaincodeName, contractName);
            let result = await contract.evaluateTransaction(txnName, ...args);
            console.log(result);
        return Promise.resolve(result)

        } catch (error) {
            console.log("Error occured:", error);
            return Promise.reject(error);
        } finally {
            console.log("Disconnect from gateway");
            gateway.disconnect();

        }


    }

    async generateAndSubmitPvtTxn(role, identityLabel, channelName, chaincodeName,
        contractName, txnName, transientData, ...args) {

        let gateway = new Gateway();

        try {

            this.Profile = profile[role.toLowerCase()];
            const ccpPath = path.resolve(this.Profile["ccp"]);
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));
            let wallet = await Wallets.newFileSystemWallet(this.Profile["wallet"]);
            await gateway.connect(ccp, {
                wallet,
                identity: identityLabel,
                discovery: { enabled: true, asLocalhost: true }
            });
            let channel = await gateway.getNetwork(channelName);
            let contract = await channel.getContract(chaincodeName, contractName);

            let result = await contract.createTransaction(txnName).setTransient(transientData).submit(...args);

            console.log(result);
        return Promise.resolve(result)

        } catch (error) {
            console.log("Error occured:", error);
            return Promise.reject(error);
        } finally {
            console.log("Disconnect from gateway");
            gateway.disconnect();

        }
    }
}

module.exports = { clientApplication }

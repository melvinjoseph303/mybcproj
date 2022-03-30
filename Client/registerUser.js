const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { profile } = require('./profile');

async function main(role, userName, caName, mspID) {
    try {
        let Profile = profile[role.toLowerCase()];
        const ccpPath = path.resolve(Profile["ccp"]);
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));

        const caInfo = ccp.certificateAuthorities[caName];
        const ca = new FabricCAServices(caInfo.url);

        let wallet = await Wallets.newFileSystemWallet(Profile["wallet"]);

        const userIdentity = await wallet.get(userName);
        if (userIdentity) {
            console.log(`An identity for the user ${userName} already exists in the wallet`);
            return;
        }

        const adminIdentity = await wallet.get('caAdmin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "caAdmin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'caAdmin');

        const secret = await ca.register({
            enrollmentID: userName,
            role: 'client'
        }, adminUser);

        const enrollment = await ca.enroll({
            enrollmentID: userName,
            enrollmentSecret: secret
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: mspID,
            type: 'X.509'
        };

        await wallet.put(userName, x509Identity);
        console.log(`Successfully enrolled the user ${userName} and imported it into the wallet`);


    } catch (error) {
        console.log(`Failed to register the user ${userName} : ${error}`);
        process.exit(1);
    }

}

main("registrar", "appUser", "ca1.registrar.property.com", "registrar-property-com");
//main("user", "appUser1", "ca1.user.property.com", "user-property-com");

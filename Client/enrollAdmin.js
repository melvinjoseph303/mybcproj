const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { profile } = require('./profile');

async function main(role, caName, mspID) {
    try {
        let Profile = profile[role.toLowerCase()];
        const ccpPath = path.resolve(Profile["ccp"]);
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'));

        const caInfo = ccp.certificateAuthorities[caName];
        const ca = new FabricCAServices(caInfo.url);

        let wallet = await Wallets.newFileSystemWallet(Profile["wallet"]);

        const identity = await wallet.get('caAdmin');

        if (identity) {
            console.log('An identity for the admin user "caAdmin" already exits in the wallet');
            return;
        }

        const enrollment = await ca.enroll({
            enrollmentID: 'admin',
            enrollmentSecret: 'adminpw'
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: mspID,
            type: 'X.509'
        };

        await wallet.put('caAdmin', x509Identity);
        console.log('Successfully enrolled the admin user "caAdmin" and imported it into the wallet');

    } catch (error) {
        console.log("Failed to enroll admin user caAdmin ", error);
        process.exit(1);
    }

}

main("registrar", "ca1.registrar.property.com", "registrar-property-com");
//main("user", "ca1.user.property.com", "user-property-com");

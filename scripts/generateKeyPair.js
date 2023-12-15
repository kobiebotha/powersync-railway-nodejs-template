import PowerSyncKeys from "./PowerSyncKeys.js";

const powerSyncKeys = new PowerSyncKeys();

async function main () {
    await powerSyncKeys.init();
    console.log(`Public Key:
    ${JSON.stringify(powerSyncKeys.publicJwk, null, 2)}
    ---
    Update secrets on Railway app by setting the following:
    
    POWERSYNC_JWT_PUBLICKEY=${powerSyncKeys.publicBase64}
    
    POWERSYNC_JWT_PRIVATEKEY=${powerSyncKeys.privateBase64}
    `);
}

main()
    .then(() => {
        console.log("Keys generated")
    })
    .catch((err) => {
        console.log(err);
    });

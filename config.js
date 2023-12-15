import "dotenv/config";

const config = {
    port: process.env.PORT,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    },
    powersync: {
        url: process.env.POWERSYNC_URL,
        publicKey: process.env.POWERSYNC_JWT_PUBLICKEY,
        privateKey: process.env.POWERSYNC_JWT_PRIVATEKEY,
        jwtIssuer: process.env.JWT_ISSUER
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    }
}

export default config;

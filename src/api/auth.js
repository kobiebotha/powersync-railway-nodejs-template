import express from "express";
import {SignJWT, importJWK} from "jose";
import config from "../../config.js";

/**
 * Set the Router for all /auth endpoints
 * @type {Router}
 */
const router = express.Router();

/**
 * Get the JWT token that PowerSync will use to authenticate.
 * The header of the request should contain a token that is set by the client application.
 * You should validate the token before generating a new JWT for PowerSync.
 * https://docs.powersync.com/usage/installation/authentication-setup/custom
 */
router.get("/token", async (req, res) => {
    try {
        if(!req.headers.authorization) {
            res.status(401).send();
            return;
        }

        // Here, we assume the Authorization header format is: Bearer <token>
        const userToken = req.headers.authorization.split(' ')[1];
        if(!userToken) {
            // Uncomment the code below for production apps as you'll want to reject
            // requests that do not have a token.
            // res.status(401).send();
            // return;
        }

        /**
         * This value is hardcoded to get you started. In production you'll need to implement something here
         * to validate and decode the token. The user uuid or other user identifier us used as the subject of the JWT.
         * For an example implementation using Firebase, see https://github.com/powersync-ja/powersync-nodejs-firebase-backend-todolist-demo
         * @type {{uuid: number}}
         */
        const decodedToken = {
            uuid: 12345
        };


        if(decodedToken) {
            // If token is valid, decodedToken has all the user info
            const uid = decodedToken.uid;

            const decodedPrivateKey= new Buffer.from(config.powersync.privateKey, 'base64');
            const powerSyncPrivateKey = JSON.parse(new TextDecoder().decode(decodedPrivateKey));
            const powerSyncKey = await importJWK(powerSyncPrivateKey);
            const token = await new SignJWT({})
                .setProtectedHeader({
                    alg: powerSyncPrivateKey.alg,
                    kid: powerSyncPrivateKey.kid,
                })
                .setSubject(uid)
                .setIssuedAt()
                .setIssuer(config.powersync.jwtIssuer)
                .setAudience(config.powersync.url)
                .setExpirationTime('5m')
                .sign(powerSyncKey);

            const responseBody = {
                token: token,
                powerSyncUrl: config.powersync.url,
                expiresAt: null,
                userId: uid
            };

            res.send(responseBody);
        } else {
            res.status(401).send({
                message: "Unable to verify idToken"
            });
        }
    } catch (err) {
        console.log("[ERROR] Unexpected error", err);
        res.status(500).send({
            message: err.message
        });
    }
});

/**
 * This is the JWKS endpoint PowerSync uses to handle authentication.
 * https://docs.powersync.com/usage/installation/authentication-setup/custom
 */
router.get("/keys", (req, res) => {
    try {
        const decodedPublicKey= new Buffer.from(config.powersync.publicKey, 'base64');
        const powerSyncPublicKey = JSON.parse(new TextDecoder().decode(decodedPublicKey));
        res.send({
            keys: [
                powerSyncPublicKey
            ]
        });
    } catch (err) {
        console.log("[ERROR] Unexpected error", err);
        res.status(500).send({
            message: err.message
        });
    }
});

export { router as authRouter };

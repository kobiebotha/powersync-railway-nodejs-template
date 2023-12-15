import cryptoRandomString from "crypto-random-string";
import {generateKeyPair, exportJWK} from "jose";

export default class PowerSyncKeys {
    alg = 'RS256';
    kid = `powersync-${cryptoRandomString({ length: 10, type: 'hex' })}`;

    privateKey;
    publicKey;

    privateJwk;
    publicJwk;

    async generate () {
        const keys = await generateKeyPair(this.alg, {
            extractable: true,
        });

        this.privateKey = keys.privateKey;
        this.publicKey = keys.publicKey;
    }

    async setPrivateJwk () {
        this.privateJwk = {
            ...(await exportJWK(this.privateKey)),
            alg: this.alg,
            kid: this.kid,
        };
    }

    async setPublicJwk () {
        this.publicJwk = {
            ...(await exportJWK(this.publicKey)),
            alg: this.alg,
            kid: this.kid,
        };
    }

    async init () {
        await this.generate();
        await this.setPrivateJwk();
        await this.setPublicJwk();

        const privateBase64 = Buffer.from(JSON.stringify(this.privateJwk)).toString('base64')
        const publicBase64 = Buffer.from(JSON.stringify(this.publicJwk)).toString('base64')
    }
}

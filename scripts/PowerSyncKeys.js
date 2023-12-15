import cryptoRandomString from "crypto-random-string";
import {generateKeyPair, exportJWK} from "jose";

export default class PowerSyncKeys {
    alg = 'RS256';
    kid = `powersync-${cryptoRandomString({ length: 10, type: 'hex' })}`;

    privateKey;
    publicKey;

    privateJwk;
    publicJwk;

    privateBase64;
    publicBase64;

    async generate () {
        const keys = await generateKeyPair(this.alg, {
            extractable: true,
        });

        if(!this.privateKey) this.privateKey = keys.privateKey;
        if(!this.publicKey) this.publicKey = keys.publicKey;

        await this.setPrivateJwk();
        await this.setPublicJwk();
    }

    async setPrivateJwk () {
        if(!this.privateJwk) {
            const jwk = await exportJWK(this.privateKey);
            this.privateJwk = {
                ...jwk,
                alg: this.alg,
                kid: this.kid,
            };
        }
    }

    async setPublicJwk () {
        if(!this.publicJwk) {
            const jwk = await exportJWK(this.publicKey);
            this.publicJwk = {
                ...jwk,
                alg: this.alg,
                kid: this.kid,
            };
        }
    }

    async init () {
        await this.generate();
        await this.setPublicJwk();
        await this.setPrivateJwk();
        this.privateBase64 = Buffer.from(JSON.stringify(this.privateJwk)).toString('base64');
        this.publicBase64 = Buffer.from(JSON.stringify(this.publicJwk)).toString('base64');
    }
}

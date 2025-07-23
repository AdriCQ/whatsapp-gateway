import {BaileysProvider as Provider} from '@builderbot/provider-baileys'
import {validateToken} from "~/auth";
import type {IncomingMessage as IncomingMessageHttp, ServerResponse} from 'http';

interface IncomingMessage extends IncomingMessageHttp {
    body: {
        phoneNumber: string
        message: string
        urlMedia?: string
        secret: string
    }
}

export default function (provider: Provider, handleCtx: any) {
    provider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req: IncomingMessage, res: ServerResponse) => {
            const {phoneNumber, message, urlMedia, secret} = req.body
            if (!validateToken(secret)) {
                res.statusCode = 401
                return res.end('unauthorized')
            }

            await bot.sendMessage(phoneNumber, message, {media: urlMedia ?? null})
            return res.end('ok')
        })
    )
}
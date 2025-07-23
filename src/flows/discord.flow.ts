import {addKeyword} from '@builderbot/bot'

import {PostgreSQLAdapter as Database} from '@builderbot/database-postgres'
import {BaileysProvider as Provider} from '@builderbot/provider-baileys'
import registerFlow from "~/flows/register.flow";


export default addKeyword<Provider, Database>('doc').addAnswer(
    ['You can see the documentation here', '📄 https://builderbot.app/docs \n', 'Do you want to continue? *yes*'].join(
        '\n'
    ),
    {capture: true},
    async (ctx, {gotoFlow, flowDynamic}) => {
        if (ctx.body.toLocaleLowerCase().includes('yes')) {
            return gotoFlow(registerFlow)
        }
        await flowDynamic('Thanks!')
        return
    }
)

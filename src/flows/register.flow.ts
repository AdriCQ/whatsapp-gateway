import {addKeyword, utils} from '@builderbot/bot'

import {PostgreSQLAdapter as Database} from '@builderbot/database-postgres'
import {BaileysProvider as Provider} from '@builderbot/provider-baileys'

export default addKeyword<Provider, Database>(utils.setEvent('REGISTER_FLOW'))
    .addAnswer(`What is your name?`, {capture: true}, async (ctx, {state}) => {
        await state.update({name: ctx.body})
    })
    .addAnswer('What is your age?', {capture: true}, async (ctx, {state}) => {
        await state.update({age: ctx.body})
    })
    .addAction(async (_, {flowDynamic, state}) => {
        await flowDynamic(`${state.get('name')}, thanks for your information!: Your age: ${state.get('age')}`)
    })

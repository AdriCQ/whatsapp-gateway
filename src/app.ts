import {createBot, createFlow, createProvider} from '@builderbot/bot'
import {PostgreSQLAdapter as Database} from '@builderbot/database-postgres'
import {BaileysProvider as Provider} from '@builderbot/provider-baileys'
import dotenv from 'dotenv'
import initApi from './api'

dotenv.config()

const PORT = process.env.PORT ?? 3000

const main = async () => {
    const adapterFlow = createFlow([])

    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database({
        host: process.env.POSTGRES_DB_HOST,
        user: process.env.POSTGRES_DB_USER,
        database: process.env.POSTGRES_DB_NAME,
        password: process.env.POSTGRES_DB_PASSWORD,
        port: +process.env.POSTGRES_DB_PORT
    })

    const {handleCtx, httpServer} = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    initApi(adapterProvider, handleCtx)

    httpServer(+PORT)
}

void main()

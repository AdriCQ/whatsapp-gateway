import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import initApi from './api'
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.APP_PORT ?? 3000

const main = async () => {
    const adapterFlow = createFlow([])
    
    const adapterProvider = createProvider(Provider, 
		{ version: [2, 3000, 1027934701] as any } 
	)
    const adapterDB = new Database({
       host: process.env.POSTGRES_DB_HOST,
       user: process.env.POSTGRES_DB_USER,
       database: process.env.POSTGRES_DB_NAME,
       password: process.env.POSTGRES_DB_PASSWORD,
       port: +process.env.POSTGRES_DB_PORT
   })

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    initApi(adapterProvider, handleCtx)
    httpServer(+PORT)
}

await main()

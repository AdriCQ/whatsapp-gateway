import dotenv from 'dotenv'

export function validateToken(token: string): boolean {
    dotenv.config()
    return token === process.env.APP_SECRET_KEY
}
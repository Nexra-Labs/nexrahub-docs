import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: parseInt(process.env.PORT, 10) || 9871,
  MONGO_URI: process.env.MONGO_URI,
  ENVIRONMENT: process.env.ENVIRONMENT,
  SOLANA_RPC_URL: process.env.ENVIRONMENT === 'TESTNET' ? process.env.SOLANA_RPC_URL_TESTNET : process.env.SOLANA_RPC_URL_MAINNET,
  SOLANA_USDC_ADDRESS: process.env.ENVIRONMENT === 'TESTNET' ? process.env.SOLANA_USDC_ADDRESS_TESTNET : process.env.SOLANA_USDC_ADDRESS_MAINNET,
  SOLANA_USDT_ADDRESS: process.env.ENVIRONMENT === 'TESTNET' ? process.env.SOLANA_USDT_ADDRESS_TESTNET : process.env.SOLANA_USDT_ADDRESS_MAINNET,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
}));
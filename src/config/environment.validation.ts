import * as Joi from "joi";

export default Joi.object({
    NODE_ENV: Joi.string().valid("development", "test", "production", "staging")
        .default("development"),
    PORT: Joi.number().port().default(9871),
    MONGO_URI: Joi.string().required(),
    ENVIRONMENT: Joi.string().required(),
    SOLANA_RPC_URL_TESTNET: Joi.string().required(),
    SOLANA_RPC_URL_MAINNET: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.string().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASS: Joi.string().required(),
    SOLANA_USDC_ADDRESS_TESTNET: Joi.string().required(),
    SOLANA_USDC_ADDRESS_MAINNET: Joi.string().required(),
    SOLANA_USDT_ADDRESS_TESTNET: Joi.string().required(),
    SOLANA_USDT_ADDRESS_MAINNET: Joi.string().required(),
});
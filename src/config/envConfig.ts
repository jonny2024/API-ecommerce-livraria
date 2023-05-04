import * as dotenv from "dotenv";
dotenv.config();

const env: { [key: string]: string } = {
    PORT: <string>process.env.PORT,
    DATABASE_URL: <string>process.env.DATABASE_URL,
};

for (const property in env) {
    if (!env[property])
        throw Error(`Variavel de ambiente ${property} não definida`);
}

export default env;

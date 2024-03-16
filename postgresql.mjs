import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config'

function createClient(connectionString) {
    return new Client({
        connectionString,
        ssl: (process.env.DB_SSL === "true") ? { rejectUnauthorized: false } : false 
    });
}

let client;

if (process.env.ENVIORMENT === 'local') {

    const connectionString = process.env.DB_CONNECTIONSTRING_LOCAL;
    client = createClient(connectionString);
} else if (process.env.ENVIORMENT === 'prod') {

    const connectionString = process.env.DB_CONNECTIONSTRING_PROD;
    client = createClient(connectionString);
} else {
    throw new Error('Invalid environment specified');
}

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();

export default client;
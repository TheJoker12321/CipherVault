import { MongoClient } from "mongodb";

let client;
export let db;

export async function createMongo(url) {

    if (db) return db

    client = new MongoClient(url.url)
    await client.connect()
    db = client.db(url.dbname)

    return db

}
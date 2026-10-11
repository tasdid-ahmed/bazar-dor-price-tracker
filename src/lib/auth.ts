import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

const client =
    globalForMongo.mongoClient ??
    new MongoClient(process.env.MONGODB_URI as string);

if (process.env.NODE_ENV !== "production") {
    globalForMongo.mongoClient = client;
}


const db = client.db("bazar-dor-db");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            mapProfileToUser: (profile) => ({
                image: profile.picture,
            }),
            overrideUserInfoOnSignIn: true,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            mapProfileToUser: (profile) => ({
                image: profile.avatar_url,
            }),
            overrideUserInfoOnSignIn: true,

        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});
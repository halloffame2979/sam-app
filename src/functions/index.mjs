import { handler as sObject } from "./sObject.mjs";
import { handler as auth } from "./auth.mjs";
import serverlessExpress from "@codegenie/serverless-express";
import express from "express";
const app = express();

app.use("/api/sobject", sObject);
app.use("/api/oauth2", auth);
app.get('/', (req, res) => {
    console.log(typeof sObject, typeof auth);
    res.status(200).json({ message: "Hello World" });
})

export const handler = serverlessExpress({ app });
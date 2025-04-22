import { createSObject, deleteSObject, getDescribeGlobal, getSObjectById, getSObjectDescribe, getSObjectList, updateSObject } from "../services/sObject.mjs";

import { } from "@codegenie/serverless-express";
import express from "express";
import serverlessExpress, { getCurrentInvoke } from '@codegenie/serverless-express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { authMiddleware, errorHandler } from "../common/middleware.mjs";
const app = express();
const router = express.Router();

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', authMiddleware, async (req, res) => {
    const result = await getDescribeGlobal(req, res);
    return res.status(result.statusCode).json(result.data);
});

router.post('/:SObjectApiName', authMiddleware, async (req, res) => {
    const result = await createSObject(req, res);
    return res.status(result.statusCode).json(result.data);
});

router.get('/:SObjectApiName/list', authMiddleware, async (req, res) => {
    const result = await getSObjectList(req, res);
    return res.status(result.statusCode).json(result.data);
});
router.get('/:SObjectApiName/describe', authMiddleware, async (req, res) => {
    const result = await getSObjectDescribe(req, res);
    return res.status(result.statusCode).json(result.data);
});

router.get('/:SObjectApiName/:id', authMiddleware, async (req, res) => {
    const result = await getSObjectById(req, res);
    return res.status(result.statusCode).json(result.data);
});

router.patch('/:SObjectApiName/:id', authMiddleware, async (req, res) => {
    const result = await updateSObject(req, res);
    return res.status(result.statusCode).json(result.data);
});

router.delete('/:SObjectApiName/:id', authMiddleware, async (req, res) => {
    const result = await deleteSObject(req, res);
    return res.status(result.statusCode).json(result.data);
});

router.use(errorHandler);

export const handler = router;
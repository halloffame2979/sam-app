import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "../common/middleware.mjs";
import { getAuthorizationUrl, handleCallback } from "../services/auth.mjs";
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/auth", async (req, res) => {
  const callback = req.query.callback;
  const result = getAuthorizationUrl(callback);
  return res.status(result.statusCode).json(result.data);
});
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const result = await handleCallback(code);
  return res.status(result.statusCode).json(result.data);
});

router.use(errorHandler);

export const handler = router;

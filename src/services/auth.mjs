import { HTTP_CODE } from "../common/constant.mjs";
import { getSFAuthorizationUrl, handleAuthorizationCodeCallback } from "../common/salesforce.auth.mjs";
import { SerializedResponse } from "../common/serializedClass.mjs";

export function getAuthorizationUrl(callback) {
    return new SerializedResponse(getSFAuthorizationUrl(callback), HTTP_CODE.OK);
}

export async function handleCallback(code) {
    const credential = await handleAuthorizationCodeCallback(code);
    return new SerializedResponse(credential, HTTP_CODE.OK);
}
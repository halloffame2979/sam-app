import { create, read, remove, update } from "../common/api.mjs";
import { API_VERSION } from "../common/constant.mjs";
import {
  SerializedResponse,
  NotFoundError,
} from "../common/serializedClass.mjs";

const headersTransform = (req) => {
  return { headers: { Authorization: `Bearer ${req.accessToken}` } };
};

let listViews = {};
const BASE_PATH = `/services/data/v${API_VERSION}/sobjects`;

const lazyloadListViews = async (objectName, params = null) => {
  if (
    !listViews[objectName] ||
    Object.keys(listViews[objectName]).length <= 0
  ) {
    listViews[objectName] = {};

    const url = `${BASE_PATH}/${objectName}/listviews`;
    const res = await read(url, params);
    listViews[objectName] = res.data.listviews;
  }
  return listViews[objectName];
};

const parseListViewRecord = (record) => {
  const parsedRecord = {};
  record.columns.forEach((column) => {
    parsedRecord[column["fieldNameOrPath"]] = column["value"];
  });
  return parsedRecord;
};

export async function getDescribeGlobal(req, res) {
  const result = await read(BASE_PATH, headersTransform(req)).catch((error) => {
    throw error;
  });
  return result;
}

export async function createSObject(req, res) {
  const objectName = req.params.SObjectApiName;
  const url = `${BASE_PATH}/${objectName}`;
  const result = await create(url, req.body, headersTransform(req));
  return result;
}

export async function getSObjectById(req, res) {
  const objectName = req.params.SObjectApiName;
  const id = req.params.id;
  const url = `${BASE_PATH}/${objectName}/${id}`;
  const result = await read(url, headersTransform(req));
  return result;
}

export async function deleteSObject(req, res) {
  const objectName = req.params.SObjectApiName;
  const id = req.params.id;
  const url = `${BASE_PATH}/${objectName}/${id}`;
  const result = await remove(url, headersTransform(req));
  return result;
}

export async function updateSObject(req, res) {
  const objectName = req.params.SObjectApiName;
  const id = req.params.id;
  const url = `${BASE_PATH}/${objectName}/${id}`;
  const result = await update(url, req.body, headersTransform(req));
  return result;
}

export async function getSObjectDescribe(req, res) {
  const objectName = req.params.SObjectApiName;
  const url = `${BASE_PATH}/${objectName}`;
  const result = await read(url, headersTransform(req));
  return result;
}

export async function getSObjectList(req, res) {
  const objectName = req.params.SObjectApiName;
  const viewName = `All${objectName}s`;
  const objectViews = await lazyloadListViews(
    objectName,
    headersTransform(req)
  );
  const listView = objectViews.find(
    (listView) => listView.developerName === viewName
  );
  if (!listView) {
    throw new NotFoundError(`List view ${viewName} not found`);
  }
  const url = listView.resultsUrl;
  const result = await read(url, headersTransform(req));
  return new SerializedResponse(
    result.data.records.map(parseListViewRecord),
    result.statusCode
  );
}

import axios, { Axios } from "axios";
import { SerializedResponse } from "./serializedClass.mjs";

const api = axios.create({
  baseURL: process.env.SalesforceBaseUrl || "https://api.example.com",
  timeout: 6000,
});

export async function read(path, params = undefined) {
  try {
    const response = await api.get(path, params);
    return new SerializedResponse(response.data, response.status);
  } catch (error) {
    console.error("Error fetching data:", path, error.message, error);
    throw SerializedResponse.fromError(error);
  }
}
export async function create(path, data, params = null) {
  try {
    const response = await api.post(path, data, params);
    return new SerializedResponse(response.data, response.status);
  } catch (error) {
    console.error("Error creating data:", path, error.message, error);
    throw SerializedResponse.fromError(error);
  }
}
export async function update(path, data, params = null) {
  try {
    const response = await api.patch(path, data, params);
    return new SerializedResponse(response.data, response.status);
  } catch (error) {
    console.error("Error updating data:", path, error.message, error);
    throw SerializedResponse.fromError(error);
  }
}
export async function remove(path, params = null) {
  try {
    const response = await api.delete(path, params);
    return new SerializedResponse(response.data, response.status);
  } catch (error) {
    console.error("Error deleting data:", path, error.message, error);
    throw SerializedResponse.fromError(error);
  }
}

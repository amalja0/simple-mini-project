import axios from "axios";
import { defineBaseUrl } from "../utils/helperFunction";

let BASE_URL = "";
let BASE_PREFIX = "/api/customers"

export const createCustomer = async (serviceId, requestBody) => {
  BASE_URL = defineBaseUrl(serviceId);

  try {
    const res = await axios.post(BASE_URL + BASE_PREFIX, requestBody);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getCustomers = async (serviceId) => {
  BASE_URL = defineBaseUrl(serviceId);

  try {
    const res = await axios.get(BASE_URL + BASE_PREFIX);
    return res;
  } catch (error) {
    console.log(error);
  }
}
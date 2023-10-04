import axios from "axios";
import { adminRequest } from "../utils/axios-config-admin";
import { config } from "../utils/axiosconfig";
import { HTTP_MGMT } from "../utils/domain-config";

export const filterProductApi = async (data, params) => {
  return await axios.post(
    `${HTTP_MGMT}/products/filter`,
    data,
    { params },
    config
  );
};

export const createProduct = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/products/create`, data);
};

export const updateProduct = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/products/updateProduct`, data);
};

export const deleteProduct = async (data) => {
  return await adminRequest.post(`${HTTP_MGMT}/products/deleteProduct`, data);
};

export const getProduct = async (id) => {
  return await adminRequest.get(`${HTTP_MGMT}/products/getById/${id}`);
};

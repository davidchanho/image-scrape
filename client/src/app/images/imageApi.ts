import axios from "axios";

const url = "/api/images";

export function fetchImages() {
  return axios.get(url);
}

export function seedImages() {
  return axios.post(`${url}/pod`);
}

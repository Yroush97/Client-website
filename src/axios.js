import axios from "axios";
const instancs = axios.create({
  baseURL: "https://apitest.i2-host.com/2.1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instancs;

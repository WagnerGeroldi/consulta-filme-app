import axios from "axios";

const baseURL = "https://apifilmesbackend.herokuapp.com/";

const api = axios.create({
  baseURL: baseURL,

  headers: {
    "Content-Type": "application/json",
  },
});

export { api };

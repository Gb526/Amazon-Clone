import axios  from "axios";

const axiosInstance = axios.create({
  // baseURL:"http://127.0.0.1:5001/clone-fbe61/us-central1/api"
  baseURL: " https://api-6g6w7cmseq-uc.a.run.app/api",
});
export{axiosInstance};
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1500000
})

export default api
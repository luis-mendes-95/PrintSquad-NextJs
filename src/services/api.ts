import axios from "axios";

const api = axios.create({
    baseURL: "https://printsquad.onrender.com/",
    timeout: 1500000
})

export default api
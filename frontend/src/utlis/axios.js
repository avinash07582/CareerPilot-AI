// api call toh with creadials true ho jaeye or route aa jaye direct yaa hold kar lenge 

import axios from "axios";


const api = axios.create({
    baseURL:    import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,

})

export default api
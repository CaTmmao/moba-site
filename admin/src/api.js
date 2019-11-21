import { Message } from 'element-ui'

import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3001/admin/api/'
})

http.interceptors.response.use((res) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const { code } = res.data

    if (code === 0) {
        const { msg } = res.data
        if (msg) {
            Message.error(msg)
        }
    }

    return res;
}, (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(err);
});

export default http
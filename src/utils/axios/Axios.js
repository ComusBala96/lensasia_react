import { csrf_token, domain_url, local } from '@orians/utils';
import Axios, { CancelToken, isCancel } from 'axios';

const token = csrf_token;
const axios = Axios.create({
    baseURL: domain_url + 'api/',
});
export { CancelToken, isCancel };
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['Authorization'] = token;
axios.interceptors.response.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (err) => {
        if (local) {
            console.log('Error Response:', err);
        }
        return Promise.reject(err);
    },
);
export default axios;

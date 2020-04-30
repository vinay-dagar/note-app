import Axios from 'axios';

function createAxios() {
    const axios = Axios.create();

    axios.defaults.baseURL = 'http://192.168.1.208:4000/api/v1/';
    /* eslint max-len: 0 */
    // axios.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token') || '';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.timeout = 1000 * 60 * 5; // 2 min timeout

    axios.interceptors.request.use(
        (conf) => {
            return conf;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // if (error && error.response && error.response.status === 401) {
            //     state.dispatch('auth/logout');
            // }
            if(error && error.response){
                return Promise.reject(error.response.data);
            }
            return Promise.reject(error);
        },
    );
    return axios;
};

// Axios Initialization
const api = createAxios();

const services = {
    async rawPost(path, data) {
        const results = await api.post(path, data);

        return Promise.resolve(results);
    },

    async updateById(path, id, data) {
        const results = await api.put(`${path}/${id}`, data);

        return Promise.resolve(results);
    },

    async get(path) {
        const {data} = await api.get(path);

        return Promise.resolve(data);
    },

    async getById(path, id) {
        const results = await api.get(`${path}/${id}`);

        return Promise.resolve(results);
    },
};

global.$http = services
module.exports = services
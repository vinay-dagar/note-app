import Axios from 'axios';

function createAxios() {
    const axios = Axios.create();

    axios.defaults.baseURL = 'http://localhost:4000/api/v1';
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
    async rawPost(path, body) {
        const data = await api.post(path, body);

        return Promise.resolve(data);
    },

    async updateById(path, id, body) {
        const data = await api.put(`${path}/${id}`, body);

        return Promise.resolve(data);
    },

    async get(path) {
        const data = await api.get(path);

        return Promise.resolve();
    },

    async getById(path, id) {
        const data = await api.get(`${path}/${id}`);

        return Promise.resolve(data);
    },
};

global.$http = services
module.exports = services
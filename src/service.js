import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://drives4fun.com/api/`,
    // baseURL: `http://localhost:3001/api/`,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Token')}`;

export async function authorizeMe(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export async function signIn(data) {
    const response = await axiosInstance.post('user/login', data);
    return response;
}


export async function getQuotations(data) {
    const response = await axiosInstance.post('quotation/get-all', data);
    return response;
}

export async function createNewQuotation(data) {
    const response = await axiosInstance.post('quotation/create', data);
    return response;
}


export async function updateNewQuotation(data) {
    const response = await axiosInstance.post('quotation/update', data);
    return response;
}


export async function createFeedBack(data) {
    const response = await axiosInstance.post('/feedback/create', data);
    return response;
}


export async function getFeedBacks(data) {
    const response = await axiosInstance.post('feedback/get-all', data);
    return response;
}

export default axiosInstance;
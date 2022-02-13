import axios from "axios";
function getexhibitions(data) {
    return axios.get(`https://api.artic.edu/api/v1/exhibitions${data}`)
}
function getexhibition(id) {
    return axios.get(`https://api.artic.edu/api/v1/exhibitions/${id}`)
}
export const apis={getexhibitions,getexhibition}
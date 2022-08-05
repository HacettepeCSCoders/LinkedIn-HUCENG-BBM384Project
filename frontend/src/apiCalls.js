import axios from "axios";

export const login = creds => {
    return axios.post('/api/login', {}, { auth: creds })
}

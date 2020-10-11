import { api } from "../services/api";

export const getContacts = async (userId) => {
    return await api.get('/api/contacts/' + userId)
        .then(res => {
            if(res.data.success)
                return res.data.results.filter(item => item.user_id !== userId);
        })
        .catch(error => {
            if(error.response.status === 404) return [];
            else console.log(error); // implements error handling...
        });
}
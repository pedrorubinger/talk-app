import { api } from "./api";

export const getUserData = async id => {
    return await api.get('/api/user/get/id/' + id)
        .then(response => {
            if(response.data.success) {
                return {
                    success: true,
                    name: response.data.name,
                    nick: response.data.nick,
                    email: response.data.email,
                    userLastVisit: response.data.last_visit,
                    instagram: response.data.instagram,
                    facebook: response.data.facebook
                }
            }
        })
        .catch(error => {
            return {
                success: false,
                message: "Error trying to fetch user data. Error " + error
            };
        });
}
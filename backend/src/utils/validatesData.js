module.exports = {
    // Needs to be completed
    validatesUserData(name, nickname, email, password) {
        if(name.length < 3 || name.length > 45)
            return false;

        if(nickname.length < 3 || nickname.length > 20)
            return false;

        if(email.length < 3 || email.length > 30)
            return false;
            
        if(password.length < 4 || password.length > 20)
            return false;

        return true;
    },

    validatesLoginData(nickname, password) {
        if(nickname.length < 3 || nickname.length > 20)
            return false;

        if(password.length < 4 || password.length > 20)
            return false;

        return true;
    }
}
const allowedCharsForNickAndPassword = /^([a-zA-Z0-9-.]+)$/;

export const validatesSignUpData = (name, nick, email, password) => {
    const allowedCharsForName = /^[A-Za-z ]+$/;
    const allowedCharsForEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let invalidFields = [];
    let hasEmptyField = false;
    let hasNotAllowedChars = false;

    if(!name) {
        invalidFields.push('realName');
        hasEmptyField = true;
    }
    
    if(name.match(allowedCharsForName) === null) {
        if(name) {
            invalidFields.push('realName');
            hasNotAllowedChars = true;
        }
    }

    if(!nick) {
        invalidFields.push('username');
        hasEmptyField = true;
    }

    if(nick.match(allowedCharsForNickAndPassword) === null) {
        if(nick) {
            invalidFields.push('username');
            hasNotAllowedChars = true;
        }
    }

    if(!email) {
        invalidFields.push('email');
        hasEmptyField = true;
    }

    if(email.match(allowedCharsForEmail) === null) {
        if(email) {
            invalidFields.push('email');
            hasNotAllowedChars = true;
        }
    }

    if(!password) {
        invalidFields.push('password');
        hasEmptyField = true;
    }

    if(password.match(allowedCharsForNickAndPassword) === null) {
        if(password) {
            invalidFields.push('password');
            hasNotAllowedChars = true;
        }
    }

    return { invalidFields, hasEmptyField, hasNotAllowedChars };
}

export const validatesSignInData = (nick, password) => {
    if((nick.match(allowedCharsForNickAndPassword) === null || nick.length < 3 || nick.length > 20)
        && (password.match(allowedCharsForNickAndPassword) === null || password.length < 4 || password.length > 20))
        return { invalidData: 'both', message: 'Username and password are invalid!' };
    
    if(nick.match(allowedCharsForNickAndPassword) === null || nick.length < 3 || nick.length > 20)
        return { invalidData: 'nickname', message: 'Username is invalid!' };
    
    if(password.match(allowedCharsForNickAndPassword) === null || password.length < 4 || password.length > 20)
        return { invalidData: 'password', message: 'Password is invalid!' };

    return { invalidData: "", message: "Valid" };
}
const allowedCharsForNickAndPassword = /^([a-zA-Z0-9-.]+)$/;
const allowedCharsForName = /^[A-Za-z ]+$/;
const allowedCharsForEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validatesSignUpData = (name, nick, email, password) => {
    let invalidFields = [];
    let hasEmptyField = false;
    let hasNotAllowedChars = false;

    if(!name) {
        invalidFields.push('realName');
        hasEmptyField = true;
    }
    
    if(name.match(allowedCharsForName) === null || name.length < 3 || name.length > 20) {
        if(name) {
            invalidFields.push('realName');
            hasNotAllowedChars = true;
        }
    }

    if(!nick) {
        invalidFields.push('username');
        hasEmptyField = true;
    }

    if(nick.match(allowedCharsForNickAndPassword) === null || nick.length < 3 || nick.length > 20) {
        if(nick) {
            invalidFields.push('username');
            hasNotAllowedChars = true;
        }
    }

    if(!email) {
        invalidFields.push('email');
        hasEmptyField = true;
    }

    if(email.match(allowedCharsForEmail) === null || email.length < 8 || email.length > 40) {
        if(email) {
            invalidFields.push('email');
            hasNotAllowedChars = true;
        }
    }

    if(!password) {
        invalidFields.push('password');
        hasEmptyField = true;
    }

    if(password.match(allowedCharsForNickAndPassword) === null || password.length < 4 || password.length > 20) {
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

export const validatesProfileData = (name, email, currentPassword, newPassword, instagram, facebook, location, bio) => {
    let invalidFields = [];
    let hasEmptyField = false;
    let hasNotAllowedChars = false;

    if(newPassword === null) newPassword = '';
    if(facebook === null) facebook = '';
    if(instagram === null) instagram = '';
    if(location === null) location = '';
    if(bio === null) bio = '';

    if(!name) {
        invalidFields.push('realName');
        hasEmptyField = true;
    }
    
    if(name.match(allowedCharsForName) === null || name.length < 3 || name.length > 20) {
        if(name) {
            invalidFields.push('realName');
            hasNotAllowedChars = true;
        }
    }

    if(!email) {
        invalidFields.push('email');
        hasEmptyField = true;
    }

    if(email.match(allowedCharsForEmail) === null || email.length < 8 || email.length > 40) {
        if(email) {
            invalidFields.push('email');
            hasNotAllowedChars = true;
        }
    }

    if(currentPassword === '') {
        invalidFields.push('currentPassword');
        hasEmptyField = true;
    }

    if(currentPassword.match(allowedCharsForNickAndPassword) === null
        || currentPassword.length < 4 || currentPassword.length > 20) {
        if(currentPassword !== '') {
            invalidFields.push('currentPassword');
            hasNotAllowedChars = true;
        }
    }

    if(newPassword !== '' && (newPassword.match(allowedCharsForNickAndPassword) === null || 
        newPassword.length < 4 || newPassword.length > 20)) {
        invalidFields.push('newPassword');
        hasNotAllowedChars = true;
    }

    if(instagram !== '' && (instagram.match(allowedCharsForNickAndPassword) === null
    || instagram.length < 4 || instagram.length > 30)) {
        invalidFields.push('instagram');
        hasNotAllowedChars = true;
    }

    if(facebook !== '' && (facebook.match(allowedCharsForNickAndPassword) === null
        || facebook.length < 4 || facebook.length > 30)) {
        invalidFields.push('facebook');
        hasNotAllowedChars = true;
    }

    if(location !== '' && (location.length < 3 || location.length > 45)) {
        invalidFields.push('location');
        hasNotAllowedChars = true;
    }

    if(bio !== '' && bio.length > 85) {
        invalidFields.push('bio');
        hasNotAllowedChars = true;
    }

    return { invalidFields, hasEmptyField, hasNotAllowedChars };
}
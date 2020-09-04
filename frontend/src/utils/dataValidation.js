export const validatesSignUpData = (nick, password) => {
    const allowedChars = /^([a-zA-Z0-9-.]+)$/;
    let errorsFound = [];

    // NICKNAME VALIDATION
    if(!nick && !password) {
        errorsFound.push("Fill in the username and password!");
        return errorsFound;
    } else if(!nick) {
        errorsFound.push("Fill in the username!");
        return errorsFound;
    } else if(!password) {
        errorsFound.push("Fill in the password!");
        return errorsFound;
    }   

    if(nick.match(allowedChars) === null)
        errorsFound.push("Your username contains characters not allowed!");
        // errorsFound.push({ invalidData: "nickname", message: "You must use only allowed chars!" });
        // return { success: false, invalidData: "nick", message: "You must use only allowed chars!" }

    if(nick.length < 3)
        errorsFound.push("Your username must be at least 3 characters!");
        // errorsFound.push({ invalidData: "nickname", message: "Your username must be at least 3 characters!" });
        // return { success: false, invalidData: "nick", message: "Your username must be at least 3 characters!" }

    if(nick.length > 20)
        errorsFound.push("Your username must be a maximum of 20 characters!");
        // errorsFound.push({ invalidData: "nickname", message: "Your username must be a maximum of 20 characters!" })
        // return { success: false, invalidData: "nick", message: "Your username must be a maximum of 20 characters!" }

    // PASSWORD VALIDATION
    if(password.match(allowedChars) === null)
        errorsFound.push("Your password contains characters not allowed!");
        // errorsFound.push({ invalidData: "password", message: "You must use only allowed chars!" });
        // return { success: false, invalidData: "password", message: "You must use only allowed chars!" }

    if(password.length < 4)
        errorsFound.push("Your password must be at least 3 characters!");
        // errorsFound.push({ invalidData: "password", message: "Your password must be at least 3 characters!" });
        // return { success: false, invalidData: "password", message: "Your password must be at least 3 characters!" }

    if(password.length > 20)
        errorsFound.push("Your password must be a maximum of 20 characters!");
        //errorsFound.push({ invalidData: "password", message: "Your password must be a maximum of 20 characters!" });
        // return { success: false, invalidData: "password", message: "Your password must be a maximum of 20 characters!" }

    return errorsFound;
}

export const validatesSignInData = (nick, password) => {
    const allowedChars = /^([a-zA-Z0-9-.]+)$/;

    if((nick.match(allowedChars) === null || nick.length < 3 || nick.length > 20)
        && (password.match(allowedChars) === null || password.length < 4 || password.length > 20))
        return { invalidData: 'both', message: 'Username and password are invalid!' };
    
    if(nick.match(allowedChars) === null || nick.length < 3 || nick.length > 20)
        return { invalidData: 'nickname', message: 'Username is invalid!' };
    
    if(password.match(allowedChars) === null || password.length < 4 || password.length > 20)
        return { invalidData: 'password', message: 'Password is invalid!' };

    return { invalidData: "", message: "Valid" };
}
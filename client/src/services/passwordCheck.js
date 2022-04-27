let englishAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let bigEnglishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let numbers = "0123456789".split("");
let specialCharacter = "!@#$%^&*()_+".split("");

const passwordCheck = (password) => {
    let small = false;
    let big = false;
    let number = false;
    let special = false;

    for (let i = 0; i < password.length; i++) {
        if (englishAlphabet.includes(password[i])) {
            small = true;
        }
        if (bigEnglishAlphabet.includes(password[i])) {
            big = true;
        }
        if (numbers.includes(password[i])) {
            number = true;
        }
        if (specialCharacter.includes(password[i])) {
            special = true;
        }
        if (small && big && number && special) {
            return true;
        }
    }
    return false;
};

export default passwordCheck;
const crypto = require('crypto');


function hash(password) {
    if(!password) return null; 
    const word= "asd"
const hashpass = crypto.createHmac("sha512",word).update(password).digest("hex"); 
    // console.log(hashpass);
    return hashpass;
}

module.exports ={hash}
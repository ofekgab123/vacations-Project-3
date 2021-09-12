const dal = require('../data-access/dal');
const cryptoHelper = require('../helpers/crypto-helper')
async function login(user) {
    user.password=cryptoHelper.hash(user.password)
    console.log("login",user.password);
    const sql = `SELECT * from users WHERE userName = "${user.userName}" and password = "${user.password}"`;
    console.log(sql);
    const login = await dal.executeAsync(sql);
    if (login.length === 0) {
        return 0;
    }
    return login;
}

module.exports = {
    login
}
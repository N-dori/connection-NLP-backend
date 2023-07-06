const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        console.log('username',username);
        
        const user = await authService.login(username, password)
        console.log('user',user);
        const loginToken = authService.getLoginToken(user)

        logger.info('User login: ', user)
        res.cookie('loginToken', loginToken, {sameSite: 'None', secure: true})
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    console.log('credentials',req.body);
    try {
        const credentials = req.body
        
        // Never log passwords
        logger.debug(credentials)
        const account = await authService.signup(credentials)
        if(!credentials.password){
            logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
            res.json(account)
        }else{
            logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
            const user = await authService.login(credentials.userName, credentials.password)
            logger.info('User signup:', user)

            res.json(user)
        }
        
        // const loginToken = authService.getLoginToken(user)
        // res.cookie('loginToken', loginToken, {sameSite: 'None', secure: true})
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res){
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}
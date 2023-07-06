const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(userName, password) {
    try{
        logger.debug(`auth.service - login with userName: ${userName}`)
        const user = await userService.getByUsername(userName)
        console.log('userrrrrrrrrrrrrr',user);
        
        if (!user) return Promise.reject('Invalid userName or password')
        // TODO: un-comment for real login
        const match = await bcrypt.compare(password, user.password)
        if (!match) return Promise.reject('Invalid userName or password!!!!!')
    
        delete user.password
        user._id = user._id.toString()
        console.log('user service', user);
        return user

    }
    catch(err)
    {
    logger.debug(`auth.service -failed to login with userName: ${userName}, fullname: ${fname}`)
}
}
   

async function signup({userName, password, email, fname, imgUrl,courses}) {
    const saltRounds = 10
    const user= { userName,fname,email, imgUrl,courses }
    // if (!userName || !password || !fname) return Promise.reject('Missing required signup information')
    
    // if (userExist) return Promise.reject('userName already taken')
    //no password because this is googleUser
    if(!password){
        const userExist = await userService.getByUsername(userName)
        console.log('userExist userExist userExist',userExist); 
        if(userExist){
            return userExist
        } else {
            return userService.add(user)

        }
    } else{
        const hash = await bcrypt.hash(password, saltRounds)
        const user= { userName, password: hash,email, fname, imgUrl ,courses }
        if(!user.imgUrl)user.imgUrl='https://res.cloudinary.com/dii16awkb/image/upload/v1684053261/unprofile_ji7zus_z2immz.png'
        console.log('user in service signup',user);
        return userService.add(user)

    }   
}


function getLoginToken(user) {
    const userInfo = {_id : user._id, fullname: user.fullname, isAdmin: user.isAdmin}
    return cryptr.encrypt(JSON.stringify(userInfo))    
}

function validateToken(loginToken) {
    try {
        logger.debug('GOT:', loginToken)
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}




// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()
const User = require ('../models/User.model')
const bcryptjs = require ('bcryptjs')
const saltRounds = 13


module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.doRegister = async(req, res) => {
    try {
        const {username} = req.body
        console.log(username)
        const potentialUser = await User.findOne({username})

        if(potentialUser){
            res.render('auth/register', {errorMessage: 'This username already exist, please find another one.', username})
        }else{
            const salt = bcryptjs.genSaltSync(saltRounds)
            const passwordHash = bcryptjs.hashSync(req.body.password, salt)
            const newUser = await User.create({username: req.body.username, password: passwordHash})
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.doLogin = async(req, res) => {
    try {
        const {username} = req.body
        const {password} = req.body
        
        const existingUser = await User.findOne({username})

        if(!existingUser){
            res.render('auth/login', {errorMessage: 'This username is not registered', username})
        }else{
            if(bcryptjs.compareSync(password, existingUser.password)){
                //console.log('login in here')
                //console.log('Before setting session:', req.session);
                //we create the session
                req.session.user = existingUser
                //console.log('Session:', req.session);
                res.redirect('/auth/profile')
            }else{
                console.log('error log in')
                res.render('auth/login', {errorMessage: 'unable to authentica user', username})
            }
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports.profile = (req, res, next) => {
    const user = req.session.user
    console.log('profile', user)
    res.render('profile', {user})
}

const Admin = require('../Schema/adminSchema')
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth')


exports.createNewAdmin = async (req, res) =>{
    const {firstName, lastName, email, password,} = req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(404).json({message: 'You need to enter all the fileds'})
    }

    const salt = bcrypt.genSaltSync(10);

    bcrypt.hash(password, salt, (err, hash) => {
        if(err){
            return res.status(500).json({
                message: 'filed when encrpterin the password'
            })
        }
        Admin.create({firstName, lastName, email, passwordHash: hash})

        .then(user =>{
            res.status(201).json({
                token: auth.generateToken(user)
            })
        })
    })

}


exports.loginAdmin = (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message: 'You need to enter both email and password'})
    }
    
    Admin.findOne({email})
    .then(data =>{
        if(!data){
            return res.status(401).json({message: 'incorrect credentials'})
        }

        bcrypt.compare(password, data.passwordHash, (err, result) => {
            if(err){
                return res.status(500).json({message: 'something went wrong when decrypting the psaaword'})
            }

            if(!result){
                return res.status(401).json({message: 'Incorrect credentials'})
            }

            res.status(200).json({token: auth.generateToken(data)})
        })


    })
}

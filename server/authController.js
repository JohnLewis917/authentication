const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        //check to see if email in use
        const db = req.app.get('db')
        const {email, password} = req.body

        const result = await db.find_user(email)
        if(result[0]) return res.status(200).send({message: "Email already in use"})

        //add hash and user to db
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        //add hash and user to db
        const hashId = await db.add_hash(hash)
        const {hash_id} = hashId[0]
        const createdUser = await db.add_cust({email, hash_id})

        req.session.user = {id: createdUser[0].cust_id, email: createdUser[0].email}

        res.status(200).send({message: 'logged in', userData: req.session.user})
            
    },
    login: async(req, res) =>{
        const db = req.app.get('db')
        const {email, password} = req.body

        //check if emailhas an account
        const user = await db.find_hash(email)


        if(!user[0]) return res.status(200).send({message: 'Email not found'})
        const result = bcrypt.compareSync(password, user[0].hash_value)
        if(result === true){
            req.session.user = {id: user[0].cust_id, email: user[0].email}
            return res.status(200).send({message: 'Logged in', userData: req.session.user})
        }else {
            res.status(200).send({message: 'Password incorrect'})
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({message: 'Logged out'})
    }

    
}
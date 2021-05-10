const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')

class UserService {
    constructor(){
        this.collection = 'users'
        this.mongoDB = new MongoLib()
    }

    async getUser({ email }){
        const [ user ] = await this.mongoDB.getAll(this.collection, { email })
        return user
    }

    async createUser({ user }) {
        const { name, email, password } = user
        const hashPassword = await bcrypt.hashSync(password, 10)

        const createUserId = await this.mongoDB.create(this.collection, {
            name,
            email,
            password: hashPassword
        })

        return createUserId
    }

    async getOrCreateUser({ user }){
        const queryUser = await this.getUser({ email: user.email })

        if(queryUser){
            return queryUser
        }

        await this.createUser({ user })

        return await this.getUser({ email: user.email })
    }

    async updateUser({user}){
        
        const { id, name, email, password, actualPassword } = user
        const key = "z|8v2,.B'%CyH9%{_~='2.|+;`z>^4{N";
        const keyutf = CryptoJS.enc.Utf8.parse(key);

        var output = CryptoJS.AES.encrypt(password, keyutf, {
            mode : CryptoJS.mode.ECB
        });
        
        console.log(output.toString())

        var plaintext = CryptoJS.AES.decrypt(output.toString(), keyutf, {
            mode: CryptoJS.mode.ECB,
        })
        
        const hashPassword = await bcrypt.hashSync(password, 10)
        const userDb = await this.getUser({ email })

        if(! await bcrypt.compare(actualPassword, userDb.password)){
            return false
        }

        const updateUserId = await this.mongoDB.update(this.collection, id, {
            name,
            email,
            password: hashPassword
        })
        

        return updateUserId
    }
}

module.exports = UserService
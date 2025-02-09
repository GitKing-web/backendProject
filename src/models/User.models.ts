import { model, Schema, Document } from 'mongoose'
import { hash, compare} from 'bcrypt'

export interface UserDocument extends Document {
    username: string;
    password: string;
    email: string;
    comparePassword(password: string): Promise<Boolean>
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    try {
        this.password = await hash(this.password, 13)
        next();
    } catch (error) {
        console.log("password mod " + error );
    }
})

UserSchema.methods.comparePassword = async function(password:string) {
    return await compare(password, this.password)
}

const User = model<UserDocument>('User', UserSchema)

export default User

import mongoose from "mongoose";
mongoose.set('strictQuery', true)

export default async function connectDB() {
    try {
        const mongoURI = process.env.NODE_ENV === 'development' ? process.env.LOCAL_MONGO_URI : process.env.PUBLIC_MONGO_URI

    if(!mongoURI) throw new Error('MONGOURI NOT DEFINED')
    
    await mongoose.connect(mongoURI)
    } catch (error) {
        console.log('error connecting DB ' + error);
    }
    
}
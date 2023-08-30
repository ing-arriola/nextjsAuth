import mongoose from "mongoose";

if(!process.env.DATABASE_URL){
    throw new Error('Add DATABASE_URL in the env file');
}

const DATABASE_URL = process.env.DATABASE_URL ;

let globalWithMongoose = global as typeof globalThis & {
    mongoose:any;
}

let cached = globalWithMongoose.mongoose;

if(!cached){
    cached = globalWithMongoose.mongoose = { conn:null, promise:null };
}

async function connectDB() {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const options = {
            bufferCommands : false,
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
        cached.promise = mongoose
            .connect(DATABASE_URL,options)
            .then((mongoose)=>{
                console.log('Connection works!!')
                return mongoose;
            })
            .catch((error) => {
                console.log('Error', error as Error)
            })
    }
    cached.conn = await cached.promise;
    return cached.conn; 
}

export default connectDB;
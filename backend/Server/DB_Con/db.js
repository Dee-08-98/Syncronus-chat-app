
import mongoose from 'mongoose'

const db = async () => {
    try {
        const connectionDB = await mongoose.connect("mongodb://127.0.0.1:27017/Synchronous")
        if (connectionDB) {
            console.log("---***Database Connected Successfully***---");
        }

    } catch (error) {
        console.log('Database connection error', error);
    }


}
export default db;
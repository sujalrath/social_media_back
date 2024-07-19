import { mongoose } from "../Index.js";
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected')
    } catch (error) {
        console.log('Database error',error)
    }
}

export { dbConnection }
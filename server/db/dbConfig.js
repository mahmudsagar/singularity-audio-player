import mongoose, { connect } from 'mongoose';

export default  async ()=> {
    try{
        const url = "mongodb+srv://"+`${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD || '')}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
        await mongoose.connect(url)
        console.log('Database connected');
    }catch(err){
        console.log(err);
    }
    
}


const express =require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();
const { errorhandler } =
require('./middleware/errorMiddleware');
const authRoutes = 
require('./routes/authRoutes');
const userRoutes =
require('./routes/userRoutes');
const providerRoutes =
require('./routes/providerRoutes');
const serviceRoutes =
require('./routes/serviceRoutes');
const reviewRoutes = 
require('./routes/reviewRoutes');
const app=express();
app.use(cors());
app.use(express.json());
app.get('/api/test',(req, res) => {
    res.json({message:'Online Road Assistance API is running!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/review', reviewRoutes);
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
     console.log('Connected to MongoDB');
     app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);

     });
  })
  .catch((error)=>{
    console.error('Error connecting to MongoDB:',error);
});
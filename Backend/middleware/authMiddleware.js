const jwt=require('jsonwebtoken');
const user=require('../models/user');
const ServiceProvider=require('../models/Serviceprovider');

const protect=async(req,res,next)=>{
    let token;

    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ){
      try{
        token=req.headers.authorization.split(' ')[1];
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=await user.findById(decoded.id).select('-password');

        if(!req.user){
            req.user=await serviceProviderSchema.findById(decoded.id).select('-password');
        }

        next();

        } catch (error){
            return res.status(401).json({massage:'Not authorized, token failed'});
        }

     } else{
        return res.status(401).json({message:'Not authorized, no token'});

     }
};
module.exports={protect}
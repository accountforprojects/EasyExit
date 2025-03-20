import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, "9959425223"); 
        // console.log("Decoded Token:", token_decode);
        req.body.userId = token_decode.userId;        
        // console.log(req.body.userId);
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const adminMiddleware =async (req,res,next)=>{
    const {token} = req.headers;
    if (!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, "9959425223"); 
        // console.log("Decoded Token:", token_decode);
        req.body.userId = token_decode.userId;
        req.body.userType=token_decode.userType;
        if (req.body.userType !== "admin") {
            return res.status(403).json({ success: false, message: "Access Denied: Admins only" });
        }  
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export {authMiddleware,adminMiddleware};
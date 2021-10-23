const { getOneById } = require("../services/tripService")


function preloadOne(){
    return async (req,res,next)=>{
        try {
            const trip=await getOneById(req.params.id);
            if(trip){
                req.trip=trip;
            }
        } catch (error) {
            console.error('Database error:' + error.message);
        }
        next();
    }
}

module.exports=preloadOne;
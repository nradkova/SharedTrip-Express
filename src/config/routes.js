const homeController=require('../contollers/homeController');
const authController=require('../contollers/authController');
const tripController=require('../contollers/tripController');



const routesConfig=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
    app.use('/trips',tripController);
    app.all('*',(req,res)=>res.render('404',{title:'Not Found'}));
}
module.exports=routesConfig;
const {check,validationResult} = require ('express-validator');


exports.regiterRules=()=>
    [
        check("name","name is required").notEmpty(),
        check("lastName","last name is required").notEmpty(),
        check("email","email is required").notEmpty(),//chargée avec lettre 
        check("email","check your email").isEmail(),//obligation format email 
        check("password","password most be betwen 8 and 16 character").isLength({
            min:8,
            max:16
        })
    ]
;
exports.loginRules=()=>
    [
        
        check("email","email is required").notEmpty(),
        check("email","check your email").isEmail(),
        check("password","password is required").isLength({
            min:8,
            max:16
        })
    ];

 exports.validation = (req,res,next)=>{
   const errors = validationResult(req)
  if (!errors.isEmpty()){
      return res.status(400).send({errors:errors.array().map((el)=>({msg:el.msg}))});
  }
  next();
}
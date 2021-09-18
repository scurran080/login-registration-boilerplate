module.exports = (req,res,next) => {
    const {email, password } = req.body;

    function validEmail(userEmail){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(userEmail).toLowerCase());
    }

    //validating the register information.
    if(req.path ==="/register"){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }else if(!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
    }

    else if(req.path ==="/login"){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credentials")
        }else if(!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
    }

    next();
}
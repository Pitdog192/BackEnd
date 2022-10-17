const administrador = true; //VARIABLE ADMINISTRADOR

const sesionMiddleware = (req, res, next) => {
    administrador ? req.otorgado = true : req.otorgado = false;
    if(administrador){
        next()
    } else {
        res.json({respuesta: "no tiene permisos"})
    }
}

export default sesionMiddleware;
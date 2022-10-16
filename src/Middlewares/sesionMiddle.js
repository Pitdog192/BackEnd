const administrador = true; //VARIABLE ADMINISTRADOR

const sesionMiddleware = (req, res, next) => {
    administrador ? req.otorgado = true : req.otorgado = false;
    next()
}

export default sesionMiddleware;
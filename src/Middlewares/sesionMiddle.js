const sesionMiddleware = (req, res, next) => {
    console.log(req.headers.admin)
    if(req.headers.admin == "admin"){
        next()
    } else {
        res.json({respuesta: "no tiene permisos"})
    }
}

export default sesionMiddleware;
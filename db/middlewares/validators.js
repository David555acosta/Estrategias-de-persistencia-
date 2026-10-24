const validadorId = (paramName = "id") => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (isNaN(id)) {
            return res.status(400).json({ message: `El parámetro '${paramName}' debe ser numérico` });
        }
        next();
    };
};


const validadorExsitencia = (modelo, paramName = "id") => {
    return async (req, res, next) => {
        const id = req.params[paramName];
        const instance = await modelo.findByPk(id);

        if (!instance) {
            return res.status(404).json({
                message: `El id ${id} no existe en el modelo ${modelo.name}`
            });
        }

        next();
    };
};

module.exports = {
    validadorId,
    validadorExsitencia
};
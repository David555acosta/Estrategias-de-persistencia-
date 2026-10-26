const validadorId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id || !/^\d+$/.test(id) || Number(id) <= 0) {
      return res.status(400).json({
        message: `El campo '${paramName}' con valor '${id}' debe ser un número entero mayor a 0`,
      });
    }

    next();
  };
};

module.exports = { validadorId };

const validadorExsitencia = (modelo, paramName = "id") => {
  return async (req, res, next) => {
    const id = req.params[paramName];
    const instance = await modelo.findByPk(id);

    if (!instance) {
      return res.status(404).json({
        message: `El id ${id} no existe en el modelo ${modelo.name}`,
      });
    }

    next();
  };
};

const validadorSchema = (schema) => {
  return (req, res, next) => {
    const dataAValidar = req.body;
    const result = schema.validate(dataAValidar, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        errores: result.error.details.map((e) => {
          return { atributo: e.path[0], error: e.message };
        }),
      });
    }

    next();
  };
};

const validadorPertenencia = (
  ChildModel,
  parentParamName,
  childParamName,
  foreignKey,
) => {
  return async (req, res, next) => {
    const parentId = req.params[parentParamName];
    const childId = req.params[childParamName];

    const instance = await ChildModel.findOne({
      where: {
        id: childId,
        [foreignKey]: parentId,
      },
    });

    if (!instance) {
      return res.status(404).json({
        message: `El registro con id ${childId} no existe o no pertenece al padre especificado.`,
      });
    }

    next();
  };
};

module.exports = {
  validadorId,
  validadorExsitencia,
  validadorSchema,
  validadorPertenencia,
};

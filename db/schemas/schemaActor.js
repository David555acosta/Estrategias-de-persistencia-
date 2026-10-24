const JOI = require('joi');

const schemaActor = JOI.object({
    nombre: JOI.string().min(3).max(100).required().messages({
        'string.base': 'nombre debe ser un texto',
        'string.empty': 'nombre no puede estar vacío',
        'string.min': 'nombre debe tener como mínimo {#limit} caracteres',
        'string.max': 'nombre debe tener como máximo {#limit} caracteres',
        'any.required': 'nombre es requerido',
    }),
    fechaNacimiento: JOI.date().iso().required().messages({
        'date.base': '{#label} debe ser una fecha válida',
        'date.format': '{#label} debe tener formato YYYY-MM-DD',
        'any.required': '{#label} es requerido',
    })
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido'
});

module.exports = { schemaActor };
const JOI = require('joi');

const schemaSerie = JOI.object({
    nombre: JOI.string().min(3).max(50).required().messages({
        'string.base': 'nombre debe ser un texto',
        'string.empty': 'nombre no puede estar vacío',
        'string.min': 'nombre debe tener como mínimo {#limit} caracteres',
        'string.max': 'nombre debe tener como máximo {#limit} caracteres',
        'any.required': 'nombre es requerido',
    }),
    plataforma: JOI.string().required().messages({
        'string.base': 'plataforma debe ser un texto',
        'string.empty': 'plataforma no puede estar vacía',
        'any.required': 'plataforma es requerido',
    }),
    fechaEstreno: JOI.date().iso().required().messages({
        'date.base': '{#label} debe ser una fecha válida',
        'date.format': '{#label} debe tener formato YYYY-MM-DD',
        'date.max': '{#label} no puede ser una fecha futura',
        'any.required': '{#label} es requerido',
    }),
    disponible: JOI.boolean().optional().messages({
        'boolean.base': 'disponible debe ser un booleano',
    })
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido'
});

module.exports = { schemaSerie };
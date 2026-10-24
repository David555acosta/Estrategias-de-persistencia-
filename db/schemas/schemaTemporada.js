const JOI = require('joi');

const schemaTemporada = JOI.object({
    nombre: JOI.string().min(3).max(50).required().messages({
        'string.base': 'nombre debe ser un texto',
        'string.empty': 'nombre no puede estar vacío',
        'string.min': 'nombre debe tener como mínimo {#limit} caracteres',
        'string.max': 'nombre debe tener como máximo {#limit} caracteres',
        'any.required': 'nombre es requerido',
    }),
    numero: JOI.number().integer().min(1).required().messages({
        'number.base': 'numero debe ser un número',
        'number.integer': 'numero debe ser un número entero',
        'number.min': 'numero debe ser como mínimo {#limit}',
        'any.required': 'numero es requerido',
    }),
    disponible: JOI.boolean().optional().messages({
        'boolean.base': 'disponible debe ser un booleano',
    }),
    serieId: JOI.number().integer().required().messages({
        'number.base': 'serieId debe ser un número',
        'number.integer': 'serieId debe ser un número entero',
        'any.required': 'serieId es requerido',
    })
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido'
});

module.exports = { schemaTemporada };
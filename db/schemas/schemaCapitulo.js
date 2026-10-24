const JOI = require('joi');

const schemaCapitulo = JOI.object({
    nombre: JOI.string().min(3).max(50).required().messages({
        'string.base': 'nombre debe ser un texto',
        'string.empty': 'nombre no puede estar vacío',
        'string.min': 'nombre debe tener como mínimo {#limit} caracteres',
        'string.max': 'nombre debe tener como máximo {#limit} caracteres',
        'any.required': 'nombre es requerido',
    }),
    disponible: JOI.boolean().optional().messages({
        'boolean.base': 'disponible debe ser un booleano',
    }),
    temporadaId: JOI.number().integer().required().messages({
        'number.base': 'temporadaId debe ser un número',
        'number.integer': 'temporadaId debe ser un número entero',
        'any.required': 'temporadaId es requerido',
    })
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido'
});

module.exports = { schemaCapitulo };
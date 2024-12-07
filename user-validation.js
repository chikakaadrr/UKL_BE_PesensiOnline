const Joi = require(`joi`)
const validateUser = (request, response, next) => {
    const rules = Joi
        .object()
        .keys({
            name: Joi.string().required(),
            address: Joi.string().required(),
            contact: Joi.number().required(),
            role: Joi.string().valid(`siswa`, `karyawan`)
        })
        .options({ abortEarly: false})
    let {error} = rules.validate(request.body)
    if (error !=null) {
        let errMessage = error.details.map(it =>it.message).join(",")
        return response.status(422).json({
            success:false,
            massage:errMessage
        })
    }
    next()
}
module.exports = {validateUser}
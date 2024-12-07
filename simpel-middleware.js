
const rules = Joi
    .object()
    .keys({
        name: Joi.string().require(),
        username: Joi.string().require(),
        password: Joi.string().require(),
        nama: Joi.string().require(),
        role: Joi.string().valid(`siswa`, `karyawan`),
})
.options({abortEarly: false})

let {error} = rules.validate(request.body)
if (error != null) {
    let errMessage = error.detail.map(it => it.massage).join(",")

    return response.status(422).json({
        success: false,  
        masssage: errMassage
    })
    next()
}

module.exports = {validateUser}
let { validateuser} = reuire(`../middlewares/user-validation`)

app.post("/", [validateUser],userController.addUser)
app.post("/:id", [validateUser],userController.addUser)

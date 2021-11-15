//Brandon Shaffer

//Controls register validation rules

//constants
const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
              new RegExp(`^[a-zA-Z0-9]{8,32}$`)
            ),
            firstname: Joi.string().regex(
                new RegExp(`^[a-zA-Z]{2,32}$`)
            ),
            lastname: Joi.string().regex(
                new RegExp(`^[a-zA-Z]{2,32}$`)
            ),
            address: Joi.string().regex(
                new RegExp(`[a-zA-Z0-9\s]{2,32}$`)
            ),
            phonenum:Joi.string().regex(
                new RegExp(`^[0-9]{10,19}$`)
            )
        })

        const {error} = schema.validate(req.body)

        if(error)
        {
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                case 'password':
                    res.status(400).send({
                        error: 'The password provided failed to match the following rules:<br>A-Z, 0-9, and must be 8 characters in length not greater than 32'
                    })
                case 'firstname':
                    res.status(400).send({
                        error: 'You must provide a valid firstname'
                    })
                case 'lastname':
                        res.status(400).send({
                            error: 'You must provide a valid lastname'
                        })
                case 'address':
                    res.status(400).send({
                        error: 'You must provide a valid address'
                        })
                case 'phonenum':
                    res.status(400).send({
                        error: 'You must provide a valid phonenum'
                         })
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    }
}

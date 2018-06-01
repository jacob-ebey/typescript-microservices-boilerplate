import * as joi from 'joi'
const dotenv = require('dotenv')

export const globalConfig = () => {
  dotenv.config()

  const validation = joi.object().keys({
    PORT: joi.number().required()
  }).unknown().required().validate(process.env)

  if (validation.error) {
    throw new Error('Environment variables invalid:\n\t' + validation.error.message)
  }
}

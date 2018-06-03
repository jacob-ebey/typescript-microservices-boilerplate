import * as joi from 'joi'

export function config () {
  const validation = joi.object().keys({
    GRAPH_URL: joi.string().required(),
    GRAPH_USER: joi.string().required(),
    GRAPH_PASSWORD: joi.string().required()
  }).unknown().required().validate(process.env)

  if (validation.error) {
    throw new Error('Environment variables invalid:\n\t' + validation.error.message)
  }
}

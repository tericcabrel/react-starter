import joi from '@hapi/joi';

class SocketTask {
	 static validateWithDefaultSchema(data: any, joiSchema: joi.ObjectSchema): joi.ValidationResult<joi.ObjectSchema> {
	 	const finalSchema: joi.ObjectSchema = joiSchema.keys({
			rqid: joi.string().required(),
		});

		return joi.validate(data, finalSchema);
	}

	 static validateWithoutDefaultSchema(data: any, joiSchema: joi.Schema): joi.ValidationResult<joi.ObjectSchema> {
		return joi.validate(data, joiSchema);
	}
}

export { SocketTask };

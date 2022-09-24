import joi from 'joi';

class SocketTask {
	 static validateWithDefaultSchema(data: any, joiSchema: joi.ObjectSchema): joi.ValidationResult {
	 	const finalSchema: joi.ObjectSchema = joiSchema.keys({
			rqid: joi.string().required(),
		});

		return finalSchema.validate(data);
	}

	 static validateWithoutDefaultSchema(data: any, joiSchema: joi.Schema): joi.ValidationResult {
		return joiSchema.validate(data);
	}
}

export { SocketTask };

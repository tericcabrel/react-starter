import lodash from 'lodash';

class Transformer {
	data: any;
	properties: any = {};

	constructor(data: any, properties: any) {
		this.data = data;
		this.properties = properties;
	}

	transformItem(item: any): any {
		if (!item) {
			return null;
		}

		const itemData: any = lodash.pick(item, this.properties);

		return { ...itemData };
	}

	async transform(): Promise<any> {
		if (this.data === undefined || this.data === null) {
			return null;
		}

		if (!Array.isArray(this.data)) {
			return this.transformItem(this.data);
		}

		const length: number = this.data.length;
		const result: any[] = [];

		for (let i: number = 0; i < length; i += 1) {
			result.push(this.transformItem(this.data[i]));
		}

		return result;
	}
}

export { Transformer };

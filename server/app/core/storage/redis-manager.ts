import {createClient, RedisClientType} from 'redis';

import { REDIS_HOST, REDIS_PORT } from '../config';

class RedisManager {
	private static client: RedisClientType;

	public static async init() {
		if (!RedisManager.client) {
			RedisManager.client = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });

			await RedisManager.client.connect();
		}
	}

	public static get(key: string): Promise<string|null> {
		return RedisManager.client.get(key);
	}

	public static async set(key: string, value: string, expire: number = -1): Promise<string | null> {
		if (expire > 0) {
			return await RedisManager.setWithExpire(key, value, expire);
		}

		return await RedisManager.setWithoutExpire(key, value);
	}

	private static setWithExpire(key: string, value: string, expire: number): Promise<string> {
		return  RedisManager.client.setEx(key, expire, value);
	}

	private static setWithoutExpire(key: string, value: string): Promise<string | null> {
		return RedisManager.client.set(key, value);
	}

	public static delete(key: string): Promise<number> {
		return RedisManager.client.del(key);
	}

	public static keys(pattern: string): Promise<string[]> {
		return RedisManager.client.keys(pattern);
	}

	public static getValues(keys: string[]): Promise<Array<string | null>> {
		return RedisManager.client.mGet(keys);
	}
}

export { RedisManager };

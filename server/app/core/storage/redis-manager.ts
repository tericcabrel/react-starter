import redis, { RedisClient } from 'redis';

import * as config from '../config';

class RedisManager {
	private static client: RedisClient;

	public static getInstance(): RedisClient {
		if (!RedisManager.client) {
			RedisManager.client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
		}

		return RedisManager.client;
	}

	public static get(key: string): Promise<string|null> {
		return new Promise<string|null>((resolve: any, reject: any): void => {
			RedisManager.getInstance().get(key, (error: Error|null, result: string) => {
				if (error) {
					reject(error);
				}
				resolve(result ? result : null);
			});
		});
	}

	public static async set(key: string, value: string, expire: number = -1): Promise<boolean> {
		if (expire > 0) {
			return await RedisManager.setWithExpire(key, value, expire);
		}

		return await RedisManager.setWithoutExpire(key, value);
	}

	private static setWithExpire(key: string, value: string, expire: number): Promise<boolean> {
		return new Promise((resolve: any, reject: any): any => {
			RedisManager.getInstance().setex(key, expire, value, (error: Error|null) => {
				if (error) {
					reject(error);
				}
				resolve(true);
			});
		});
	}

	private static setWithoutExpire(key: string, value: string): Promise<boolean> {
		return new Promise((resolve: any, reject: any): any => {
			RedisManager.getInstance().set(key, value, (error: Error|null) => {
				if (error) {
					reject(error);
				}
				resolve(true);
			});
		});
	}

	public static delete(key: string): Promise<boolean> {
		return new Promise((resolve: any, reject: any): any => {
			RedisManager.getInstance().del(key, (error: Error|null) => {
				if (error) {
					reject(error);
				}
				resolve(true);
			});
		});
	}

	public static keys(pattern: string): Promise<string[]> {
		return new Promise((resolve: any, reject: any): any => {
			RedisManager.getInstance().keys(pattern, (error: Error|null, result: string[]) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	}

	public static getValues(keys: string[]): Promise<string[]> {
		return new Promise((resolve: any, reject: any): any => {
			RedisManager.getInstance().mget(keys, (error: Error|null, result: string[]) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	}
}

export { RedisManager };

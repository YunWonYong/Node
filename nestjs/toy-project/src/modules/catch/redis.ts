import { createClient, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from "@redis/client";

const url = "redis://localhost:6379";
abstract class RedisManager {
    public static getInstance(): Promise<RedisVo> {
        const redis = createClient({
            url
        });
        return new Promise((resolve, reject) => {
            redis
            .connect()
            .then(() => {
                resolve(new RedisVo(redis));
            })
            .catch(reject); 
        });

    }
}

class RedisVo {
    private readonly redis;
    constructor(redis: RedisClientType<RedisModules, RedisFunctions, RedisScripts>) {
        this.redis = redis;
    }

    public async get(key: string): Promise<string | null> {
        try {
            const getResult = await this.redis.get(key);
            console.log(getResult);
            return getResult;
        } catch(e) {
            throw e;
        }
    }

    public async close(): Promise<boolean> {
        try {       
            await this.redis.disconnect();
            return true;
        } catch(e) {
            throw e;
        }
    }
}

export {
    RedisManager,
    RedisVo
};

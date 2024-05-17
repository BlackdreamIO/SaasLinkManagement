import { UPSTASH } from '@/utils/envExporter';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: UPSTASH.UPSTASH_REDIS_REST_TOKEN as string,
    token: UPSTASH.UPSTASH_REDIS_REST_TOKEN as string,
})

export default redis;
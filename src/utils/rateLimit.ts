import { Ratelimit } from '@upstash/ratelimit';
import redis from '@/database/redis';

const ratelimit = new Ratelimit({
    redis : redis,
    limiter : Ratelimit.fixedWindow(1, '1 m')
})

export default ratelimit;
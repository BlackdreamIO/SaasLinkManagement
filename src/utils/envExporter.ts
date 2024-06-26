const GOOGLE_OAUTH = {
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET : process.env.GOOGLE_SECRET
}
const GOOGLE_ADSENSE = {
    GOOGLE_ADSENSE_PUBLISHER_ID : process.env.GOOGLE_ADSENSE_PUBLISHER_ID,
    GOOGLE_ADSENSE_CUSTOMER_ID : process.env.GOOGLE_ADSENSE_CUSTOMER_ID,
    GOOGLE_SAFE_BROWSING_API : process.env.GOOGLE_SAFE_BROWSING_API
}
const FIREBASE = {
    FIREBASE_API : process.env.FIREBASE_API,
    FIREBASE_AUTH_DOMAIN : process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID : process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET : process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID : process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID : process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID : process.env.FIREBASE_MEASUREMENT_ID
}
const NEXT_AUTH = {
        NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET
    }
const UPSTASH = {
    UPSTASH_REDIS_REST_URL : process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN : process.env.UPSTASH_REDIS_REST_TOKEN
}

export { GOOGLE_OAUTH, GOOGLE_ADSENSE, FIREBASE, NEXT_AUTH, UPSTASH };
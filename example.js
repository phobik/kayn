import {
    Kayn,
    REGIONS,
    METHOD_NAMES,
    BasicJSCache,
    LRUCache,
    RedisCache,
} from './'

/*
const redisCache = new RedisCache({
    host: 'localhost',
    port: 5000,
    keyPrefix: 'kayn',
});
*/

const myCache = new LRUCache({ max: 5 })

const kayn = Kayn()({
    region: 'na',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
    },
    cacheOptions: {
        cache: myCache,
        ttls: {},
        timeToLives: {
            useDefault: true,
            byGroup: {
                DDRAGON: 10000,
            },
            byMethod: {
                [METHOD_NAMES.DDRAGON.RUNES_REFORGED_LIST]: 5000,
                [METHOD_NAMES.CHAMPION.GET_CHAMPION_ROTATIONS]: 5000,
            },
        },
    },
})

import test from './examples/async.await/helper-for-updating-summoner-to-v4'

const main = async () => {
    const contractz = await kayn.SummonerV4.by.name('Contractz')
    const contractz2 = await kayn.SummonerV4.by.puuid(contractz.puuid)
    const contractz3 = await kayn.SummonerV4.by.accountID(contractz2.accountId)
    const contractz4 = await kayn.SummonerV4.by.id(contractz3.id)
    console.log(contractz4)
    const challengers = await kayn.ChallengerV4.list('RANKED_SOLO_5x5')
    console.log(challengers)
}

main()

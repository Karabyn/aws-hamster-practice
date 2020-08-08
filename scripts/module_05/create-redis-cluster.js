// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: 'us-east-2'})

// TODO: Create an elasticache object
const ec = new AWS.ElastiCache()

helpers.createSecurityGroup('hamster_redis_sg', 6379)
.then(sgId => createRedisCluster('hamster', sgId))
.then(data => console.log(data))

function createRedisCluster (clusterName, sgId) {
  // TODO: Create params object
  const params = {
    CacheClusterId: clusterName,
    CacheNodeType: 'cache.t2.micro',
    Engine: 'redis',
    NumCacheNodes: 1,
    SecurityGroupIds: [sgId]
  }

  return new Promise((resolve, reject) => {
    // TODO: Create cache cluster
    ec.createCacheCluster(params, ((err, data) => err ? reject(err) : resolve(data)))
  })
}

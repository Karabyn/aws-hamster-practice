const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-2'})

const client = new AWS.DynamoDB.DocumentClient()

function getAll (tableName) {
  const params = {
    TableName: tableName
  }
  // TODO: Declare params for scan

  return new Promise((resolve, reject) => {
    client.scan(params, ((err, data) => {
      if (err) reject(err)
      else resolve(data.Items)
    }))
    // TODO: Scan table and return
  })
}

function get (tableName, id) {
  // TODO: Declare params for query
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': +id
    }
  }

  return new Promise((resolve, reject) => {
    client.query(params, ((err, data) => err ? reject(err) : resolve(data.Items[0])))
    // TODO: Query table and return
  })
}

function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  return new Promise((resolve, reject) => {
    client.put(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  get,
  getAll,
  put
}

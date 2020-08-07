// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: 'us-east-2'})

// Declare local variables
const s3 = new AWS.S3()
const bucketName = 'hamster-bucket-petro-k'

helpers.getPublicFiles()
.then(files => uploadS3Objects(bucketName, files))
.then(data => console.log(data))

function uploadS3Objects (bucketName, files) {
  // TODO: Define putObject params object
  const params = {
    Bucket: bucketName,
    ACL: 'public-read'
  }

  const filePromises = files.map((file) => {
    const newParams = Object.assign({}, params, {
      // TODO: Add individual file params
      Body: file.contents,
      Key: file.name,
      ContentType: helpers.getContentType(file.name)
    })

    return new Promise((resolve, reject) => {
      // TODO: Put objects in S3
      s3.putObject(newParams, ((err, data) => err ? reject(err) : resolve(data)))
    })
  })

  return Promise.all(filePromises)
}


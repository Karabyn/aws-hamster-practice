// Imports
// TODO: Import the aws-sdk
const AWS = require('aws-sdk')

// TODO: Configure region
AWS.config.update({region: 'us-east-2'})

// Declare local variables
// TODO: Create an ec2 object
const ec2 = new AWS.EC2()

createImage('i-047f6b3a3d5421bb8', 'hamsterImage')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  // TODO: Implement AMI creation
    const params = {
        InstanceId: seedInstanceId,
        Name: imageName
    }

    return new Promise(((resolve, reject) => {
        ec2.createImage(params, (err, data) => err ? reject(err) : resolve(data))
    }))
}

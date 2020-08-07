// Imports

const AWS = require('aws-sdk')
// TODO: Configure region
AWS.config.update({region: 'us-east-2'})

// Declare local variables
// TODO: Create an ec2 object
const ec2 = new AWS.EC2()

function listInstances () {
  // TODO: List instances using ec2.describeInstances()
  return new Promise(((resolve, reject) => {
      ec2.describeInstances({}, (err, data) => {
          if(err) reject(err)
          else {
              resolve(data.Reservations.reduce((i, r) => {
                  return i.concat(r.Instances)
              }, []))
          }
      })
  }))
}

function terminateInstance (instanceId) {
  // TODO: Terminate an instance with a given instanceId
    const params = {
        InstanceIds: [
            instanceId
        ]
    }
    return new Promise((resolve, reject) => {
        ec2.terminateInstances(params, (err, data) =>
            err ? reject(err) : resolve(data)
        )
    })
}

listInstances()
.then(data => console.log(data))
// terminateInstance('i-047f6b3a3d5421bb8')
// .then(data => console.log(data))

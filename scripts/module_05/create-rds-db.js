// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-2'})

const ec2 = new AWS.EC2()
// TODO: Create an rds object
const rds = new AWS.RDS()
const dbName = 'user'

createSecurityGroup(dbName)
.then(sgId => createDatabase(dbName, sgId))
.then(data => console.log(data))

function createDatabase (dbName, sgId) {
  const params = {
    AllocatedStorage: 5,
    DBInstanceClass: 'db.t2.micro',
    DBInstanceIdentifier: dbName,
    Engine: 'mysql',
    DBName: dbName,
    VpcSecurityGroupIds: [ sgId ],
    MasterUsername: 'admin',
    MasterUserPassword: 'mypassword'
  }
  // TODO: Create the params object

  return new Promise((resolve, reject) => {
    rds.createDBInstance(params, ((err, data) => err ? reject(err) : resolve(data)))
    // TODO: Create the db instance
  })
}

function createSecurityGroup (dbName) {
  const params = {
    Description: `security group for ${dbName}`,
    GroupName: `${dbName}-db-sg`
  }

  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
      if (err) reject(err)
      else {
        const sgGroupId = data.GroupId
        const params = {
          GroupId: sgGroupId,
          IpPermissions: [
            {
              IpProtocol: 'tcp',
              FromPort: 3306, //mysql
              ToPort: 3306,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            }
          ]
        }
        ec2.authorizeSecurityGroupIngress(params, (err, data) => {
          if (err) reject(err)
          else resolve(sgGroupId)
        })
      }
    })
  })
}

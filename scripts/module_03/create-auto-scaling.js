// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-2'})

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
const tgArn = 'arn:aws:elasticloadbalancing:us-east-2:766308168148:targetgroup/hamsterTG/0c7f4a7bce3e2110'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then((data) => console.log(data))

function createAutoScalingGroup (asgName, lcName) {
  // TODO: Create an auto scaling group
    const params = {
        AutoScalingGroupName: asgName,
        AvailabilityZones: ['us-east-2a', 'us-east-2b'],
        TargetGroupARNs: [tgArn],
        LaunchConfigurationName: lcName,
        MaxSize: 2,
        MinSize: 1
    }

    return new Promise((resolve, reject) => {
        autoScaling.createAutoScalingGroup(params, (err, data) =>
            err ? reject(err) : resolve(data))
    })
}

function createASGPolicy (asgName, policyName) {
  // TODO: Create an auto scaling group policy
    const params = {
        AdjustmentType: 'ChangeInCapacity',
        AutoScalingGroupName: asgName,
        PolicyName: policyName,
        PolicyType: 'TargetTrackingScaling',
        TargetTrackingConfiguration: {
            TargetValue: 25,
            PredefinedMetricSpecification: {
                PredefinedMetricType: 'ASGAverageCPUUtilization'
            }
        }
    }

    return new Promise(((resolve, reject) => {
        autoScaling.putScalingPolicy(params, ((err, data) =>
            err ? reject(err) : resolve(data)))
    }))
}

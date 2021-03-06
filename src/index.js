// Load AWS SDK and create a new SQS object
const AWS = require("aws-sdk");
const sqs = new AWS.SQS();
const queueUrl = process.env.QUEUE_URL; // supplied by Function service-discovery wire
const queueName = process.env.QUEUE_NAME;
const queueArn = process.env.QUEUE_ARN;

exports.handler = async message => {
  console.log("Queue Name: ", queueName);
  console.log("Queue ARN ", queueArn);
  console.log("Queue URL", queueUrl);

  // Construct parameters for the sendMessage call
  const params = {
    MessageBody: 'While interacting with actual deployed resources!',
    QueueUrl: queueUrl
  };

  try {
    await sqs.sendMessage(params).promise();
  } catch (err) {
    console.log(err);
  }


  return 'Job sent to queue: ' + queueName;
}
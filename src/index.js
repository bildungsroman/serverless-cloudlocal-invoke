// Load AWS SDK and create a new Dynamodb object
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME; // supplied by Function service-discovery wire

exports.handler = async () => {
  console.log("Table Name: ", tableName);

  // Construct parameters for the table
  const params = {
    TableName: tableName,
    Item: {
      id: `item-1`,
      content: `Some content`
    },
    ConditionExpression: 'attribute_not_exists(id)', // do not overwrite existing entries
    ReturnConsumedCapacity: 'TOTAL'
  };

  try {
    await dynamodb.put(params).promise();
    console.log(`Writing item to table ${tableName}`);
  } catch (err) {
    console.log(err);
  }

  return 'Done!';
}
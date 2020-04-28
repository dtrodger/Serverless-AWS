import handler from "../http";
import dynamoDb from "../dynamodb";

export const main = handler(async (event, context) => {
  const result = await dynamoDb.query({
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  });

  return result.Items;
});
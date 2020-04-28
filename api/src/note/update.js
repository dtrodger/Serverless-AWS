import handler from "../http";
import dynamoDb from "../dynamodb";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  await dynamoDb.update({
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    ReturnValues: "ALL_NEW"
  });

  return { status: true };
});
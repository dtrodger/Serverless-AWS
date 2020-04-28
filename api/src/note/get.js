import handler from "../http";
import dynamoDb from "../dynamodb";

export const main = handler(async (event, context) => {
  const result = await dynamoDb.get({
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  });
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});
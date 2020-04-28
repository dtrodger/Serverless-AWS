import handler from "../http";
import dynamoDb from "../dynamodb";

export const main = handler(async (event, context) => {
  await dynamoDb.delete({
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  });

  return { status: true };
});
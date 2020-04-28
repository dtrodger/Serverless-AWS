import * as uuid from "uuid";
import handler from "../http";
import dynamoDb from "../dynamodb";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  await dynamoDb.put({
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  });

  return params.Item;
});
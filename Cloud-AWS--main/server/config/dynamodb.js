import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS
AWS.config.update({
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Table name for posts
const TABLE_NAME = 'Posts';

// Create table if it doesn't exist
const createTable = async () => {
    const dynamodb = new AWS.DynamoDB();
    
    const params = {
        TableName: TABLE_NAME,
        KeySchema: [
            { AttributeName: '_id', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: '_id', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    try {
        await dynamodb.createTable(params).promise();
        console.log(`Created table ${TABLE_NAME}`);
    } catch (error) {
        if (error.code === 'ResourceInUseException') {
            console.log(`Table ${TABLE_NAME} already exists`);
        } else {
            console.error('Error creating table:', error);
            throw error;
        }
    }
};

export { dynamoDB, TABLE_NAME, createTable };
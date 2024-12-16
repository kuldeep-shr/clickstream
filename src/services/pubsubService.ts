import { PubSub } from "@google-cloud/pubsub";

const keyFilename = process.env.PUB_SUB_FILE_PATH;

const pubSubClient = new PubSub({
  keyFilename,
});

// Define message interface
interface ClickstreamEvent {
  button: string;
  timestamp?: string;
  userIp: string;
}

// Publish a message
export async function publishMessage(userIp: string, button: string) {
  const timestamp = Date.now();
  const topicName: any = process.env.PUB_SUB_TOPIC;
  const topic = pubSubClient.topic(topicName);

  try {
    const messageData = Buffer.from(
      JSON.stringify({ timestamp: timestamp, userIp: userIp, button: button })
    );
    const messageId = await topic.publish(messageData);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
}

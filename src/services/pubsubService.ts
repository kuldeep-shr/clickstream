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
  const topicName = process.env.PUB_SUB_TOPIC;
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

// Subscribe to a topic
// export async function subscribeToTopic() {
// const subscriptionName = process.env.PUB_SUB_SUBCRIPTION;
//   const topicName = process.env.PUB_SUB_TOPIC;

//   const subscription = pubSubClient.subscription(subscriptionName);

//   // Create the subscription if it doesn't exist
//   await subscription.create({ topic: topicName });

//   const messageHandler = async (message: any) => {
//     const event: ClickstreamEvent = JSON.parse(message.data.toString());
//     console.log(
//       `Received message ${message.id}: Timestamp: ${event.timestamp}, User IP: ${event.userIp},button:${event.button}`
//     );
//     message.ack(); // Acknowledge the message
//   };

//   subscription.on("message", messageHandler);
// }

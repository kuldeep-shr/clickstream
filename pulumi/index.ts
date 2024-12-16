import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

// Load environment variables for credentials and project info
const config = new pulumi.Config();
const project = config.require("project");
const region = config.require("region");
const cloudRunImage = config.require("cloudRunImage");
const pubsubTopicName = config.require("pubsubTopicName");

// Initialize the Google Cloud provider with environment variables
const provider = new gcp.Provider("gcp", {
  project: project,
  region: region,
});

// Create Pub/Sub topic
const pubsubTopic = new gcp.pubsub.Topic(pubsubTopicName, {}, { provider });

// Create Cloud Run service
const cloudRunService = new gcp.cloudrun.Service(
  "my-cloud-run-service",
  {
    location: region,
    template: {
      spec: {
        containers: [
          {
            image: cloudRunImage,
          },
        ],
      },
    },
  },
  { provider }
);

// Assign IAM role to Cloud Run service to publish to Pub/Sub
const cloudRunIamMember = new gcp.cloudrun.IamMember(
  "cloudrun-pubsub-publisher",
  {
    service: cloudRunService.name,
    location: region,
    role: "roles/pubsub.publisher",
    member: pulumi.interpolate`serviceAccount:${cloudRunService.name}@${provider.project}.iam.gserviceaccount.com`,
  },
  { provider }
);

export const cloudRunUrl = cloudRunService.statuses.apply(
  (status: any) => status[0].url
);
export const pubsubTopicUrl = pubsubTopic.id;

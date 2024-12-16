# ClickStream

This is an Express.js application that implements rate limiting for button clicks (Blue and Red buttons) using Redis. It uses a Redis client to track user IP addresses and limits the number of clicks a user can make within a 1-minute window.

## Features

- Rate limiting for two buttons (Blue and Red).
- Stores the click count in Redis.
- Responds with a 429 status code (Too Many Requests) when the user exceeds the rate limit.
- Static file server to serve an HTML file for the user interface.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Node.js download](https://nodejs.org/)
- **Redis** - [Redis download](https://redis.io/download)

## 📝 Deployment Instructions

### 1. **Set Up Google Cloud Platform (GCP)**

- **Enable APIs** for:
  - Google Cloud Run
  - Google Cloud Pub/Sub
- **Create a GCP project** and configure service account credentials:
  ```bash
  gcloud auth login
  gcloud config set project <your-project-id>
  ```
- **Install Google Cloud SDK** (`gcloud`) if not already installed:
  [Installation Guide](https://cloud.google.com/sdk/docs/install)

### 2. **Set Up Pulumi for Infrastructure Deployment**

- Install Pulumi CLI globally:
  ```bash
  npm install -g pulumi
  ```
- Initialize Pulumi stack:
  ```bash
  pulumi new gcp-typescript
  ```
- Configure Pulumi with your GCP credentials:
  ```bash
  pulumi config set gcp:project <your-project-id>
  pulumi config set gcp:region <your-region>
  ```

### 3. **Deploy Application using Pulumi**

- After setting up your infrastructure in Pulumi (e.g., Cloud Run, Pub/Sub topics), deploy it with:
  ```bash
  pulumi up
  ```
- This command provisions the necessary GCP resources and deploys the Express app on **Google Cloud Run**.

---

## 🖥️ Steps for Setting Up Locally

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>

   ```

2. Navigate to the project directory:

   ```bash
       cd clickstream

   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Make Build

   ```
   npm run build
   ```

5. Start the server
   ```
   npm start
   ```

<br />

## 💻 Important Considerations

ARM Architecture 🚀
If you're working with ARM architecture (e.g., Apple M1), it's important to note that Docker may not fully support ARM-based builds. Instead, use gbuild for building your application.

Why gbuild: ARM architecture (especially on Apple Silicon) can have compatibility issues with Docker images that are built for x86 architecture. gbuild is optimized for ARM and should be used instead of Docker for building your application.

Set credentials.json type file to your project. The file you got from Google Cloud

### how to build

```
gbuild build

```

## Environment Variable Structure

- PUBSUB_TOPIC: {your-pubsub-topic-name}
- PORT=8000

## 💡 Explanation of the Tech Stack and How It Works

- Node.js & Express: The backend of the application is built using Node.js with the Express framework. It provides an API to handle click events, process data, and trigger notifications.

- Memory: Instead of using Firestore or any external database, the application stores clickstream data in memory. This means data is transient and only persists during the app's runtime. This simplifies the setup for quick testing and small-scale projects.

- Google Cloud Pub/Sub: This is used to notify other services or systems when a button is clicked. When a click event occurs, a message is published to a Pub/Sub topic, which can trigger downstream actions like notifications, logging, or further processing.

- Google Cloud Run: Cloud Run is a serverless platform for deploying and managing containers. It handles auto-scaling and ensures your application is always available, without the need to manage servers.

- Pulumi: This Infrastructure as Code (IaC) tool is used to define and deploy cloud resources. Pulumi enables you to automate the provisioning of services like Cloud Run, Pub/Sub, and more in a repeatable and scalable way.

<br />

🚀 Now you're all set to deploy and run the project!

<br />

❓ Need Help?

If you have any queries or issues, feel free to contact us at:<br>

**Email:** kuldeepsharma8988@gmail.com.com

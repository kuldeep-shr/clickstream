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

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kuldeep-shr/clickstream.git

   ```

2. Navigate to the project directory:

   ```bash
       cd clickstream

   ```

3. Install the dependencies:
   ```
   npm install
   ```

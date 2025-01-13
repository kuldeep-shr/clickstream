interface ClickData {
  count: number;
  lastClicked: number;
  timestamps?: string[]; // Optional array of timestamps
}

const clickDataStore: Record<string, ClickData> = {};

// Function to check if the rate limit is exceeded
export const checkRateLimit = (button: string, userIp: string): boolean => {
  const key = `${button}:${userIp}`;
  const currentTime = Date.now();
  const userData = clickDataStore[key] || {
    count: 0,
    lastClicked: currentTime,
  };

  // Check if the last click was more than 60 seconds ago and reset the count
  if (currentTime - userData.lastClicked > 60000) {
    userData.count = 0; // Reset click count after 1 minute
  }

  // Update click data
  userData.count += 1;
  userData.lastClicked = currentTime;
  clickDataStore[key] = userData;

  // Return true if the user has clicked more than 10 times
  return userData.count > 10;
};

// Function to log the click
export const logClick = (button: string, userIp: string): void => {
  const key = `${button}:${userIp}:log`;
  const timestamp = new Date().toISOString();

  // Initialize the timestamps array if it doesn't exist
  if (!clickDataStore[key]) {
    clickDataStore[key] = { count: 0, lastClicked: 0, timestamps: [] };
  }

  // Store the timestamp of the click
  clickDataStore[key].timestamps?.push(timestamp);
};

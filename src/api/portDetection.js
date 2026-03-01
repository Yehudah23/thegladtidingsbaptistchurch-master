/**
 * Auto-detect backend server port
 * Tries ports 8001, 8000, 8002, 8003, 8004, 8005 in sequence
 */

const PORTS_TO_TRY = [8001, 8000, 8002, 8003, 8004, 8005];
const TIMEOUT = 2000; // 2 second timeout per port

export async function detectBackendPort() {
  // Check if custom port is set via environment variable
  if (process.env.VUE_APP_API_PORT) {
    return parseInt(process.env.VUE_APP_API_PORT);
  }

  // Try each port
  for (const port of PORTS_TO_TRY) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/health`, {
        method: 'GET',
        timeout: TIMEOUT
      });
      
      if (response.ok) {
        console.log(`✓ Backend found on port ${port}`);
        return port;
      }
    } catch (error) {
      // Port not available, try next one
      continue;
    }
  }

  // Default to 8000 if none respond
  console.warn('⚠ Could not detect backend port. Defaulting to 8000');
  return 8000;
}

export async function getBackendUrl() {
  const port = await detectBackendPort();
  return `http://127.0.0.1:${port}`;
}

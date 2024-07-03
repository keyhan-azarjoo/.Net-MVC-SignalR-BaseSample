# SignalR Implementation Example

This repository demonstrates the implementation of a basic SignalR setup to enable real-time web functionality. It covers both the client-side and server-side aspects.

## Client-Side Implementation

### JavaScript Files

1. **`deathlyHallows.js`**: Manages the connection and communication for the "Deathly Hallows" feature.
2. **`usersCount.js`**: Handles the connection and communication for tracking the number of connected users and total views.

### Key Steps

1. **Establishing a Connection**:
   - Create a connection between the client (browser) and the server using SignalR.
2. **Receiving Notifications**:
   - Listen for messages from the server and update the client’s user interface in real-time.
3. **Sending Notifications**:
   - Send messages to the server to notify it of client actions.
4. **Starting the Connection**:
   - Start the connection and handle the success or failure of the connection attempt.

## Server-Side Implementation

### C# Files

1. **`DeathlyHallowsHub.cs`**: Handles communication for the "Deathly Hallows" feature.
2. **`UserHub.cs`**: Manages user connections and total views.
3. **`HomeController.cs`**: Contains the action method `DeathlyHallows` which increments the count for a type and sends updates to clients.
4. **`SD.cs`**: Static class to hold shared data like the counts for different types of "Deathly Hallows."

### Key Steps

1. **Defining Hubs**:
   - Hubs are defined on the server to handle communication between the client and the server.
2. **Handling Connections**:
   - Manage client connections, tracking the number of connected users and updating clients accordingly.
3. **Sending Updates**:
   - Send updates to all connected clients or specific clients as the server state changes.
4. **Handling Client Messages**:
   - Handle messages from clients and process actions, potentially notifying other clients.

## Configuration

### Razor Pages

1. **`Index.cshtml`**: The main page that includes the necessary JavaScript files and provides the HTML structure for displaying counts.

### Program Setup

1. **`Program.cs`**: Configures services and sets up SignalR hubs in the ASP.NET Core application.

## Detailed Breakdown

### JavaScript Files

- **`deathlyHallows.js`**
  - Establishes a connection to `DeathlyHallowsHub`.
  - Listens for updates from the server to update the counts of "Deathly Hallows."
  - Starts the connection and handles success or failure.

- **`usersCount.js`**
  - Establishes a connection to `UserHub`.
  - Listens for updates from the server to update total views and user counts.
  - Sends notifications to the server when a new window is loaded.
  - Starts the connection and handles success or failure.

### C# Files

- **`DeathlyHallowsHub.cs`**
  - Contains methods for clients to get the race status.
  - Sends updates to all connected clients.

- **`UserHub.cs`**
  - Manages total views and user connections.
  - Sends updates when users connect or disconnect.
  - Provides methods for clients to send notifications to the server.

- **`HomeController.cs`**
  - Contains the `DeathlyHallows` action method.
  - Increments the count for the specified type and sends updates to clients.

- **`SD.cs`**
  - Static class holding the counts for "Deathly Hallows" types.
  - Initialized with default counts.

### Razor Pages

- **`Index.cshtml`**
  - HTML structure for displaying counts.
  - Includes references to SignalR and custom JavaScript files.

### Program Setup

- **`Program.cs`**
  - Configures SignalR services.
  - Maps the hubs to specific endpoints (`/hubs/userCount` and `/hubs/deathlyhallows`).
  - Sets up the ASP.NET Core application pipeline.

## Additional Resources

For a detailed step-by-step guide, refer to the [training video](https://www.youtube.com/watch?v=pl0OobPmWTk) which covers the implementation process.

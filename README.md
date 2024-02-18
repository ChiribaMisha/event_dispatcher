**Application Name**: Event Dispatcher

**Version**: 1.0.0

**Introduction**:
Event Dispatcher is an application for sending events to various destinations using specified transport protocols. The application provides an API for creating destinations, sending events, and authenticating users.

**Environment Requirements**:

1. Installed Node.js version 16 and above.
2. Installed Docker.

**Startup**:
To launch the application, follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t event_dispatcher .
   ```

2. Run the Docker container:
   ```bash
   docker run -dp 127.0.0.1:3000:3000 event_dispatcher
   ```

**Routes**:

1. **Destinations (/destinations)**:

   - **POST /create** - Create a destination.

     **Request Body**:

     ```json
     {
       "name": "destination1",
       "url": "https://example.com/destination1",
       "transport": "http.post"
     }
     ```

     **Required Fields**:

     - name
     - transport
     - url (if transport contains "http")

     **Response**:

     ```json
     {
       "description": "string"
     }
     ```

2. **Events**:

   - **POST /event** - Send an event.

     **Request Body**:

     ```json
     {
         "payload": {"a":1, "b":2, //...more},
         "possibleDestinations": [
             {
                 "destination1": true,
                 "destination2": true,
                 "destination3": true
             },
            //...more
         ],
         "strategy": "ALL" // "ALL" | "ANY" | "function(possibleDestinations) { return true; }"
     }
     ```

     **Required Fields**:

     - payload
     - possibleDestinations

     **Response**:

     ```json
     {
       "destination1": true,
       "destination2": true,
       "destination3": true
       //...more
     }
     ```

3. **Auth (/auth)**:

   - **POST /login** - Obtain a JWT token.

     **Response**:

     ```json
     {
       "token": "string"
     }
     ```

**Notes**:

- Authentication via obtaining a JWT token is required to access protected API routes.
- The application supports event sending strategies to destinations: "ALL" (all destinations must be successfully delivered), "ANY" (at least one destination must be successfully delivered), and custom functions for defining the strategy.

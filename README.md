# Singularity Audio Player

## Overview

Singularity Audio Player is a modern audio player project that allows users to manage and play audio files. The project consists of a server and a client component, leveraging technologies such as Node.js, Express, MongoDB, and React.

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.17.6 or later)
- [npm](https://www.npmjs.com/) (v6.14.15 or later)
- [MongoDB](https://www.mongodb.com/) (Make sure you have a MongoDB Atlas account or a local MongoDB server)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mahmudsagar/singularity-audio-player.git
   ```
   
2. Navigate to the project directory:
  
  ```bash
  cd singularity-audio-player
```

4. Install dependencies and start both the server and client:

     ```bash
        npm run setup
     ```

5. Create a `.env` file in the project server folder and add the following MongoDB connection details:
   ```bash
        DB_USER=mongo_user
        DB_PASSWORD=mongo_password
        DB_HOST=mongo_host
        DB_NAME=db_collection
      ```

6. Create a `.env` file in the project client folder and add the following MongoDB connection details:
   ```bash
        VITE_SERVER_URL=http://localhost:8135
      ```

7. Start the server:
  ```bash
    npm run server
```
This will launch the server at `http://localhost:8135`.

8. Open a new terminal window, navigate to the client directory, and start the client:
  ```bash
    npm run client
  ```
This will launch the client at `http://localhost:5173`.

## Usage

Once the server and client are running, open your web browser and visit `http://localhost:5173` to access the Singularity Audio Player interface.

The client communicates with the server hosted at `http://localhost:8135` by default. If you want to deploy the application, make sure to update the `VITE_SERVER_URL` variable in the client's `.env` file accordingly.

Feel free to explore the features of the Singularity Audio Player, manage your audio collection, and enjoy seamless audio playback.

## License

This project is licensed under the ISC License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## Author

- Mahmudul Hasan Sagar


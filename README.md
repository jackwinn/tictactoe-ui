1. Setup and installation instructions:
- clone the Github repository to your desired folder
- open the project in your preferred code editor
- ensure you are using node version is 20.18.0 or above
- ensure you are using npm package manager
- in the terminal, run the command: npm i to install dependencies
- in the terminal, run the command: npm run start:local to start the server

2. Technologies used:
- react.js. Frontend library for building user interfaces
- react DOM. Package for DOM-specific methods for React
- react router DOM. Client-side routing for React applications
- react scripts. Configuration and scripts for Create React App
- axios. Promise-based HTTP client for API requests
- socket.IO client. Enables real-time communication between client and server
- JWT decode. Utility to decode JSON Web Tokens
- env-cmd. Loads environment variables from a file into process.env

3. Include deployment instructions on Render:
- create an account on Render: https://render.com/
- go to "New" > "Static"
- select Git Provider > login to your Github account 
- select Github repository > key in Web Service name
- edit the build command to: npm run build:prod
- select "instance type": Free
- click "Deploy Web Service"
- go to "Redirect/Rewrite" > key in /* in "Source" > key in /index.html in "Destination" > select "Rewrite" action
- finally click "Add Rule"


4 Live link to deployed application:
- https://tictactoe-ui.onrender.com

5. Extras:
- Rechallenge option
- Scoreboard

6. Demo Instructions: 
demo instructions: 
- create 2 accounts with different emails
- login 1 account in regular mode and another 1 in incognito mode (your preferred browser)
- click "Play Online" on both window to start the match

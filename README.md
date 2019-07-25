<img src="https://assets.relayr.io/images/relayr/relayr_logo_transparent.png" alt="relayr-logo" width="300"/>

# Relayr Frontend Challenge

## Our Expectations


This code challenge is based on the actual work we do here at Relayr. It's designed to see how you design and code a simple app based on real-world requirements.

There's no time limit here, though we'd like to receive your solution within a week if possible. We expect a basic solution to take a couple of hours, but you're welcome to work on it longer if you'd like. 

You're welcome to add some CSS styling, but there's no need to make the app very beautiful. We're mostly interested in how you implement the app's basic functionality.

## Acceptance Criteria

You are building a React-based frontend interface for displaying data from and interacting with an IoT device. Once you're finished with the basic app, a user should be able to do the following:

* **Retrieve the device's state** from the backend.
* **Show each of the device's readings**: name, unit, value, timestamp, and active status.
* **Show a counter** showing how many readings are active and how many are inactive.
* **Implement a search input** that filters visible readings by name.
* A user should also be able to **toggle the active status of each reading** by making the proper requests to the backend. After successfully changing the status on the backend, the UI should display the updated state of the active counter.
 
Please the `API_DOCS.MD` file for information on the API endpoints available.

## Extra Credit

Finishing the above acceptance criteria is enough to submit the challenge, and we don't expect you to do any more. That said, you are welcome to implement anything further that you'd like and we'll keep it in mind. Again, extra work is not required at all: a good basic solution will be graded higher than an OK solution with more features. 

## Getting started

To run the server locally: ```npm run start```

## Prerequisites

To install dependencies: ```npm install```

## Notes
* We've set up a basic webpack configuration to serve files. Your code should hot reload, as should any styles you put in the `styles.css` file.
* PLEASE append your name to the project folder. E.g. device-dashboard-Edsger-W-Dijkstra

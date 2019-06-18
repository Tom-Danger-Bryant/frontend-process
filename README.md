# frontend-process
This repo is intended for new devs to familiarize themselves with our front end dev processes. It uses a fictional scenario to illustrate the best way to approach building new components. 

Important files in this repo will be accompanied with a `{{filename}}-README.MD` to explain their purpose and contents.

## Scenario
Our company is building a new ecommerce platform to sell its products online. Products are displayed in cards with their details. This repo demonstrates an implementation of the product card that follows our front-end conventions. 

### Existing Architecture 
We have to account for the following eccentricities of our existing architecture.
* There exists an API and GraphQL layer, however the data returned is not in an ideal format. 
* The service is popular and our stock updates need to happen in realtime. If a products information changes it should happen without a refresh

### Stack
We use the following stack
* Node.js
* GraphQL
* React
* SASS (scss)

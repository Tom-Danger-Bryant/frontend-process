# Container
This is a [smart/container component](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43).
## Container Component Rules
Devs should try to follow these guidelines, but they don't fit every scenario. 
* Updates should be recieved via graphql subscribed queries. 
* If a component doesn't need live updates, just fetch once and read from the apollo cache (no subscribed query).
* Only ask GraphQL for the fields that the presentational component needs.
* Do not include ANY presentational rendering. All JSX in this file should serve to pass data down, not control how a component looks. 

## Responsibility 
This component is responsible for providing it's presentational partner `<ProductCard.js>` with the data it needs in the format it expects. It is also responsible for keeping that data fresh. 

## Style Notes
### Functional Component
This is a [functional component](https://www.robinwieruch.de/react-function-component/). All [container components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43) in our product should be functional components. Functional components are more performative, often easier to read and from an organizational apspect give us less rope to hang ourselves on. Here's a [great article](https://blog.logrocket.com/react-functional-components-3-advantages-and-why-you-should-use-them-a570c83adb5e/) on their benefits. 


### Destructuring and Prop Massaging
The data passed from graphql isn't in an ideal format. The presentational component expects the props in a flat fashion. One of the most important roles that this container plays is to make sure it solves these problems efficiently. 

What is efficiency?
* The container should only grab the information it needs from the backend (smaller requests, less massaging once recieved). 
* Any data re-organization should be done in the most efficient way (fewest cycles and operations). If you have a large amount of data to process, or a complex data structure, there might be an argument for fixing that in the API/graphql layer. 
* Leverage client-side storage where possible. If it is possible avoid making backend requests by instead grabbing from Redux or the Apollo Cache, that is best. 


For this scenario, here's the schema that is stored in the backend (If we were to call the normal /product/{product_id} API we'd get all of this info back) : 

```
product : { 
    _id : 1234,
    department_id : 1234,
    details : {
        name : 'ProductA',
        description : 'Will take care of all of your problems',
        urls : {
            image: 'http://website.gov/image-92',
            query : 'http://api.website.gov/ae87uuhehfbjed'
        },
        createdAt : 1561056233414,
        lastStocked : 1161056235398,
        remainingStock : 100
    },
    price : { 
        maxPrice : 50,
        minPrice : 24,
        currentPrice : 47,
        unit : 'USD'
        tax : .07
    }
}
```

You'll notice that the `department` required for our component isn't included in  this call so without GraphQL we'd have to make another API call to /department/{department_id}. Which would return the following : 

```
department : {
    _id : 1234,
    name : 'Toys',
    createdAt : 1561056233555,
    owner_id : 9402,
    billingCodes : [948290,948299,108290]
}
```

So we have 2 issues to solve here. First how do we limit the calls to the backend, and secondly how do we ensure we only get the data we're interested in. Both are solved by GraphQL. 
The `GET_PRODUCT` query in the container (which will have a paired GraphQL model on the backend) fetches and formats the data we need. 

Now this isn't total magic. On the backend two API calls are still being made (one to /product/{product_id} and another to /department/{department_id}). Putting this kind of work on to the backend is perfect though because our backend is in the same region as our database (faster API calls) and has a lot more resources than the users web browser. 




[Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) helps remove extra logical lines checking for deeply nested properties. Destructuring won't prevent bugs, but the code will fail faster, meaning you'll catch them quicker.
**As a general rule, the deeper the nest, the more bugs likey to pop up.**

Without Destructuring you could massage the same props, which would look like this: 
```
const ProductCard = ({product, price,image,soldOut,department,availableStock}) => {
    const name = product.name;
    const _id = product._id;
    const description = product.description;
}
```
The example above is gross. Don't do it. 

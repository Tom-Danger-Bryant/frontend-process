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

We took the info

The container attached to this component already prepared the props for us, keeping the values as flat as possible. For this reason we did not need to massage or destruct.
Alternativley we could have passed the whole `product` object to this components props. We only need the `name`, `_id` and `details` from that object so function declaration would have looked like this (with destructuring) : 
``` 
const ProductCard = ({product : {_id, name,description}, price,image,soldOut,department,availableStock})
```

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

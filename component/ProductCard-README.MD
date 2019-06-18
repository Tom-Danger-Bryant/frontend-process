# Product Card
This is a [presentational component](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43).
## Presentational Component Rules
Devs should try to follow these guidelines, but they don't fit every scenario. 
* When possible, make the component a [Pure Functional Component](https://logrocket.com/blog/pure-functional-components/). No side affects = no bugs
* If you need state, keep it a functional component and use [Hooks](https://reactjs.org/docs/hooks-overview.html)
* Try to limit a file to one component. But if the component gets too big, break it into multiple components.
* Destrcucture as much as possible, and keep props massaging to a minimum. If the props aren't in the right format, fix that from the parent. 
* Try to keep control of visual effects in `CSS` not `JS`. See the `aria-invalid` attribute on line 33. This is more performative. 


## Responsibility 
This component is responsible for displaying the information provided by it's props and rendering the card. It also needs to handle the action of adding it's product to the cart. 
## Style Notes
### Functional Component
This is a [functional component](https://www.robinwieruch.de/react-function-component/). All [presentational components](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43) in our product should be functional components. Functional components are more performative, often easier to read and from an organizational apspect give us less rope to hang ourselves on. Here's a [great article](https://blog.logrocket.com/react-functional-components-3-advantages-and-why-you-should-use-them-a570c83adb5e/) on their benefits. 

### Use of Hooks
There is a small amount of internal state needed in this component, so we can't make it a [Pure Functional Component](https://logrocket.com/blog/pure-functional-components/). We also need to mimic [lifecycle methods](https://reactjs.org/docs/state-and-lifecycle.html), without using those nasty things. Fortunatley react have introduced hooks. Hooks keep the state & lifecycle management simple. We try to live by the rule "If it's too hard to do with hooks, your presentational component probably shouldn't be doing it". More complex logic should be refactored out into [pure functions](https://www.sitepoint.com/functional-programming-pure-functions/) or bumped to the container.  
Here's a [great article](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) about hooks.

The hooks we use in this component are:
*  `useState` for keeping track of the number of products this user wants and whether to display the `outOfStockBanner` for out of stock.
*  `useEffect` for updating the `outOfStockBanner` if the product goes out of stock before the user can act

### Destructuring and Prop Massaging
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

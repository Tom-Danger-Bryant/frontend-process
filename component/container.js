import React from 'react';
import { ProductCard } from "./ProductCard";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { UpdateUserAction } from '@shared/actions/UpdateUserAction';


const GET_PRODUCT = gql`
    query getProduct($productID: ID!) {
        product(_id: $productID) {
            _id
            department 
            details {
                name,
                description
                urls {
                    image
                }
                remainingStock
            }
            price {
                currentPrice
            }
        }
    }`;


const formatQuery = ({department, _id,
        details : {name, description, urls : {image}}, 
        remainingStock : availableStock, 
        price : {currentPrice : price}  }) => (
            {
                _id,
                name,
                price,
                description,
                image,
                soldOut : (availableStock <= 0),
                department,
                availableStock
            }
        );

const mapStateToProps = ({ user }, { product_id }) => ({
    user : user,
    product_id
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const boundActions = {};
    boundActions.UpdateUserAction = UpdateUserAction;
    return bindActionCreators(boundActions, dispatch);
};



const componentWithData = ({product_id,user}) => (
    <Route render={routeProps => (
            <Query query={GET_PRODUCT} variables={product_id}>{productProps => (
                <ProductCard {...routeProps} {...formatQuery(productProps)} {...props} user={user}/>
                    )}
            </Query>
    )}/>
);

   
export const container = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(componentWithData)
);

    



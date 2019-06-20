import React, {useState,useEffect} from 'react';
import Icon from '@shared/Icon';

const ProductCard = ({_id, name,price,description,image,soldOut,department,availableStock,user: {currency}})=> {
    const [productAmt, setProductAmt] = useState(1);
    const [outOfStockBanner, setOutOfStockBanner] = useState(soldOut);

    useEffect(()=>{
        setOutOfStockBanner(soldOut);
    },[soldOut]);


    const removeProduct = () => {
        if(productAmt == 0) return;
        setProductAmt(productAmt - 1);
    }

    const addProduct = () => {
        if(productAmt >= availableStock ) return;
        setProductAmt(1 + productAmt);
    }

    const placeOrder = () => {
        fetch(`/placeOrder`, { method : 'POST', 
                                headers : {
                                    'Content-type' : 'application/json'
                                },
                                body : JSON.stringify({_id, productAmt})
                            })
    }

    return (
        <div className='pd-Card_Container' aria-invalid={!!outOfStockBanner}>
            <div className='pd-Card_Header'>
                <Icon type={department}/>
            </div>
            <div className='pd-Card_Content'>
                <h1 className='pd-Card_Title'>{name}</h1>
                <img className='pd-Card_Img' src={image}/>
                <p className='pd-Card_Desc'>{description}</p>
            </div> 
            <div className='pd-Card_Footer'>
                <div className="pd-Card_Price">{`${currency}${price * productAmt}.00`}</div>
                <div className="pd-Card_Count">{productAmt}</div>
                <button className='pd-Card_Dec' onClick={removeProduct} />
                <button className='pd-Card_Inc'onClick={addProduct} />
                <button className='pd-Card_AddToCheckout' onClick={placeOrder} />
            </div>
        </div>
    )

};


export { ProductCard }; 
import React, { useState } from 'react'
import { useGetPastOrdersQuery } from '../state/pizzaApi'

export default function OrderList() {
  const {data: orders, error: creationError, isLoading: gettingPastOrders, isFetching: orderRefreshing} = useGetPastOrdersQuery()
  const [selectedSize, setSelectedSize] = useState('All')

  const filteredOrders = orders ? orders.filter(order => {
    if(selectedSize === 'All') return true;
    return order.size === selectedSize
  }) : [];
  
  
  return (
    <div id="orderList">
      <h2>Pizza Orders
        {(gettingPastOrders || orderRefreshing) && ' Loading...'}
        {(creationError && creationError.data?.message)}
        
      </h2>
      
      <ol>
        {
          filteredOrders.map((order, idx) => {
            console.log(order)
            const { customer, size, toppings = [] } = order;
            console.log('Toppings:', toppings);
            const toppingsCounts = toppings.length;

            return (
              <li key={idx}>
                <div>
                 {customer} ordered a size {size} with {toppingsCounts === 0 ? 'no toppings' :`${toppingsCounts} ${toppingsCounts === 1 ? 'topping' : 'toppings'}`}
                </div>
              </li>
            )
})
        }
      </ol>
      
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === selectedSize ? ' active' : ''}`
            return <button onClick={()=> setSelectedSize(size)}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}

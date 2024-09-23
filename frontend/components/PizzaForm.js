import React, {useReducer, useState} from 'react'
import { useCreateNewPizzaMutation } from '../state/pizzaApi'

const ORDER_INPUT = 'ORDER_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  toppings: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, { isLoading: creatingOrder }] = useCreateNewPizzaMutation()
  const [errorMessage, setErrorMessage] = useState('')


  const onChange = ({ target: { name, value, type, checked } }) => {
    if(type === 'checkbox') {
      const updatedToppings = checked 
      ? [...state.toppings, value] 
      : state.toppings.filter(topping => topping !== value)
      dispatch({ type: ORDER_INPUT, payload: {name: 'toppings', value: updatedToppings }})
    } else {
        dispatch({ type: ORDER_INPUT, payload: { name, value } })
    }
  
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
    setErrorMessage('')
  }
  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size, toppings } = state
    
    
    createOrder({ fullName, size, toppings })
    .unwrap()
    .then(data => { console.log(data)
      
    resetForm()
    })
   .catch(err => {console.log(err)
    setErrorMessage(err.data.message)
   })
  }





  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress</div>}
      {errorMessage && <div className='failure'>Order failed: {errorMessage}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChange} value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" value="1" type="checkbox" name="Pepperoni" onChange={onChange}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" value="2" type="checkbox" name="Green Peppers" onChange={onChange} />
          Green Peppers<br /></label>
        <label> 
          <input data-testid="checkPineapple" value="3" type="checkbox" name="Pineapple" onChange={onChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" value="4" type="checkbox" name="Mushrooms" onChange={onChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" value="5" type="checkbox"  name="Ham" onChange={onChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}

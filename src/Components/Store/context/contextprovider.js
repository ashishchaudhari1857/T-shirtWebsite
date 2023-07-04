import { useEffect, useReducer } from "react";
import Context from "./context";
//  this is default state
const defaultState = {
  items: [],
  totalAmount: 0,
  quantity: 0,
  Tshirts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add": // here the action begine
    console.log(action.item)
     return {
      ...state,
      items:[...action.item],
      quantity: action.item.reduce((total, cur) => total + cur.quantityL + cur.quantityM + cur.quantityS, 0),
      totalAmount: action.item.reduce((total, cur) => total + (cur.quantityL + cur.quantityM + cur.quantityS)*cur.price, 0)
     }      

    case "remove":
      // implement remove logic here
      return state;
    case "add_item":
      return {
        ...state,
        Tshirts: [...action.item],
      };

    default:
      return state;
  }
};

const Context_provider = (props) => {
  const API="https://crudcrud.com/api/f1ac0e9b10ae473d9b888629c738f9cf"
  const [state, dispatch] = useReducer(reducer, defaultState);

  const additem = async (item, check) => {
     if(item.L >0 && check==='L'){
        const updateitem={...item, L:item.L-1};
        console.log(updateitem)
        EDIT(updateitem)
      }
      else if(item.M>0 && check==='M'){
        const updateitem={...item, M:item.M-1};
        EDIT(updateitem)

      }
      else if (item.S>0 && check==='S'){
        const updateitem={...item, S:item.S-1};
        EDIT(updateitem)

      }

     
        let index = state.items.findIndex(
          (el) => el.id === item.id);
          const cartitem=state.items[index]
        
           //  this is  to find  the  item on we click L button  cause we have to reduce the value of the L   update tshirts array
        let updatedItem;
        console.log(index)
        if(index===-1  && state.items){
        if( check==='L'){
          updatedItem={ 
            ...item,
            quantityL: 1,
            quantityS: 0,
            quantityM: 0,
          }
        }else if( check==='M'){
          updatedItem={
            ...item,
            quantityL: 0,
            quantityS: 0,
            quantityM: 1,
          }
        }else{
          updatedItem={
            ...item,
            quantityL: 0,
            quantityS: 1,
            quantityM: 0,
          }
        }
      }else{
      console.log(item)
        if( check==='L'){
          const q=parseInt(cartitem.quantityL)
          console.log("q",q)
          updatedItem={
            ...cartitem,
            quantityL:q +1,
            
          }
          console.log(updatedItem)
        }else if( check==='M'){
          updatedItem={
            ...cartitem,
            quantityM: cartitem.quantityM+1,
          }
        }else{
          updatedItem={
            ...cartitem,
            quantityS: cartitem.quantityS+1,
          }
      }
    }

    const obj ={
      Description:updatedItem.Description,
      L:updatedItem.L,
      M:updatedItem.M,
      S:updatedItem.S,
      TshirtName:updatedItem.TshirtName,
      id:updatedItem.id,
      price:updatedItem.price,
      quantityL:updatedItem.quantityL,
      quantityM:updatedItem.quantityM,
      quantityS:updatedItem.quantityS,
    }
     console.log("this is updated " ,obj)
     if(index===-1){
    try {

      const res =await fetch(`${API}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
        }
      );
     
      const data = await res.json();
      if(!res.ok){
        console.log("this is etr",data.error.message)
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }else{
    try {
      console.log("inside the else block",obj)
             console.log(cartitem._id)
      const res =await fetch(`${API}/cart/${cartitem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
        }
      );
     
      const data = await res.json();
      if(!res.ok){
        console.log("this is etr",data.error.message)
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
    
  fetchcartdata()
    
  };
 const EDIT= async(updatedItem)=>{
   console.log(updatedItem)
  const obj ={
    Description:updatedItem.Description,
    L:updatedItem.L,
    M:updatedItem.M,
    S:updatedItem.S,
    TshirtName:updatedItem.TshirtName,
    id:updatedItem.id,
    price:updatedItem.price,
    quantityL:updatedItem.quantityL,
    quantityM:updatedItem.quantityM,
    quantityS:updatedItem.quantityS,
  }
  try {
    const res = await fetch(`${API}/product/${updatedItem._id}`,
      {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

  } catch (err) {
    console.log(err);
  }
  fetchdata();
 }
  const fetchcartdata = async () => {
    try {
      const res = await fetch(
        `${API}/cart`
      );
      const data = await res.json();
           console.log("inside the cart",data)
      if (res.ok) {
        dispatch({ type: "add", item: data
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchdata = async () => {
    
    try {
      const res = await fetch(
        `${API}/product`
      );
      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "add_item", item: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchcartdata();
  }, []);
  const removeItem = (id) => {
    dispatch({ type: "remove", id: id });
  };

  const add_to_list = async (item) => {
    try {
      const res = await fetch(
        `${API}/product`,
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    fetchdata();
  };

  const obj = {
    items: state.items, 
    Tshirts: state.Tshirts,
    addItem: additem,
    removeItem: removeItem,
    add_to_list: add_to_list,
    quantity: state.quantity,
    totalAmount: state.totalAmount,
  };

  return <Context.Provider value={obj}>{props.children}</Context.Provider>;
};

export default Context_provider;

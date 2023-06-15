 import React from "react";
const Context = React.createContext({
  items: [],
  Tshirts:[], 
  totalitem: 0,
  quantity:0,
  addItem: (item) => {},
  removeItem: (id) => {},
  add_to_list:(item)=>{}
});

export default Context;


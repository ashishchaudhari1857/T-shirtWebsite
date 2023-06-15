import { useReducer } from "react";
import Context from "./context";
//  this is default state
const defaultState = {
  items: [],
  totalAmount: 0,
  quantity: 0,
  Tshirts: [],
};

const reducer = (state, action) => {
  let updatedItemsshirts = state.Tshirts;
  switch (action.type) {
    case "add": // here the action begine
      let updatedItems;
      let updateamount;

      //
      //
      let updatequantity = state.quantity + 1; // this line keep tract  on how many element added  in  the  item array cause item array represent our cart
      updateamount = state.totalAmount + Number(action.item.price); // this take tract on the total cart amount
      //
      //
      let existingitemindex = state.items.findIndex(
        (item) => item.id === action.item.id // this use to check the item already present or  not   if not then  it return -1 else return index
        // in this we are finding  weather item present in cart or not
      );
      const existingCartItem = state.items[existingitemindex]; // that the object with we have to deal if exist and update that

      //
      //  the logic for  the all L and M  and S  is same
      if (action.check === "L") {
        let index = state.Tshirts.findIndex(
          (item) => item.id === action.item.id //  this is  to find the  item on we click L button  cause we have to reduce the value of the L   update tshirts array
        );
        const changeTshirt = state.Tshirts[index];
        console.log(changeTshirt);
        if (changeTshirt.L > 0) {
          // here we are checking weather the L t shirt present or not  if present  then we have  to reduce by  1
          const updatedItemsshirt = {
            ...changeTshirt,
            L: changeTshirt.L - 1,
          };
          updatedItemsshirts = [...state.Tshirts];
          updatedItemsshirts[index] = updatedItemsshirt;

          console.log(action.item.L); // this logic bassically use to take track how  many   L or S T  item addded to cart   of particaular  element
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantityL: existingCartItem.quantityL + 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingitemindex] = updatedItem;
          } else {
            let updatedItem = {
              ...action.item,
              quantityL: 1,
              quantityS: 0,
              quantityM: 0,
            }; // if user click  one  L ,M,S button for the first  time then we have to initialize every
            console.log(updatedItem.quantityL); // because when the next time click not any button  the cart show it present the
            //  it not get initialize
            updatedItems = state.items.concat(updatedItem);
          }
        } else {
          console.log("unavailabe");
          alert("item  is unavailabe");
          return state; // nothing is change we need pass the original state
        }
      }
      //
      //
      //

      //  the logic for the M button start here it same as the above
      else if (action.check === "M") {
        let index = state.Tshirts.findIndex(
          (item) => item.id === action.item.id
        );
        const changeTshirt = state.Tshirts[index];

        console.log(changeTshirt);
        if (changeTshirt.M > 0) {
          const updatedItemsshirt = {
            ...changeTshirt,
            M: changeTshirt.M - 1,
          };
          updatedItemsshirts = [...state.Tshirts];
          updatedItemsshirts[index] = updatedItemsshirt;

          console.log(action.item.M);
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantityM: existingCartItem.quantityM + 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingitemindex] = updatedItem;
          } else {
            let updatedItem = {
              ...action.item,
              quantityL: 0,
              quantityM: 1,
              quantityS: 0,
            };
            console.log(updatedItem.quantityM);

            updatedItems = state.items.concat(updatedItem);
          }
        } else {
          console.log("unavailabe");
          alert("item  is unavailabe");
          return state;
        }
      }
      //
      //
      //the logic for the S button start here it same as the above
      else if (action.check === "S") {
        let index = state.Tshirts.findIndex(
          (item) => item.id === action.item.id
        );
        const changeTshirt = state.Tshirts[index];
        console.log(changeTshirt);
        if (changeTshirt.S > 0) {
          const updatedItemsshirt = {
            ...changeTshirt,
            S: changeTshirt.S - 1,
          };
          updatedItemsshirts = [...state.Tshirts];
          updatedItemsshirts[index] = updatedItemsshirt;

          console.log(action.item.S);
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantityS: existingCartItem.quantityS + 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingitemindex] = updatedItem;
          } else {
            let updatedItem = {
              ...action.item,
              quantityL: 0,
              quantityM: 0,
              quantityS: 1,
            };
            console.log(updatedItem.quantityS);
            updatedItems = state.items.concat(updatedItem);
          }
        } else {
          console.log("unavailabe");
          alert("item  is unavailabe");
          return state;
        }
      }

      //
      //  for each  action  u need to return the  state update   if not  updated then  send the orignal
      //  here  while returning  the  state we use   spread  operator ...state cause
      //   when this allow us  update the original state  but  if u return without this then  it create new object that make  old properties reset
      //  that cause  error in program

      return {
        ...state,
        items: updatedItems,
        totalAmount: updateamount,
        quantity: updatequantity,
        Tshirts: updatedItemsshirts,
      };

    case "remove":
      // implement remove logic here
      return state;

    case "add_item":
      updatedItemsshirts = state.Tshirts.concat(action.item);
      return {
        ...state,
        Tshirts: updatedItemsshirts,
      };

    default:
      return state;
  }
};

const Context_provider = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const additem = (item, check) => {
    dispatch({ type: "add", item: item, check: check });
  };

  const removeItem = (id) => {
    dispatch({ type: "remove", id: id });
  };

  const add_to_list = (item) => {
    dispatch({ type: "add_item", item: item });
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

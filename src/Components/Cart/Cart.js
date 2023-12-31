  import Context from "../Store/context/context";
  import { useContext } from "react";
  import classes from './Cart.module.css'
  import Modal from "../UI/Modal";
const Cart =(props)=>{
 const ctx= useContext(Context)

     const  cartitem = ctx.items.map((item ,i)=>{
        const totalitem =item.quantityL+item.quantityS+item.quantityM
        const  totalamount=totalitem*item.price;
        return(  
            <tr key={item.id}>
        <td>{item.TshirtName}</td>
        <td>{item.Description}</td>
        <td>{item.price}</td>
        <td>{item.quantityL}</td>
        <td>{item.quantityM}</td>
        <td>{item.quantityS}</td>
        <td>{totalitem}</td>
        <td>{totalamount}</td>
      </tr>
        )
     })


return(
    <Modal>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>L</th>
          <th>M</th>
          <th>S</th>
          <th>totalitem</th>
          <th>totalprice</th>
        </tr>
      </thead>
      <tbody>
        {cartitem.length > 0 ? (
          cartitem
        ) : (
          <tr>
            <td colSpan="8">No items in cart</td>
          </tr>
        )}
      </tbody>
    </table>
    <button  className={classes.btn}onClick={props.CloseHandler}>close</button>
    </Modal>
)


}

export default Cart;
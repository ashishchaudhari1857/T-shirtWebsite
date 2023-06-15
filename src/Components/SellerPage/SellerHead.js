 import SellerPage from "./SellerPage"
 import classes from './SellerHead.module.css'
 import Context from "../Store/context/context";
 import { useContext, useState } from "react";
 import Cartbutton from "../Cart/CartButton";
 import Cart from "../Cart/Cart";
const SellerHead =()=>{
    const [flag, setflag] = useState(false);

    const CloseHandler = () => {
      setflag(false);
    };
    const OpenHandler = () => {
      setflag(true);
    };
    
    const ctx=useContext(Context);
      const add_to_list =(item)=>{
           ctx.add_to_list(item);
      }
      console.log(ctx.Tshirts)

      
    return(
        <>
        <div className={classes.head}>
            <SellerPage add_to_list={add_to_list} ></SellerPage>
            <Cartbutton OpenHandler={OpenHandler}  CloseHandler={CloseHandler}></Cartbutton>
             {flag && <Cart CloseHandler={CloseHandler}></Cart>}
        </div>
        </>
    )
}

export  {SellerHead};
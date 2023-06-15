import classes from "./Screencart.module.css";
import Context from "../Store/context/context";
import { useContext } from "react";
const Screencart = () => {
  const ctx = useContext(Context);
  const addL=(item )=>{
    ctx.addItem(item ,"L")
  }

  const addM=(item )=>{
    ctx.addItem(item ,"M")
  }
  const addS=(item )=>{
    ctx.addItem(item ,"S")
  }
  
  const x= ctx.items;
   console.log(x)

  const variety = ctx.Tshirts.map((item ,i) => {
    return (
      <ul key={item.id}>
        <li className={classes.li}>
            <div className={classes.tshirt}>
          <span> Name :{item.TshirtName}</span>
          <span> Description:{item.Description}</span>
          <span> price :{item.price}RS</span>
          </div>
          <div className={classes.actions}> 
            <button onClick={addL.bind(null,item)}>L-Buy-{item.L} </button>
            <button onClick={addM.bind(null,item)}>M-Buy-{item.M} </button>
            <button onClick={addS.bind(null,item)}>S-Buy-{item.S}</button>
          </div>
        </li>
      </ul>
      
    );
  });
  return <div className={classes.container}>{variety}</div>;
};

export default Screencart;

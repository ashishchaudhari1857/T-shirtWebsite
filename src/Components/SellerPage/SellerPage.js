import Input from "../UI/Input";
import Context from "../Store/context/context";
import { useContext } from "react";
import classes from './Sellerpage.module.css'
const SellerPage = (props) => {
  const ctx=useContext(Context)
  const submithandler = (event) => {
    event.preventDefault();
    const obj = {
      TshirtName: event.target.TshirtName.value,
      Description: event.target.Description.value,
      price: event.target.price.value,
      L: event.target.L.value,
      M: event.target.M.value,
      S: event.target.S.value,
      id:event.target.id.value,
    };

    const existingitemindex = ctx.Tshirts.findIndex(
      (item) => item.id === obj.id
    );

    if(existingitemindex  >= 0){
       alert("id already present")
    }else{
    props.add_to_list(obj);
    
  }
  event.target.reset();
  console.log(ctx.quantity)
  console.log(ctx.totalAmount)
  };
  return (
    <div className={classes.card}>  
      <form onSubmit={submithandler}>
      <Input
          label={"ID"}
          input={{
            id: "ID",
            name: "id",
            type: "text",
          }}
        ></Input>
        <Input
          label={"TshirtName"}
          input={{
            id: "TshirtName",
            name: "TshirtName",
            type: "text",
          }}
        ></Input>
        <Input
          label={"Description"}
          input={{
            id: "Description",
            name: "Description",
            type: "text",
          }}
        ></Input>
        <Input
          label={"price"}
          input={{
            id: "price",
            name: "price",
            type: "number",
          }}
        ></Input>
        <Input
          label={"L"}
          input={{
            id: "L",
            name: "L",
            type: "number",
            required:"",
          }}
        ></Input>
        <Input
          label={"M"}
          input={{
            id: "M",
            name: "M",
            type: "M",
            required :"",
          }}
        ></Input>
        <Input
          label={"S"}
          input={{
            id: "S",
            name: "S",
            type: "number",
            required :"",
          }}
        ></Input>
        <button type="submit">Add_item</button>
      </form>
   </div>
  );
};

export default SellerPage;

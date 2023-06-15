import classes from "./Modal.module.css";
import ReactDOM from 'react-dom';


const Backdrop = (props) => {
  return <div className={classes.backdrop}  onClick={props.onclose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const portal_element = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop  onclose={props.onclose} />, portal_element)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal_element
      )}
    </>
  );
};
export default Modal;

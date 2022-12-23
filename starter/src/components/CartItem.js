import { ChevronUp, ChevronDown } from "../icons";
import { cartActions } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({id, title, price, img, amount}) =>{

    const dispatch = useDispatch();

    const subtractAmount = () =>{
        if(amount === 1){
            dispatch(cartActions.removeItem(id));
            return;
        }
        dispatch(cartActions.subtractAmount(id));
    }

    return (
        <article className="cart-item">
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className="item-price">${price}</h4>
                <button className="remove-btn" onClick={() => dispatch(cartActions.removeItem(id))}>Remove</button>
            </div>
            <div>
                <button className="amount-btn" onClick={() => dispatch(cartActions.addAmount(id))}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>
                <button className="amount-btn" onClick={subtractAmount}>
                    <ChevronDown />
                </button>
            </div>
        </article>
    )
}

export default CartItem;
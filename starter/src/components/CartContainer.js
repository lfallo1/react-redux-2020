import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import {modalActions} from "../features/modalSlice";

const CartContainer = () =>{
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart);

    if(cart.amount < 1){
        return (
            <section className="cart">
                <header>
                    <h2>Your bag</h2>
                    <h4 className="empty-cart">is currently empty</h4>
                </header>
            </section>
        )
    }
    return (
        <section className="cart">
            <header>
                <h2>Your bag</h2>
                <div>
                    {cart.cartItems.map(item => {
                        return (
                            <CartItem key={item.id} {...item} />
                        )
                    })}
                </div>
            </header>
            <footer>
                <hr/>
                <div className="cart-total">
                    <h4>Total <span>${cart.total.toFixed(2)}</span></h4>
                </div>
                <button className="btn clear-btn" onClick={() => dispatch(modalActions.openModal())}>Clear Cart</button>
            </footer>
        </section>
    )
}

export default CartContainer;
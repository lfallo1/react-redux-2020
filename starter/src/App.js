import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {cartActions, fetchCartItems} from "./features/cartSlice";
import Modal from "./components/Modal";

const App = () => {

    const cartStore = useSelector((store) => store.cart);
    const modalStore = useSelector((store) => store.modal);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(fetchCartItems());
    }, []);

    useEffect(() =>{
        console.log('calculating totals');
        dispatch(cartActions.calculateTotals());
    }, [cartStore.cartItems])

    if(cartStore.isLoading){
        return (
            <div className="loading">
                <h1>Loading</h1>
            </div>
        )
    }

    return(
        <main>
            {modalStore.isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    );
}
export default App;

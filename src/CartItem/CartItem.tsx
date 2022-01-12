import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './CartItem.styles';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ₹{item.price}</p>
        <p>Total: ₹{(item.amount * item.price).toFixed(2)}</p>
        {/* toFixed(2) is going to give you two decimals from amount  */}
      </div>
      <div className='buttons'>
        <Button size='small' disableElevation variant='contained' onClick={() => removeFromCart(item.id)}>
        {/* disableElevation is used since we don't want any shadows */}
        {/* variant='contained' because I want it to display with a background in the button */}
          -
        </Button>
        <p>{item.amount}</p>
        <Button size='small' disableElevation variant='contained' onClick={() => addToCart(item)}>
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;

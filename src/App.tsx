import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

 
const getProducts = async (): Promise<CartItemType[]> =>
// getProducts is a fetching function
// this is a async function as we will fetch from an api and then we will wait adn have parenthesis then we will wait again
// promise is generic in typescript
// generic means of any type that is why we specified the type of the promise in <>
// in <CartItemType[]> we are using [] because the data that we will get back (with all the cart items) is an array
  await (await fetch('https://fakestoreapi.com/products')).json();
  // the await inside parenthesis is for the api call and the await outside the parenthesis is when we convert it to json because converting to json is also async

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  // React useState Hook allows us to track state in a function component. 
  // here the initial state is false
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  // here the initial state is an empty array
  const { data, isLoading, error } = useQuery<CartItemType[]>('products',getProducts);
  // useQuery hook is a function used to register your data fetching code into React Query library. 
  // 'products' here is query key, you can name it whatever you want
  console.log(data);

  //===================================================================

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
    // accumulator is a register in which intermediate arithmetic logic unit results are stored
    // ack is an accumulator, here number means it will return all the number of items in the cart
    // reduce() method returns a single value: the function's accumulated result
    // we initialize it with 0
    // so here it will give the total amount of the items in the cart 
  
  //=================================================================== 
  
    const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // Is the item already added in the cart? this is because we have to take into consideration that when we click 'ADD TO CART' if the cart is empty we need to add that item to the cart  
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      // find() method returns the value of the first element that passes a test
      // so isItemInCart will return the ans in true or false

      if (isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1} : item);
        //  so it means if the item we clicked is already present in cart then increase it by 1 otherwise return the item as it is
        //  ...item means represents old item 
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
      // so we are returning the previous state and we add this new clicked item and setting the amount to 1 for this 
      
      //  in this function what we are doing is we are calling setCartItems from which we are getting the access to the previous state so i checked in the previous state is item already existed because if it exists we need to update it instead of  adding it to the array and if it exists i am goig to loop through all the items until i find the item i clicked  on and i am going to add 1 to the amount otherwise if this is the first time that we click on this item then i will return an array with all the previous stuff  in the cart along with new item  
    });
  };

  // ================================================================

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
        // above line means if we are inside the cart and we clicked on an item
          if (item.amount === 1) return ack;
          // it means if the amount of item is 1 then we are going to remove the item if - is clicked 
          return [...ack, { ...item, amount: item.amount - 1 }];
          // this second statement of the return means otherwise we are going to return an array , we will spread out accumulator , the previous array  and we create a new object
        } else {
          return [...ack, item];
          // it means if we did not clickanything then keep it as it is
        }
      }, [] as CartItemType[])
      // [] as CartItemType[]) is the intial value for the reduce
    );
  };

  // ===================================================================

  // before returning to the actual data with the products we can check if is loading or having an error
  if (isLoading) return <LinearProgress />;
  // from materialui library we have LinearProgress, it will be displayed at the top 
  // Linear progress bar shows the measure of progress of any task or activity Linearly.
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
      {/* drawer is a panel that slides out from the edge of the page  */}
      {/* anchor is used to navigate to different web pages  */}
        <Cart cartItems={cartItems} addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
        // here ? means if data remains unidentified then it should not raise an error
        // we will map through the data 
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
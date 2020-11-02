import { Header, Grid, Menu, Popup, Button, Divider, MenuItem } from 'semantic-ui-react'
import axios from 'axios'

class Cart extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {data : {cartItems: []}};
        this.state = {name : "molly"};
    }
    async componentDidMount()
    {
        const name = localStorage.getItem('username');
        const items = await loadCartItems(name);
        this.setState({data : items});
    }
    render()
    {
        return (<>
            <Header size = "huge" color = "teal" textAlign = "center">
                Your Cart:
            </Header>
            <Grid style={{ height: '100vh' }} textAlign = "center" verticalAlign = "middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Menu vertical fluid>
                        {this.state.data && this.state.data.map(function (cartItem)
                        {
                            return (<Menu.Item>{cartItem.name}. . .{cartItem.price}</Menu.Item>);
                        })}
                    </Menu>                 
                </Grid.Column>
            </Grid>
        </>);
    }
}

export async function loadCartItems(username)
{
  const url = "http://localhost:3000/api/cart"
  const response = await axios.get(url, {params : {name : username}});
  const cartItems = response.data;
  // alert(JSON.stringify(cartItems));
  return cartItems;
}

export default Cart;
import { Header, Grid, Menu, Popup, Button, Divider, MenuItem } from 'semantic-ui-react'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'

class Cart extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handlePayment = this.handlePayment.bind(this);
        this.state = {data : {cartItems: []}};
        this.state = {total : 0.00};
        this.state = {totalWithTax : 0.00};
        this.state = {username : ""};
    }
    async componentDidMount()
    {
        const name = localStorage.getItem('username');
        const items = await loadCartItems(name);
        const finalTotal = getOrderTotal(items);
        const finalTotalWithTax = getOrderTotalWithTax(finalTotal);
        this.setState({username : name});
        this.setState({total : finalTotal})
        this.setState({totalWithTax : finalTotalWithTax});
        this.setState({data : items});
    }
    handlePayment(e)
    {
        createOrder(this.state.username, this.state.data, this.state.total, this.state.totalWithTax);
        Router.push('/orderstatus');
        e.preventDefault();
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
                        {this.state.data  && this.state.data.map(function (cartItem)
                        {
                            return (<Menu.Item>{cartItem.name}. . .{cartItem.price}</Menu.Item>);
                        })}
                    </Menu>
                    <Grid.Row>Total : {this.state.total}</Grid.Row>
                    <Grid.Row>Total with tax added : {this.state.totalWithTax}</Grid.Row>
                    <Link href = "/orderstatus">
                        <Button onClick = {this.handlePayment}>
                            Pay Now
                        </Button> 
                    </Link>
                </Grid.Column>
            </Grid>
        </>);
    }
}

export function getOrderTotal(items)
{
    var total = 0.0;
    for (const element of items)
    {
        total += element.price;
    }
    return total.toFixed(2);
}

export function getOrderTotalWithTax(total)
{
    var totalWithTax = total * 1.065;
    return totalWithTax.toFixed(2);
}

export async function loadCartItems(username)
{
  const url = "http://localhost:3000/api/cart"
  const response = await axios.get(url, {params : {name : username}});
  const cartItems = response.data;
  // alert(JSON.stringify(cartItems));
  return cartItems;
}

export async function createOrder(username, items, total, totalWithTax)
{
    const url = "http://localhost:3000/api/createOrder"
    const response = await axios.post(url, { username, items, total, totalWithTax });
}
export default Cart;
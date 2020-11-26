import { Header, Grid, Menu, Popup, Button, Divider, MenuItem, Segment, Container, Icon, Message, Image, Input, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
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
        this.state = {hasCartItems : false};
        this.state = {disabled : false};
        this.state = {noName : false};
        this.orderName = React.createRef();
    }
    async componentDidMount()
    {
        const name = localStorage.getItem('username');
        const items = await loadCartItems(name);
        if (items == "")
            this.setState({disabled : true});
        else
            this.setState({disabled : false});
        const finalTotal = getOrderTotal(items);
        const finalTotalWithTax = getOrderTotalWithTax(finalTotal);
        this.setState({username : name});
        this.setState({total : finalTotal})
        this.setState({totalWithTax : finalTotalWithTax});
        this.setState({data : items});
        this.setState({hasCartItems : true});
    }
    handlePayment(e)
    {
        if (this.orderName.current.value == "")
        {
            this.setState({noName : true});
        }
        else 
        {
            this.setState({noName : false});
            createOrder(this.state.username, this.state.data, this.state.total, this.state.totalWithTax, this.orderName.current.value);
            Router.push('/orderstatus');
        }
        e.preventDefault();
    }
    render()
    {
        if (this.state.hasCartItems)
        {
            return (<>
            <Header style={{ backgroundColor: '#393433' }} size = "large" inverted as = 'h1' block size = "huge" color = "grey" textAlign = "center">
                <Grid columns = {3}>
                    <Grid.Column textAlign = "left"><Link href = '/customerhome'><Button size = "huge"><Icon name = "arrow alternate circle left"></Icon>Back</Button></Link></Grid.Column>
                    <Grid.Column verticalAlign = "middle">Check Out</Grid.Column>
                    <Grid.Column textAlign = "right"><Link href = '/'><Button size = "huge">Log Out<Icon name = "arrow alternate circle right"></Icon></Button></Link></Grid.Column>
                </Grid>
            </Header>
                <Grid style={{ height: '75vh' }} textAlign = "center" verticalAlign = "middle">
                    <Grid.Column width = '3'>
                        <Image rounded src = 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'/>
                    </Grid.Column>
                    <Grid.Column width = '6'>
                        <Header style={{ backgroundColor: '#c95b0c' }} block inverted size = "huge" color = "grey" textAlign = "center">
                            Your Cart
                        </Header>
                        <Segment size = "massive" stacked>                  
                            {this.state.data  && this.state.data.map(function (cartItem)
                            {
                                return (<Container textAlign = "left" fluid text>{cartItem.name} (${cartItem.price})</Container>);
                            })}
                            <Message hidden = {this.state.disabled == false}>You have not added any items to your cart.</Message>
                            <Divider horizontal><Icon name = "star"></Icon></Divider>
                            <Segment style={{ backgroundColor: '#393433' }} inverted>
                                <Header as = 'h3' textAlign = "left" fluid text>Total : ${this.state.total}</Header>
                                <Header as = 'h3' textAlign = "left" fluid text>Total with tax added : ${this.state.totalWithTax}</Header>
                            </Segment>
                            <Divider horizontal></Divider>
                            <Header as = 'h3' textAlign = 'left'>Who's picking up this order?</Header>
                            <Form><Form.Field><input type = "text" ref = {this.orderName} placeholder = 'Enter name'/></Form.Field></Form>
                            <Divider horizontal></Divider>
                            <Message size = 'small' error hidden = {this.state.noName == false}>Please enter a name for pickup.</Message>
                            <Button style={{ backgroundColor: '#393433' }} size = 'large' disabled = {this.state.disabled} fluid color = "grey" onClick = {this.handlePayment}>
                                Pay Now
                            </Button> 
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width = '3'>
                        <Image rounded src = 'https://images.unsplash.com/photo-1579856896394-07dfa10d7c5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'/>
                    </Grid.Column>
                </Grid>
            </>);
        }
        else
        {
            return null;
        }
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
  // const url = "http://localhost:3000/api/cart"
  const url = "https://poosdrestaurantapp.vercel.app/api/cart"
  const response = await axios.get(url, {params : {name : username}});
  const cartItems = response.data;
  return cartItems;
}

export async function createOrder(username, items, total, totalWithTax, orderName)
{
    // const url = "http://localhost:3000/api/createOrder"
    const url = "https://poosdrestaurantapp.vercel.app/api/createOrder"
    const response = await axios.post(url, { username, items, total, totalWithTax, orderName });
}
export default Cart;
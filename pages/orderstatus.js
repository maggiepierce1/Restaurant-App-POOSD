import { Button, Header, Menu, Grid, Container, Icon, Segment, Image, Divider } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'

class OrderStatus extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {data : {orders: []}};
        this.state = {username : ""};
        this.state = {hasOrders : false};
    }
    async componentDidMount()
    {
        const name = localStorage.getItem('username');
        const orders = await loadOrders(name);
        this.setState({data : orders});
        this.setState({hasOrders : true});
    }
    render ()
    {
        if (this.state.hasOrders)
        {
            return (<>
            <Header style={{ backgroundColor: '#393433' }} size = "large" inverted as = 'h1' block size = "huge" color = "grey" textAlign = "center">
                <Grid columns = {3}>
                    <Grid.Column textAlign = "left"><Link href = '/customerhome'><Button size = "huge"><Icon name = "arrow alternate circle left"></Icon>Back</Button></Link></Grid.Column>
                    <Grid.Column style={{fontSize: '40px' }} verticalAlign = "middle">Order Status Page</Grid.Column>
                    <Grid.Column textAlign = "right"><Link href = '/login'><Button size = "huge">Log Out<Icon name = "arrow alternate circle right"></Icon></Button></Link></Grid.Column>
                </Grid>
            </Header>
            <Grid style={{ height: '75vh' }} textAlign = "center">
                <Grid.Column width = '10' style={{ maxWidth: 850 }}>
                    <Header inverted style={{ backgroundColor: '#c95b0c' }} as = 'h2' block>Thanks for ordering!</Header>
                    <Image fluid src = 'images/pickup.jpg'/>
                    <Divider horizontal/>
                    <Grid.Row>
                        <Menu vertical fluid>
                            {this.state.data && this.state.data.map((order, index) =>
                            {
                                return (<Menu.Item key = {index}>
                                        <Grid>
                                            <Grid.Column><Header as = 'h2' textAlign = "left">Order #{index + 1} for {order.username}</Header>
                                            <Header as = 'h3' textAlign = "left">placed at {order.time} on {order.date}</Header>
                                            <Segment style={{ backgroundColor: '#393433' }} inverted><Header as = 'h3' textAlign = "left">Status: {order.status}</Header></Segment>
                                            </Grid.Column> 
                                        </Grid>
                                    </Menu.Item>);
                            })}
                        </Menu>
                    </Grid.Row>
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

export async function loadOrders(username)
{
  const url = "http://localhost:3000/api/orderstatus"
  const response = await axios.get(url, {params : {name : username}});
  const orders = response.data;
  return orders;
}
export default OrderStatus;
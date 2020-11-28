import { List, Header, Grid, Modal, Button, Menu, Popup, Container, Segment, Divider, Icon, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import Link from 'next/link'

class EmployeeHome extends React.Component
{
    constructor(props)
    {
        super(props);
        this.triggerOrderDetailsModal = this.triggerOrderDetailsModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.state = {data : {orders: []}};
        this.state = {mOpen : false};
        this.state = {hasOrders : false};
        this.currIndex = 0;
        this.state = {noOrders : false};
    }
    async componentDidMount()
    {
        const currOrders = await loadOrders();
        if (currOrders == "")
          this.setState({noOrders : true});
        this.setState({data : currOrders});
        this.setState({hasOrders : true});
    }
    triggerOrderDetailsModal(e)
    {
      const index = e.currentTarget.value;
      this.currIndex = index;
      this.setState({mOpen : true});
      e.preventDefault();
    }
    closeModal(e)
    {
      this.setState({mOpen : false});
      e.preventDefault();
    }
    async updateOrderStatus(e)
    {
      const status = e.currentTarget.value;
      const orderID = this.state.data[this.currIndex]._id;
      await updateStatus(orderID, status);
      const updatedOrders = await loadOrders();
      this.setState({data : updatedOrders});
      e.preventDefault();
    }
    render()
    {
      if (this.state.hasOrders)
      {
        return (<>
          <Header style={{ backgroundColor: '#393433' }} size = "large" inverted as = 'h1' block size = "huge" color = "grey" textAlign = "center">
            <Grid columns = {3}>
                <Grid.Column textAlign = "left"><Link href = '/customerhome'><Button size = "huge"><Icon name = "arrow alternate circle left"></Icon>Back</Button></Link></Grid.Column>
                <Grid.Column  style={{ fontSize: '40px' }} verticalAlign = "middle">Welcome!</Grid.Column>
                <Grid.Column textAlign = "right"><Link href = '/'><Button size = "huge">Log Out<Icon name = "arrow alternate circle right"></Icon></Button></Link></Grid.Column>
            </Grid>
        </Header>
          <Divider horizontal></Divider>
          <Grid columns = {3} divided textAlign = "center" verticalAlign = "middle">
            <Grid.Row>
              <Grid.Column width = '10'>
                <Header inverted style={{ backgroundColor: '#c95b0c' }} as = 'h2' block>Current Orders</Header>
                <Message hidden = {this.state.noOrders == false}>There are no orders currently in progress.</Message>
                <Message style={{ fontStyle: 'italic', fontSize: '16px' }}>Select the '+' button to view the details of an order and update its status.</Message>
                  <Menu vertical fluid>
                      {this.state.data && this.state.data.map((order, index) =>
                      {
                        if (order.status != "picked up")
                        {
                          return (<Menu.Item key = {index}>
                                    <Grid>
                                      <Grid.Column width = '8'><Header as = 'h4' textAlign = 'left'>Order for {order.pickupName}</Header>
                                      <Container fluid text textAlign = 'left'>placed on {order.date} at {order.time}</Container>
                                      </Grid.Column> 
                                      <Popup
                                      trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button size = "huge" value = {index} icon = 'add' compact onClick = {this.triggerOrderDetailsModal}/></Container></Grid.Column>}
                                      content = "Click here to view order details"
                                      basic/>
                                    </Grid>
                                </Menu.Item>);
                        }
                      })}
                  </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Modal open = {this.state.mOpen} closeIcon onClose = {this.closeModal}>
            <Modal.Content>
              <Header as = 'h1'>Order Contents:</Header>
                <Segment>
                    {this.state.data[this.currIndex].items.map((item) => 
                    {
                      return (<Container textAlign = "left">{item.name}</Container>);
                    })}
                </Segment>
              <Divider horizontal></Divider>
              <Header as = 'h3'>Current Status: {this.state.data[this.currIndex].status}</Header>
              <Divider horizontal></Divider>
              <Header as = 'h3'>Update Status:</Header>
              <Button value = {"Received"} onClick = {this.updateOrderStatus}>Received</Button>
              <Button value = {"Preparing"} onClick = {this.updateOrderStatus}>Preparing</Button>
              <Button value = {"Done"} onClick = {this.updateOrderStatus}>Done</Button>
              <Button value = {"Picked Up"} onClick = {this.updateOrderStatus}>Picked Up</Button>
            </Modal.Content>
          </Modal>
        </>);
      }
      else
      {
        return null;
      }
    }
}

export async function updateStatus(id, newStatus)
{
  // const url = "http://localhost:3000/api/updateOrder"
  const url = "https://poosdrestaurantapp.vercel.app/api/updateOrder"
  const response = await axios.post(url, { id, newStatus });
}

export async function loadOrders()
{
  // const url = "http://localhost:3000/api/orders"
  const url = "https://poosdrestaurantapp.vercel.app/api/orders"
  const response = await axios.get(url);
  const orders = response.data;
  return orders;
}
export default EmployeeHome;
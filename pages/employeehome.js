import { List, Header, Grid, Modal, Button, Menu, Popup, Container, Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'
import React, { useState } from 'react';


function OrderPage({ orders })
{
    const [mOpen, setOpen] = useState(false);
    const [currOrder, setCurrOrder] = useState("");

    function triggerOrderDetailsModal(e)
    {
        setOpen(true);
        setCurrOrder(e.currentTarget.value);
        e.preventDefault();
    }
    function closeModal(e)
    {
      setOpen(false);
      e.preventDefault();
    }
    function updateOrderStatus(e)
    {
      const status = e.currentTarget.value;
      updateStatus(currOrder, status);
      e.preventDefault();
    }
    return (<>
        <Header size = "large" inverted as = 'h1' block size = "huge" color = "white" textAlign = "center">
          Welcome!
        </Header>
        <Divider horizontal></Divider>
        <Grid columns = {3} divided textAlign = "center" verticalAlign = "middle">
          <Grid.Row>
            <Grid.Column>
              <Header block>Current Orders</Header>
                <Menu vertical fluid>
                    {orders.map((order) => 
                    {
                      return (<Menu.Item>
                                <Grid>
                                  <Grid.Column width = '8'><Container fluid text textAlign = 'left'>Order for {order.username}</Container></Grid.Column> 
                                  <Popup
                                  trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button size = "huge" value = {order.username} icon = 'add' compact onClick = {triggerOrderDetailsModal}/></Container></Grid.Column>}
                                  content = "Click here to view order details"
                                  basic/>
                                </Grid>
                              <Modal open = {mOpen} closeIcon onClose = {closeModal}>
                                 <Modal.Content>
                                   <Header as = 'h1'>Order Contents:</Header>
                                   <Segment>
                                      {order.items.map((item) => 
                                      {
                                        return (<Container textAlign = "left">{item.name}</Container>);
                                      })}
                                   </Segment>
                                   <Divider horizontal></Divider>
                                   <Header as = 'h3'>Current Status: {order.status}</Header>
                                   <Header as = 'h2'> Update the status of this order:</Header>
                                   <Button value = {"received"} onClick = {updateOrderStatus}>Received</Button>
                                   <Button value = {"preparing"} onClick = {updateOrderStatus}>Preparing</Button>
                                   <Button value = {"done"} onClick = {updateOrderStatus}>Done</Button>
                                   <Button value = {"picked up"} onClick = {updateOrderStatus}>Picked Up</Button>
                                 </Modal.Content>
                               </Modal>
                            </Menu.Item>);
                    })}
                </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>);
}

export async function updateStatus(username, newStatus)
{
    const url = "http://localhost:3000/api/updateOrder"
    const response = await axios.post(url, { username, newStatus });
}

export async function getStaticProps()
{
  const url = "http://localhost:3000/api/orders"
  const response = await axios.get(url);
  const orders = response.data;
  return {props : { orders } };
}

export default OrderPage;
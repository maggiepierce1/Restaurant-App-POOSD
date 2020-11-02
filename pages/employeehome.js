import { List, Header, Grid, Modal, Button, Menu, Popup } from 'semantic-ui-react'
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
        <Header size = "huge" color = "teal" textAlign = "center">
            Current orders:
        </Header>
        <Grid divided textAlign = "center" verticalAlign = "middle">
          <Grid.Row>
            <Grid.Column>
                <Menu vertical fluid>
                    {orders.map((order) => 
                    {
                      return (<Menu.Item>Order for {order.username}
                              <Popup
                              trigger={<Button value = {order.username} icon='add' compact onClick = {triggerOrderDetailsModal}/>}
                              content = "Click here to view order details"
                              basic/>
                              <Modal open = {mOpen} closeIcon onClose = {closeModal}>
                                 <Modal.Content>
                                   <Header>Update the status of this order:</Header>
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
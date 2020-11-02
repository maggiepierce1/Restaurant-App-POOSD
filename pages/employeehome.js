import { List, Header, Grid, Modal, Button, Menu, Popup } from 'semantic-ui-react'
import axios from 'axios'
import React, { useState } from 'react';


function OrderPage({ orders })
{
    const [mOpen, setOpen] = useState(false);
    const [currOrder, setCurrOrder] = useState(null);

    function triggerOrderDetailsModal(e)
    {
        setOpen(true);
        e.preventDefault();
    }
    function closeModal(e)
    {
      setOpen(false);
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
                              trigger={<Button value = {order} icon='add' compact onClick = {triggerOrderDetailsModal}/>}
                              content = "Click here to view order details"
                              basic/>
                              <Modal open = {mOpen} closeIcon onClose = {closeModal}>
                                 Update the Status of this order:
                                 <Modal.Content>
                                   <Button>Received</Button>
                                   <Button>Preparing</Button>
                                   <Button>Done</Button>
                                   <Button>Picked Up</Button>
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

export async function getStaticProps()
{
  const url = "http://localhost:3000/api/orders"
  const response = await axios.get(url);
  const orders = response.data;
  return {props : { orders } };
}

export default OrderPage;
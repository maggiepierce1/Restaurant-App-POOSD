import { Header, Grid, Menu, Popup, Button, Divider, MenuItem, Container, Input, Icon, Form, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react';

function MenuPage({ menuItems })
{
    const [mOpen, setOpen] = useState(false);
    const searchQuery = useRef("maggie");

    function triggerSearchResultsModal(e)
    {
        setOpen(true);
        alert(searchQuery.current.value);
        loadSearchResults(searchQuery.current.value);
        e.preventDefault();
    }
    function handleClick(e)
    {
        alert(e.currentTarget.value);
        var name = localStorage.getItem('username');
        addToCart(e.currentTarget.value, name);
        e.preventDefault();
    }
    return (<>
        <Header size = "large" inverted as = 'h1' block size = "huge" color = "grey" textAlign = "center">
            <Grid columns = {3}>
                <Grid.Column textAlign = "left"><Link href = '/customerhome'><Button size = "large"><Icon name = "arrow alternate circle left"></Icon>Back</Button></Link></Grid.Column>
                <Grid.Column verticalAlign = "middle">Menu</Grid.Column>
                <Grid.Column textAlign = "right"><Link href = '/cart'><Button size = "large">Check Out<Icon name = "arrow alternate circle right"></Icon></Button></Link></Grid.Column>
            </Grid>
        </Header>
        <Grid columns={3} divided textAlign = "center" verticalAlign = "middle">
          <Grid.Column>
            <Grid.Row>
                <Segment><Segment.Inline>
                    <Form><Form.Field><input ref = {searchQuery} type = "text" placeholder = "Search..."/></Form.Field></Form>
                    <Button onClick = {triggerSearchResultsModal}>Search</Button>
                </Segment.Inline></Segment>
            </Grid.Row>
            <Divider horizontal></Divider>
            <Grid.Row>
                <Header block>Appetizers</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem) => 
                    {
                        if (menuItem.category == "appetizer")
                        {
                            return (<Menu.Item>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name}  (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button size = "huge" value = {menuItem.name} icon = 'add' compact onClick = {handleClick}/></Container></Grid.Column>}
                                    content = "Click here to add this item to your cart"
                                    basic/>      
                                </Grid>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Row>
            <Divider horizontal></Divider>
            <Grid.Row>
            <Header block>Entrees</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem) => 
                    {
                        if (menuItem.category == "entree")
                        {
                            return (<Menu.Item>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name}  (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button size = "huge" value = {menuItem.name} icon = 'add' compact onClick = {handleClick}/></Container></Grid.Column>}
                                    content = "Click here to add this item to your cart"
                                    basic/>      
                                </Grid>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Row>
            <Divider horizontal></Divider>
            <Grid.Row>
                <Header block>Desserts</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem) => 
                    {
                        if (menuItem.category == "dessert")
                        {
                            return (<Menu.Item>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name}  (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button size = "huge" value = {menuItem.name} icon = 'add' compact onClick = {handleClick}/></Container></Grid.Column>}
                                    content = "Click here to add this item to your cart"
                                    basic/>      
                                </Grid>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </>);
}

export async function getStaticProps()
{
  const url = "http://localhost:3000/api/menu"
  const response = await axios.get(url);
  const menuItems = response.data;
  return {props : { menuItems } };
}

export async function loadSearchResults(searchQuery)
{
    const url = "http://localhost:3000/api/getSearchResults"
    const response = await axios.get(url, { searchQuery });
}

export async function addToCart(itemName, userName)
{
    const url = "http://localhost:3000/api/updateCart"
    const response = await axios.post(url, { itemName, userName });
}

export default MenuPage;
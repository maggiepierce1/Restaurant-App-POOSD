import { Header, Grid, Menu, Popup, Button, Divider, MenuItem, Container, Input, Icon, Form, Segment, Modal, Image, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState, useRef, useEffect } from 'react';

function MenuPage({ menuItems })
{
    const [mOpen, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const searchQuery = useRef("");
    const [results, setResults] = useState([]);
    var indices = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    async function triggerSearchResultsModal(e)
    {
        const query = searchQuery.current.value;
        if (query == "")
        {
            setError(true);
            setNoResults(false);
        }
        else
        {
            setError(false);
            const searchResults = await loadSearchResults(query);
            if (searchResults == "")
                setNoResults(true);
            else 
            {
                setNoResults(false);
                setResults(searchResults);
                setOpen(true);
            }
        }
        e.preventDefault();
    }
    function closeModal(e)
    {
        setOpen(false);
        e.preventDefault();
    }
    function handleClick(e)
    {
        var name = localStorage.getItem('username');
        addToCart(e.currentTarget.value, name);
        e.preventDefault();
    }
    return (<>
        <Header style={{ backgroundColor: '#393433' }} size = "large" inverted as = 'h1' block size = "huge" color = "grey" textAlign = "center">
            <Grid columns = {3}>
                <Grid.Column textAlign = "left"><Link href = '/customerhome'><Button size = "huge"><Icon name = "arrow alternate circle left"></Icon>Back</Button></Link></Grid.Column>
                <Grid.Column style={{ fontFamily: 'Florence', fontSize: '40px', fontStyle: "italic" }} verticalAlign = "middle">Menu</Grid.Column>
                <Grid.Column textAlign = "right"><Link href = '/cart'><Button size = "huge">Check Out<Icon name = "arrow alternate circle right"></Icon></Button></Link></Grid.Column>
            </Grid>
        </Header>
        <Grid columns = {3} divided textAlign = "center">
            <Grid.Column width = '3'>
                <Image verticalAlign = 'top' src = 'https://images.unsplash.com/photo-1547754070-c73f90c116b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'/>
                <Image src = 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'/>
                <Image src = 'images/spinach.jpg'/>
                <Image src = 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'/>
                <Image style = {{height : 537}}src = 'images/chicken.jpg'/>
            </Grid.Column>
          <Grid.Column width = '10'>
            <Grid.Row>
                <Segment size = 'massive'><Segment.Inline>
                    <Form><Form.Field><input ref = {searchQuery} type = "text" placeholder = "Search..."/></Form.Field></Form>
                    <Divider horizontal></Divider>
                    <Message error style={{ fontSize: '15px' }}hidden = {error == false}>Please enter a search query.</Message>
                    <Message error style={{ fontSize: '15px' }} hidden = {noResults == false}>Your query returned no results.</Message>
                    <Button size = 'large' style={{ backgroundColor: '#efd5c3' }} fluid onClick = {triggerSearchResultsModal}>Search Menu</Button>
                </Segment.Inline></Segment>
            </Grid.Row>
            <Divider horizontal></Divider>
            <Grid.Row>
                <Header inverted style={{ backgroundColor: '#c95b0c' }} as = 'h2' block>Appetizers</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem, index) => 
                    {
                        if (menuItem.category == "appetizer")
                        {
                            return (<Menu.Item key = {index}>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name} (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button inverted style={{ backgroundColor: '#393433' }} size = "huge" value = {menuItem.name} icon = 'cart' compact onClick = {handleClick}/></Container></Grid.Column>}
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
            <Header inverted style={{ backgroundColor: '#c95b0c' }} as = 'h2' block>Entrees</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem, index) => 
                    {
                        if (menuItem.category == "entree")
                        {
                            return (<Menu.Item key = {index}>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name}  (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button inverted style={{ backgroundColor: '#393433' }} size = "huge" value = {menuItem.name} icon = 'cart' compact onClick = {handleClick}/></Container></Grid.Column>}
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
                <Header inverted style={{ backgroundColor: '#c95b0c' }} as = 'h2' block>Desserts</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem, index) => 
                    {
                        if (menuItem.category == "dessert")
                        {
                            return (<Menu.Item key = {index}>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name}  (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button inverted style={{ backgroundColor: '#393433' }} size = "huge" value = {menuItem.name} icon = 'cart' compact onClick = {handleClick}/></Container></Grid.Column>}
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
                <Header inverted style={{ backgroundColor: '#c95b0c' }} as = 'h2' block>Drinks</Header>
                <Menu vertical fluid>
                    {menuItems.map((menuItem, index) => 
                    {
                        if (menuItem.category == "drink")
                        {
                            return (<Menu.Item key = {index}>
                                <Grid>        
                                    <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{menuItem.name}  (${menuItem.price})</Container></Grid.Column>
                                    <Popup
                                    trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button inverted style={{ backgroundColor: '#393433' }} size = "huge" value = {menuItem.name} icon = 'cart' compact onClick = {handleClick}/></Container></Grid.Column>}
                                    content = "Click here to add this item to your cart"
                                    basic/>      
                                </Grid>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width = '3'>
                <Image src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=714&q=80'/>
                <Image src = 'https://images.unsplash.com/photo-1600891964532-839fb6407dd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'/>
                <Image src = 'images/macncheese.jpg'/>
                <Image src = 'images/pork.jpg'/>
                <Image src = 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'/>
                <Image src = 'images/pigs.jpg'/>
            </Grid.Column>
        </Grid>
        <Modal open = {mOpen} closeIcon onClose = {closeModal}>
            <Modal.Content>
                <Header as = 'h1'>Search Results:</Header>
                <Menu vertical fluid>
                    {results && results.map((result) => 
                    {
                        return (<Menu.Item key = {result}>
                            <Grid>        
                                <Grid.Column width = '8'><Container fluid text textAlign = 'left'>{result.name}  (${result.price})</Container></Grid.Column>
                                <Popup
                                trigger={<Grid.Column width = '8'><Container textAlign = 'right'><Button inverted style={{ backgroundColor: '#393433' }} size = "huge" value = {result.name} icon = 'cart' compact onClick = {handleClick}/></Container></Grid.Column>}
                                content = "Click here to add this item to your cart"
                                basic/>      
                            </Grid>
                        </Menu.Item>);
                    })}
                </Menu>
            </Modal.Content>
        </Modal>
      </>);
}

export async function getServerSideProps()
{
  // const url = "http://localhost:3000/api/menu"
  const url = "https://poosdrestaurantapp.vercel.app/api/menu"
  const response = await axios.get(url);
  const menuItems = response.data;
  return {props : { menuItems } };
}

export async function loadSearchResults(searchQuery)
{
    // const url = "http://localhost:3000/api/getSearchResults"
    const url = "https://poosdrestaurantapp.vercel.app/api/getSearchResults"
    const response = await axios.get(url, {params : {search : searchQuery}});
    const searchResults = response.data;
    return searchResults;
}

export async function addToCart(itemName, userName)
{
    // const url = "http://localhost:3000/api/updateCart"
    const url = "https://poosdrestaurantapp.vercel.app/api/updateCart"
    const response = await axios.post(url, { itemName, userName });
}

export default MenuPage;
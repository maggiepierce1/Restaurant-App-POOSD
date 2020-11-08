import { Header, Grid, Menu, Popup, Button, Divider, MenuItem, Container } from 'semantic-ui-react'
import axios from 'axios'

// class MenuPage extends React.Component
function MenuPage({ menuItems })
{
    function handleClick(e)
    {
        alert(e.currentTarget.value);
        var name = localStorage.getItem('username');
        addToCart(e.currentTarget.value, name);
        e.preventDefault();
    }
    return (<>
        <Header size = "huge" color = "teal" textAlign = "center">
            This is the menu.
        </Header>
        <Grid columns={3} divided textAlign = "center" verticalAlign = "middle">
          <Grid.Column>
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


export async function addToCart(itemName, userName)
{
    const url = "http://localhost:3000/api/updateCart"
    const response = await axios.post(url, { itemName, userName });
}

export default MenuPage;
import { Header, Grid, Menu, Popup, Button, Divider, MenuItem } from 'semantic-ui-react'
import axios from 'axios'

function MenuPage({ menuItems })
{
    function handleClick(e)
    {
        alert(e.currentTarget.value);
        var name = prompt("please enter your name");
        addToCart(e.currentTarget.value, name);
        e.preventDefault();
    }
    return (<>
        <Header size = "huge" color = "teal" textAlign = "center">
            This is the menu.
        </Header>
        <Grid columns={3} divided textAlign = "center" verticalAlign = "middle">
          <Grid.Row>
            <Grid.Column>
                APPETIZERS
                <Menu vertical fluid>
                    {menuItems.map((menuItem) => 
                    {
                        if (menuItem.category == "appetizer")
                        {
                            return (<Menu.Item>{menuItem.name}. . .{menuItem.price}
                                <Popup
                                trigger={<Button value = {menuItem.name} icon='add' compact onClick = {handleClick}/>}
                                content = "Click here to add this item to your cart"
                                basic/>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Column>
            <Grid.Column>
                ENTREES
                <Menu vertical fluid>
                    {menuItems.map((menuItem) => 
                    {
                        if (menuItem.category == "entree")
                        {
                            return (<Menu.Item>{menuItem.name}. . .{menuItem.price}
                                <Popup
                                trigger={<Button value = {menuItem.name} icon='add' compact onClick = {handleClick}/>}
                                content = "Click here to add this item to your cart"
                                basic/>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Column>
            <Grid.Column>
                DESSERTS
                <Menu vertical fluid>
                    {menuItems.map((menuItem) => 
                    {
                        if (menuItem.category == "dessert")
                        {
                            return (<Menu.Item>{menuItem.name}. . .{menuItem.price}
                                <Popup
                                trigger={<Button value = {menuItem.name} icon='add' compact onClick = {handleClick}/>}
                                content = "Click here to add this item to your cart"
                                basic/>
                            </Menu.Item>);
                        }
                    })}
                </Menu>
            </Grid.Column>
          </Grid.Row>
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
import { List, Header, Grid, Menu, Container } from 'semantic-ui-react'
import axios from 'axios'

function MenuPage({ menuItems })
{
    return (<>
        <Header color = "teal" textAlign = "center">
            This is the menu.
        </Header>
        <Grid columns={3} divided textAlign = "center" verticalAlign = "middle">
          <Grid.Row>
            <Grid.Column>
                APPETIZERS
                <Menu vertical fluid>
                {menuItems.map((menuItem) => (
                <Menu.Item>{menuItem.name}. . .{menuItem.price}</Menu.Item>
                ))}
                </Menu>
            </Grid.Column>
            <Grid.Column>
                ENTREES
                <Menu vertical fluid>
                {menuItems.map((menuItem) => (
                <Menu.Item>{menuItem.name}. . .{menuItem.price}</Menu.Item>
                 ))}
                </Menu>
            </Grid.Column>
            <Grid.Column>
                DESSERTS
                <Menu vertical fluid>
                {menuItems.map((menuItem) => (
                <Menu.Item>{menuItem.name}. . .{menuItem.price}</Menu.Item>
                 ))}
                </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>);
      /*
    return (<>
        <Header textAlign = "center">
            This is the menu.
        </Header>
        <List>
        {menuItems.map((menuItem) => (
            <List.Item>{menuItem.name}. . .{menuItem.price}</List.Item>
        ))}
        </List>
      </>);
      */
}

export async function getStaticProps()
{
  const url = "http://localhost:3000/api/menu"
  const response = await axios.get(url);
  const menuItems = response.data;
  console.log(menuItems);
  return {props : { menuItems } };
}

export default MenuPage;
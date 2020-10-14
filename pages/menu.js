import { List, Header, Grid } from 'semantic-ui-react'
import axios from 'axios'

function Menu({ menuItems })
{
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
}

export async function getStaticProps()
{
  const url = "http://localhost:3000/api/menu"
  const response = await axios.get(url);
  const menuItems = response.data;
  console.log(menuItems);
  return {props : { menuItems } };
}

export default Menu;
import { List, Header, Grid } from 'semantic-ui-react'
import axios from 'axios'

function EmployeeHome({ orders })
{
    return (<>
        <Header textAlign = "center">
            Here are the current orders:
        </Header>
        <List>
        {orders.map((order) => (
            <List.Item>{order.name}. . .{order.price}</List.Item>
        ))}
        </List>
      </>);
}

export async function getStaticProps()
{
  const url = "http://localhost:3000/api/orders"
  const response = await axios.get(url);
  const orders = response.data;
  console.log(orders);
  return {props : { orders } };
}

export default EmployeeHome;
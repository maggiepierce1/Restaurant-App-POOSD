import { Form, Container, Header, Grid, Segment, Button } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'
import Router from 'next/router'
import axios from 'axios'

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.loginAsCustomer = this.loginAsCustomer.bind(this);
    this.loginAsEmployee = this.loginAsEmployee.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  async loginAsCustomer(event)
  {
    // localStorage.setItem('valid', false);
    const isValid = await validateUserCredentials(this.username.current.value, this.password.current.value);
    alert(isValid);
    if (isValid == false)
    {
      alert("Invalid username or password. Please try again.");
    }
    else
    {
      Router.push('/customerhome');
    }
    event.preventDefault();
  }
  async loginAsEmployee(event)
  {
    validateUserCredentials(this.username.current.value, this.password.current.value);
    const isValid = localStorage.getItem('valid');
    if (isValid == "false")
    {
      alert("Invalid username or password. Please try again.");
    }
    else
    {
      Router.push('/employeehome');
    }
    event.preventDefault();
  }

  render() 
  {
    return (<>
    <Grid style={{ height: '75vh' }} textAlign = "center" verticalAlign = "middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as = "h2" size = "large" textAlign = "center">
            Log in to your account:
        </Header>
        <Form size = 'large'>
          <Segment size = 'massive' stacked>
            <Form.Field>
            <input type = "text" ref = {this.username} placeholder = 'E-mail Address'/>
            </Form.Field>
            <Form.Field>
            <input type = "password" ref = {this.password} placeholder = 'Password'/>
            </Form.Field>
            <Segment.Inline>
              <Button color = 'blue' onClick = {this.loginAsCustomer}>
                  Log in as customer
              </Button>
              <Button color = 'green' onClick = {this.loginAsEmployee}> 
                  Log in as employee
              </Button>
            </Segment.Inline>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    </>);
  }
}

export async function validateUserCredentials(username, password)
{
  const url = "http://localhost:3000/api/validateuser"
  const response = await axios.post(url, { username, password });
  const user = response.data;
  localStorage.setItem('username', username);
  return response.data;
}

export default Login;

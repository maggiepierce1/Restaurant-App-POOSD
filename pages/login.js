import { Form, Container, Header, Grid, Segment, Button } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'
import Router from 'next/router'

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

  loginAsCustomer(event)
  {
    if (!validateUserCredentials(this.username.current.value, this.password.current.value))
    {
      alert("Invalid username or password. Please try again.");
    }
    Router.push('/customerhome');
    event.preventDefault();
  }
  loginAsEmployee(event)
  {
    if (!validateUserCredentials(this.username.current.value, this.password.current.value))
    {
      alert("Invalid username or password. Please try again.");
    }
    Router.push('/employeehome');
    event.preventDefault();
  }

  render() 
  {
    return (<>
    <Grid style={{ height: '100vh' }} textAlign = "center" verticalAlign = "middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as = "h2" size = "large" textAlign = "center">
            Log in to your account:
        </Header>
        <Form size = 'large'>
          <Segment stacked>
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
  localStorage.setItem('username', username);
  return true;
}

export default Login;

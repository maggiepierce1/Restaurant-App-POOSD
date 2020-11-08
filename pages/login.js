import { Form, Container, Header } from 'semantic-ui-react'
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
    <Header textAlign = "center">
        Log in to your account:
    </Header>
    <Container>
        <Form>
            <Form.Field>
            <label>Username</label>
            <input type = "text" ref = {this.username} placeholder = 'Username'/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input type = "text" ref = {this.password} placeholder = 'Password'/>
            </Form.Field>
            <Form.Button onClick = {this.loginAsCustomer}>
                Log in as customer
            </Form.Button>
            <Form.Button onClick = {this.loginAsEmployee}> 
                Log in as employee
            </Form.Button>

        </Form>
    </Container>
    </>);
  }
}

export async function validateUserCredentials(username, password)
{
  localStorage.setItem('username', username);
  return true;
}

export default Login;

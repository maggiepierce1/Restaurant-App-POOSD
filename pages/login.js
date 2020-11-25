import { Form, Container, Header, Grid, Segment, Button, Image } from 'semantic-ui-react'
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
    if (isValid == false)
    {
      alert("Invalid username or password. Please try again.");
    }
    else
    {
      // const name = getUserName(this.username.current.value);
      Router.push('/customerhome');
    }
    event.preventDefault();
  }
  async loginAsEmployee(event)
  {
    const isValid = await validateUserCredentials(this.username.current.value, this.password.current.value);
    if (isValid == false)
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
    <Grid stretched style={{ height: '90vh' }} textAlign = "center" verticalAlign = "middle">
      <Grid.Column width = '5' textAlign = "center" style={{ maxWidth: 450 }}>
        <Form inline style = {{width: 450 }} size = 'large'>
          <Segment size = 'massive'>
            <Container fluid style={{ width: 420, height: 180, opacity: 0.8, display: 'inline-block', backgroundImage: "url('images/login4.jpg')", textAlign: 'center', backgroundSize: 'cover', padding: '70px' }} inverted as = "h1" size = "large" textAlign = "center" verticalAlign = "middle">
            <Header as = 'h2' style={{width: 200, color: '#FFFFFF', fontStyle: 'bold', fontSize: '50px', textAlign: 'center', display: 'inline-block'}}>Log In</Header>
            </Container>
            <Form.Field>
            <input type = "text" ref = {this.username} placeholder = 'E-mail Address'/>
            </Form.Field>
            <Form.Field>
            <input type = "password" ref = {this.password} placeholder = 'Password'/>
            </Form.Field>
            <Segment.Inline>
              <Button inverted style={{ backgroundColor: '#c95b0c' }} onClick = {this.loginAsCustomer}>
                  Log in as customer
              </Button>
              <Button inverted style={{ backgroundColor: '#c95b0c' }} onClick = {this.loginAsEmployee}> 
                  Log in as employee
              </Button>
            </Segment.Inline>
          </Segment>
          <Link href = '/signup'><Button inverted style={{ backgroundColor: '#393433' }} size = 'huge' fluid>New to us? Create an account</Button></Link>
        </Form>
      </Grid.Column>
    </Grid>
    </>);
  }
}

export async function validateUserCredentials(username, password)
{
  const url = "https://poosdrestaurantapp.vercel.app/api/validateuser"
  const response = await axios.post(url, { username, password });
  const user = response.data;
  localStorage.setItem('username', username);
  return response.data;
}
/*
export async function getUserName(username)
{
  const url = "http://localhost:3000/api/getName"
  const response = await axios.get(url, {params : {name : username}});
  localStorage.setItem('username', response.data);
  return response.data;
}
*/

export default Login;

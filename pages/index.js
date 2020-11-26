import { Form, Container, Header, Grid, Segment, Button, Image } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
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
    const isValid = await validateUserCredentials(this.username.current.value, this.password.current.value, "customer");
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
    const isValid = await validateUserCredentials(this.username.current.value, this.password.current.value, "employee");
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
      <Grid.Column mobile = '16' width = '5' textAlign = "center" style={{ maxWidth: 450 }}>
        <Form style = {{width: 450 }} size = 'large'>
          <Segment style = {{backgroundColor : '#fbfbfb' }} size = 'massive'>
            <Container fluid style={{ width: 420, height: 250, opacity: 0.9, display: 'inline-block', backgroundImage: "url('images/loginimage.jpg')", textAlign: 'center', backgroundSize: 'cover', padding: '80px' }} as = "h1" size = "large" textAlign = "center">
            <Header as = 'h2' style={{width: 200, color: '#000000', fontStyle: 'bold', fontSize: '50px', textAlign: 'center', display: 'inline-block'}}>Log In</Header>
            </Container>
            <Form.Field>
            <input type = "text" ref = {this.username} placeholder = 'E-mail Address'/>
            </Form.Field>
            <Form.Field>
            <input type = "password" ref = {this.password} placeholder = 'Password'/>
            </Form.Field>
            <Segment.Inline>
              <Button inverted style={{ backgroundColor: '#aa4323', width: 182 }} onClick = {this.loginAsCustomer}>
                  Log in as customer
              </Button>
              <Button inverted style={{ backgroundColor: '#aa4323', width: 182 }} onClick = {this.loginAsEmployee}> 
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

export async function validateUserCredentials(username, password, mode)
{
  // const url = "http://localhost:3000/api/validateuser"
  const url = "https://poosdrestaurantapp.vercel.app/api/validateuser"
  const response = await axios.post(url, { username, password, mode });
  localStorage.setItem('username', username);
  return response.data;
}

export default Login;

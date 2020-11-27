import { Form, Container, Header, Grid, Segment, Button } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import Router from 'next/router'

class Signup extends React.Component
{
  constructor(props)
  {
    super(props);
    this.signup = this.signup.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {mode : "none"};
  }

  async signup(event)
  {
    var re = /\S+@\S+\.\S+/;
    const email = this.username.current.value;
    const password = this.password.current.value;
    var successfulSignup = false;
    if (email.length >= 75 || password.length >= 75)
    {
      alert("Input must be less than 75 characters.");
    }
    else if (re.test(String(this.username.current.value).toLowerCase()) == false)
    {
      alert("Please enter a valid email address.");
    }
    else
    {
      successfulSignup = await createAccount(this.username.current.value, this.password.current.value, event.currentTarget.value);
    }

    if (successfulSignup)
      Router.push('/');
    else
      alert("There is already an account associated with this e-mail address. Please try again, or return to login.");
    
    event.preventDefault();
  }

  setAccountMode(event)
  {
    const mode = event.currentTarget.value;
    this.setState({mode : mode});
    event.preventDefault();
  }

  render() 
  {
    return (<>
      <Grid stretched style={{ height: '90vh' }} textAlign = "center" verticalAlign = "middle">
        <Grid.Column width = '5' textAlign = "center" style={{ maxWidth: 450 }}>
          <Form style = {{width: 450 }} size = 'large'>
            <Segment style = {{backgroundColor : '#fbfbfb' }} size = 'massive'>
              <Container fluid style={{ width: 420, height: 250, opacity: 0.9, display: 'inline-block', backgroundImage: "url('images/loginimage.jpg')", textAlign: 'center', backgroundSize: 'cover', padding: '80px' }} as = "h1" size = "large" textAlign = "center">
              <Header as = 'h2' style={{width: 200, color: '#000000', fontStyle: 'bold', fontSize: '50px', textAlign: 'center', display: 'inline-block'}}>Sign Up</Header>
              </Container>
              <Form.Field>
              <input type = "text" ref = {this.username} placeholder = 'E-mail Address'/>
              </Form.Field>
              <Form.Field>
              <input type = "password" ref = {this.password} placeholder = 'Password'/>
              </Form.Field>
              <Segment.Inline>
                <Button inverted style={{ backgroundColor: '#aa4323', width: 182 }} onClick = {this.signup}>
                    Sign up as customer
                </Button>
                <Button inverted style={{ backgroundColor: '#aa4323', width: 182 }} onClick = {this.signup}> 
                    Sign up as employee
                </Button>
              </Segment.Inline>
            </Segment>
            <Link href = '/'><Button inverted style={{ backgroundColor: '#393433' }} size = 'huge' fluid>Already a member? Log in</Button></Link>
          </Form>
        </Grid.Column>
      </Grid>
      </>);
  }
}

export async function createAccount(username, password, mode)
{
  // const url = "http://localhost:3000/api/createAccount"
  const url = "https://poosdrestaurantapp.vercel.app/api/createAccount"
  const response = await axios.post(url, { username, password, mode });
  return response.data;
}

export default Signup;
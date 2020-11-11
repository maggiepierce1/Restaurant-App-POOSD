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

  signup(event)
  {
    createAccount(this.username.current.value, this.password.current.value, event.currentTarget.value);
    Router.push('/login');
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
    <Grid style={{ height: '75vh' }} textAlign = "center" verticalAlign = "middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as = "h2" size = "large" textAlign = "center">
            Create an account:
        </Header>
        <Form size = 'large'>
          <Segment size = 'massive' stacked>
              <Form.Field>
              <input type = "text" ref = {this.username} placeholder = 'E-mail Address'/>
              </Form.Field>
              <Form.Field>
              <input type = "text" ref = {this.password} placeholder = 'Password'/>
              </Form.Field>
              <Segment.Inline>
                <Button value = {"customer"} onClick = {this.signup}>
                    Sign up as customer
                </Button>
                <Button value = {"employee"} onClick = {this.signup}> 
                    Sign up as employee
                </Button>
              </Segment.Inline>
          </Segment>
        </Form>
      </Grid.Column>
  </Grid>
    </>);
  }
}

export async function createAccount(username, password, mode)
{
  const url = "http://localhost:3000/api/createAccount"
  const response = await axios.post(url, { username, password, mode });
  return true;
}

export default Signup;
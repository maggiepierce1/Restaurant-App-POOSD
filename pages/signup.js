import { Form, Container, Header } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'

class Signup extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAccountMode = this.setAccountMode.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {mode : "none"};
  }

  handleSubmit(event)
  {
    createAccount(this.username.current.value, this.password.current.value, this.state.mode);
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
    <Header textAlign = "center">
        Log in to your account:
    </Header>
    <Container>
        <Form onSubmit = {this.handleSubmit}>
            <Form.Field>
            <label>Username</label>
            <input type = "text" ref = {this.username} placeholder = 'Username'/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input type = "text" ref = {this.password} placeholder = 'Password'/>
            </Form.Field>
            <Form.Button value = {"customer"} onClick = {this.setAccountMode}>
                Sign up as customer
            </Form.Button>
            <Form.Button value = {"employee"} onClick = {this.setAccountMode}> 
                Sign up as employee
            </Form.Button>
        <input type = "submit"/>
        </Form>
    </Container>
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
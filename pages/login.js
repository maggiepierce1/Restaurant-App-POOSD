import { Form, Container, Header } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit(event)
  {
    if (!validateUserCredentials(this.username.current.value, this.password.current.value))
    {
      alert("Invalid username or password. Please try again.");
    }
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
            <Link href = "/customerhome">
                <Form.Button>
                    Log in as customer
                </Form.Button>
            </Link>
            <Link href = "/employeehome">
                <Form.Button> 
                    Log in as employee
                </Form.Button>
            </Link>
        <input type = "submit"/>
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

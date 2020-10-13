import { Form, Container, Header } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'

class Login extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event)
  {
    console.log("oooh, something was submitted!");
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
            <input placeholder = 'Username'/>
            </Form.Field>
            <Form.Field>
            <label>Password</label>
            <input placeholder = 'Password'/>
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
        </Form>
    </Container>
    </>);
  }
}

export default Login;

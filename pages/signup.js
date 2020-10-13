import { Form, Container, Header } from 'semantic-ui-react'
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
        Create a new account:
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
            <Form.Button> Submit
            </Form.Button>
        </Form>
    </Container>
    </>);
  }
}

export default Login;
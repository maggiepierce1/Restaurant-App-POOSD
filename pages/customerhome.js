import { Button, Grid, Header, Divider, Icon, Image, Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Link from 'next/link'

class CustomerHome extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {username : ""};
        this.state = {readyToRender : false};
    }
    async componentDidMount()
    {
        const name = localStorage.getItem('username');
        this.setState({username : name});
        this.setState({readyToRender : true});
    }
    render ()
    {
        if (this.state.readyToRender)
        {
            return (<>
            <Header style={{ backgroundColor: '#393433' }} size = "large" inverted as = 'h1' block size = "huge" color = "grey" textAlign = "center">
                <Grid columns = {3}>
                    <Grid.Column textAlign = "left"><Link href = '/customerhome'><Button size = "huge"><Icon name = "arrow alternate circle left"></Icon>Back</Button></Link></Grid.Column>
                    <Grid.Column verticalAlign = "middle">Welcome!</Grid.Column>
                    <Grid.Column textAlign = "right"><Link href = '/login'><Button size = "huge">Log Out<Icon name = "arrow alternate circle right"></Icon></Button></Link></Grid.Column>
                </Grid>
            </Header>
            <Divider horizontal></Divider>
            <Grid style={{ height: '75vh'}} textAlign = "center" verticalAlign = "middle">
                <Grid.Column width = '3'>
                    <Grid.Row>
                        <Card>
                        <Image src = 'https://images.unsplash.com/photo-1561043433-9265f73e685f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header textAlign = 'center'>Hungry?</Card.Header>
                                <Card.Description>
                                    Check out all we have to offer. 
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Link href = "/menu">
                                        <Button inverted style={{ backgroundColor: '#c95b0c' }} fluid>
                                            View menu<Icon name = "arrow alternate circle right"></Icon>
                                        </Button>
                                    </Link>
                            </Card.Content>
                        </Card>
                    </Grid.Row>
                </Grid.Column>.
                <Grid.Column width = '3'>
                    <Grid.Row>
                        <Card>
                            <Image src = 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header textAlign = 'center'>Ready to checkout?</Card.Header>
                                    <Card.Description>
                                        We'll have it ready in no time.  
                                    </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Link href = "/cart">
                                            <Button inverted style={{ backgroundColor: '#c95b0c' }} fluid>
                                                Check Out<Icon name = "arrow alternate circle right"></Icon>
                                            </Button>
                                        </Link>
                                </Card.Content>
                            </Card>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width = '3'>
                    <Grid.Row>
                        <Card>
                            <Image src = 'https://images.unsplash.com/photo-1597933856545-b9ee519aa0ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header textAlign = 'center'>Already Ordered?</Card.Header>
                                    <Card.Description>
                                        Find out when it'll be ready. 
                                    </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Link href = "/orderstatus">
                                            <Button inverted style={{ backgroundColor: '#c95b0c' }} fluid>
                                                View Order Status<Icon name = "arrow alternate circle right"></Icon>
                                            </Button>
                                        </Link>
                                </Card.Content>
                            </Card>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
            </>);
        }
        else
        {
            return null;
        }
    }
}

export default CustomerHome;
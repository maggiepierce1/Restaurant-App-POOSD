import { Button, Grid, Header, Divider } from 'semantic-ui-react'
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
            <Header textAlign = "center" block color = "white" inverted size = "huge">Welcome, {this.state.username}!</Header>
            <Divider horizontal></Divider>
            <Grid style={{ height: '75vh' }} textAlign = "center" verticalAlign = "middle">
                <Grid.Column>
                    <Grid.Row> 
                        <Link href = "/menu">
                            <Button size = "massive">
                                View menu
                            </Button>
                        </Link>
                    </Grid.Row>
                    <Divider horizontal></Divider>
                    <Grid.Row>
                        <Link href = "/cart">
                            <Button size = "massive">
                                Check Out
                            </Button>
                        </Link>
                    </Grid.Row>
                    <Divider horizontal></Divider>
                    <Grid.Row>
                        <Link href = "/orderstatus">
                            <Button size = "massive">
                                View Order Status
                            </Button>
                        </Link>
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
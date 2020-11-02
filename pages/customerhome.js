import { Button } from 'semantic-ui-react'
import Link from 'next/link'

class CustomerHome extends React.Component
{
    render ()
    {
        return (<>
        <Link href = "/menu">
            <Button>
                View menu
            </Button>
        </Link>
        <Link href = "/cart">
            <Button>
                View cart
            </Button>
        </Link>
            <Button>
                Check out
            </Button>
        </>);
    }
}

export default CustomerHome;
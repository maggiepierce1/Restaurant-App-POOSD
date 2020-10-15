import { Button } from 'semantic-ui-react'
import Link from 'next/link'

class CustomerHome extends React.Component
{
    render ()
    {
        return (<>
        <Link href = "/menu">
            <Button>
                Go to menu.
            </Button>
        </Link>
        </>);
    }
}

export default CustomerHome;
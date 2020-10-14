import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Header, Button, Container } from 'semantic-ui-react'
import Link from 'next/link'

export default function Home() 
{
  //request();
  return (<>
  <Header textAlign = "center">
    Welcome to the restaurant app!
  </Header>
  <Container textAlign = "center">
    <Link href = "/login">
      <Button>
        Log in
      </Button>
    </Link>
    <Link href = "/signup">
      <Button>
        Create an account
      </Button>
    </Link>
  </Container>
  </>);
}

/*
async function request()
{
  const url = "http://localhost:3000/api/menu"
  const response = await axios.get(url);
  console.log(response.data);
}
*/

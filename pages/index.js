import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() 
{
  request();
  return (<div>Welcome!</div>);
}

async function request()
{
  const url = "http://localhost:3000/api/menu"
  const response = await axios.get(url);
  console.log(response.data);
}

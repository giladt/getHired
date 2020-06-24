import React, {useState} from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default (props:any) => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  darkModeMediaQuery.addListener((e) => {
    setDarkMode(e.matches);
  });

  return(
    <Navbar sticky="top" bg={darkMode?'dark':'light'} variant={darkMode?'dark':'light'} expand="sm">
      <Navbar.Brand href="/admin">
        <img src='../images/logo.png' height='30' className="d-inline-block align-top" alt='TSABAR.net logo' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav lg">
        <Nav className="mr-auto">
          {
            props.links.map((link:any, idx:any)=>{
              return (
              <Nav.Item key={idx}>
                <Nav.Link href={link.url}>{link.name}</Nav.Link>
              </Nav.Item>
              )
            })
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};
import React from 'react';
//import { NavDropdown } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function Header() {
    return (
        <div>
            <span className='max'>MAX SOLUTION</span>
            
   {/*           <Navbar className='nav' bg="blue" variant="red"> 
                <Nav  className="mr-auto navbar_warapper">
                   
                        <Link to="/home" >Home</Link>
                        <Link to="/aide" >aide</Link>
                        <Link to="/login" >login</Link>
                                     
                                  


                    </Nav>
                
            </Navbar> */}
            

        </div>

    );

}


export default Header;
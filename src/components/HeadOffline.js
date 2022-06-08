import NavDropdown from 'react-bootstrap/NavDropdown';
//import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function HeadOffline() {

    const history = useHistory();
    let user = JSON.parse('' + localStorage.getItem('user-info'))

    function logout() {
        localStorage.clear();
        history.push("/")
    }


    return (

        <div className="header">
            <span style={{marginRight:'300px', marginLeft:'300px'}}>MAX SOLUTION </span>
            {

                localStorage.getItem("user-info") ?

                    <>
 
{/*                         <a href=''  onClick={logout} className="conn"  href="#">{user.username} (déconnexion)</a>
 */}                    </>
                    :
                    null
            }
        </div>
    )
}

export default HeadOffline;
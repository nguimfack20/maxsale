import SideBar from "./SideBar";


function Aide(props)
{

    console.log(props)
    return(
        <div>
            
            <h1>Aide Page{props.depot}</h1>

            <SideBar />
            
        </div>
    )
}

export default Aide;
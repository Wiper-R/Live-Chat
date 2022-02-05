import styled from "styled-components";
import Channels from "./Channels";
import Menu from "./Menu";
import Search from "./Search";


const SidebarWrapper = ({className}) => {
    return (
        <div className={`d-flex flex-shrink-0 flex-column text-white ${className}`}>
            <Search/>
            <Channels/>
            <Menu/>
        </div>
    )
}

const Sidebar = styled(SidebarWrapper)`
    z-index: 1;
    width: 280px;
    height: 100vh;
    background-color: #383838;
    box-shadow: 0px 0px 2px black;
`


export default Sidebar;
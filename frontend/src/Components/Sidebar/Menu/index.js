import styled from "styled-components";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";


const MenuSkeletonWrapper = ({className}) => {
    return (
        <div className={`flex-row align-items-center d-flex ${className}`}>
            <span className="avatar skeleton"/>
            <div className="description">
                <span className="skeleton"></span>
                <span className="skeleton"></span>
            </div>
        </div>
    )
}

const MenuSkeleton = styled(MenuSkeletonWrapper)`
span.avatar{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: none;
    display: block;
    object-fit: cover;
}

.description{
    margin-left: 8px;
}

.description span{
    height: .6em;
    background-color: gray;
    display: block;
}

.description span:nth-child(1n){
    width: 8em;
}

.description span:nth-child(2n){
    margin-top: 8px;
    width: 5em;
}
`
const MenuWrapper = ({ className }) => {
    const [content, setContent] = useState("Click to copy username");
    const [show, setShow] = useState(false);
    const { user } = useSelector(state => state.auth);

    const tooltip = (props) => {
        return (
            <Tooltip {...props} id="copy_username_tooltip" inputMode="none">
                {content}
            </Tooltip>
        )
    }

    const handleClick = (e) => {
        setShow(false);
        setContent("Copied!");
        const username = document.querySelector('#__username');
        navigator.clipboard.writeText(username.innerText);
        setTimeout(() => {
            setShow(true);
            const tt = document.querySelector('#copy_username_tooltip');
            tt.style.display = 'block';
            tt.classList.toggle('clicked', true);
        })

        setTimeout(() => {
            setShow(false);
            setContent("Click to copy username");
        }, 1500);

        setTimeout(() => {
            const tt = document.querySelector('#copy_username_tooltip');
            tt.style.display = 'none';
        }, 1480)
    }

    const onEnterDescription = () => {
        if (!show) {
            setShow(true);
        }
    }

    const onLeaveDescription = () => {
        if (content !== "Copied!" && show) {
            setShow(false);
        }
    }

    return (
        <div className={`container flex-row align-items-center d-flex ${className}`}>
            {
                user ?
                    <>
                        <img src={`http://127.0.0.1:5000/static/profiles/${user.id}.png`} className="rounded-circle" />
                        <OverlayTrigger placement="top" overlay={tooltip} show={show} delay={{ show: 0, hide: 0 }}>
                            <div onMouseEnter={onEnterDescription} onMouseLeave={onLeaveDescription} onClick={handleClick} className="d-flex container-fluid ps-2 flex-column justify-content-center description">
                                <span className="fs-6 fw text fullname">
                                    {`${user.firstname} ${user.lastname}`}
                                </span>
                                <span className="fs-8 fw-light username" id="__username">
                                    @{user.username}
                                </span>
                            </div>
                        </OverlayTrigger>
                    </> :
                    <MenuSkeleton />
            }
            <button id="settings-btn" className="ms-auto">
                <i className="fas fa-cog"></i>
            </button>
        </div>
    )
}

const Menu = styled(MenuWrapper)`
    img{
        height: 40px;
        object-fit: cover;
    }

    background-color: #292b2f;

    padding: 10px;

    & .description{
        cursor: pointer;
    }

    & .fullname{
        font-size: 0.9rem !important;
        max-width: 14em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;    
        color: #ebebeb;    
    }

    & .username{
        margin-top: -5px;
        font-size: 0.8rem !important;
        color: #c7c6c5;
        max-width: 15.5em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #settings-btn{
        background: transparent;
        color: #c7c6c5;
        outline: none;
        border: none;
    }
`


export default Menu;
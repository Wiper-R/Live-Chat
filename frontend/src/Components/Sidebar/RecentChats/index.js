import { useEffect } from "react";
import styled from "styled-components";
import RecentChat from "./RecentChat";
import { useDispatch } from "react-redux";
import { LoadRecentChats } from "../../../store/Reducers/VariablesReducer/RecentChatsReducer";
import { useSelector } from "react-redux";


const RecentsChatWrapper = ({className}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const recentChats = useSelector(state => state.variables.recentChats);

    useEffect(() => {
        if (isLoggedIn){
            dispatch(LoadRecentChats());
        }
    }, [isLoggedIn])
    
    return (
        <div className={`d-flex flex-column flex-grow-1 mb-auto ${className}`}>
            {!recentChats.isFetching ? recentChats.data.map((e) => <RecentChat key={e.user.username} fullname={`${e.user.firstname} ${e.user.lastname}`} username={e.user.username} id={e.user.id}/>) : <></>}
        </div>
    )
}

const RecentChats = styled(RecentsChatWrapper)` 
    & .recent-chat:not(:first-child) .description{
        border-top: 1px solid gray;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent; 
    }

    ::-webkit-scrollbar-thumb {
        background: transparent; 
    }

    &:hover::-webkit-scrollbar-thumb{
        background: #737874;
    }
  
    overflow-y: scroll;
    overflow-x: hidden;
`


export default RecentChats;
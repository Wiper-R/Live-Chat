import { useEffect } from "react";
import styled from "styled-components";
import Channel from "./Channel";
import { useDispatch } from "react-redux";
import { LoadChannels } from "../../../store/Reducers/VariablesReducer/ChannelsReducer";
import { useSelector } from "react-redux";


const RecentsChatWrapper = ({className}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const Channels = useSelector(state => state.variables.Channels);

    useEffect(() => {
        if (isLoggedIn){
            dispatch(LoadChannels());
        }
    }, [isLoggedIn])
    
    return (
        <div className={`d-flex flex-column flex-grow-1 mb-auto ${className}`}>
            {!Channels.isFetching ? Channels.data.map((e) => <Channel key={e.user.username} fullname={`${e.user.firstname} ${e.user.lastname}`} username={e.user.username} id={e.user.id}/>) : <></>}
        </div>
    )
}

const Channels = styled(RecentsChatWrapper)` 
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


export default Channels;
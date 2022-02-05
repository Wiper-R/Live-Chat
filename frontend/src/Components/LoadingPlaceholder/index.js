import styled from "styled-components";

const LoadingPlaceholderWrapper = ({className}) => {
    return (
        <div className={`d-flex justify-content-center align-items-center ${className}`}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

const LoadingPlaceholder = styled(LoadingPlaceholderWrapper)`
height: 100vh;
width: 100vw;

background-color: #36393f;

.spinner-border {
    width: 50px; 
    height: 50px;

    border: 5px solid white;
    border-right-color: transparent;
}
`

export default LoadingPlaceholder;
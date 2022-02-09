import styled from "styled-components";

const SearchWrapper = ({ className }) => {
  return (
    <div className={`container ${className}`}>
      <input
        className="form-control"
        type="search"
        placeholder="Search for a chat"
        data-search-recent-chats
      />
    </div>
  );
};

const Search = styled(SearchWrapper)`
  padding: 10px;
  border-bottom: 1px solid gray;

  [data-search-recent-chats] {
    border-radius: 1.5em;
    padding: 5px 10px;
    padding-left: 15px;
    font-size: 0.8rem;
    box-shadow: none;
  }
`;

export default Search;

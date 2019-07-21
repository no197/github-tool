import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const [text, setText] = useState("");
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { clearUsers } = githubContext;
  const { setAlert } = alertContext;

  const handleOnChange = event => {
    const { value: text } = event.target;
    setText(text);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!text.length) {
      setAlert("Please enter somthing", "light");
    } else {
      githubContext.handleOnSearchUsers(text);
      setText(text);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="text"
          id=""
          placeholder="Search user..."
          autoComplete="off"
          value={text}
          onChange={handleOnChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block "
        />
      </form>
      {githubContext.users.length > 0 && (
        <button onClick={clearUsers} className="btn btn-light btn-block">
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;

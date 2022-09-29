import React from "react";
import axios from "axios";

const App = () => {
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    // Try to make GET request to BE, fetch data
    // display on the screen
    axios.get("http://localhost:8000/api")
    .then((res) => {
      setContent(res.data);
    }).catch();
  }, []);

  return (
    <div>
      <div>Hellfo from client side</div>
      <hr />
      <h1>{content}</h1>
    </div>
  );
}

export default App;

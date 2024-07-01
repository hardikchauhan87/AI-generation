import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
//!Function that must return a promise (useMutation)
const makeRequestAPI = async (prompt) => {
  const res = await axios.post("http://localhost:8080/generate", { prompt });
  return res.data;
};

function App() {
  const [prompt, setPrompt] = useState("");
  //!mutation
  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
  });
  //!submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };
  console.log(mutation);
  return (
  <div>
  <nav className="navbar navbar-expand-sm bg-light navbar-light">
  <div className="container-fluid">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link active">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" >Contact me</a>
      </li>
     
      <li className="nav-item">
     
      </li>
    </ul>
  </div>
</nav>


    <div className="App">
      <header id="main-head">Gemini AI Content Generator</header>
      <p>Enter a prompt and let Gemini AI craft a unique content for you.</p>
      <form className="App-form" onSubmit={submitHandler}>
        <label htmlFor="Enter your prompt:"></label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a content about..."
          className="input-content"
        /> <br />
        <button id="btn-con" className="btn btn-outline-dark" type="submit">
          Generate Content
        </button>
        <section className="App-response">
          {mutation.isPending && <p>Generating your content</p>}
          {mutation.isError && <p>{mutation.error.message}</p>}
          {mutation.isSuccess && <p><mark>{mutation.data}</mark></p>}
        </section>
      </form>
    </div>
    </div>
  );
}

export default App;
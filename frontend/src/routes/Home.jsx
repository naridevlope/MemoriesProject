import { useState, useEffect } from "react";
import axios from "../axios-config";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [memories, setMemories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getMemories = async () => {
      const res = await axios.get("/memories");
      setMemories(res.data);
    };
    getMemories();
  }, []);

  const searchLowerCase = search.toLocaleLowerCase();
  const filterMemories = memories.filter(
    (memory) =>
      memory.title.toLowerCase().includes(searchLowerCase) ||
      memory.description.toLowerCase().includes(searchLowerCase)
  );

  return (
    <div className="home">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        placeholder="Pesquise suas memórias "
      />
      <h2>Confira as suas memórias</h2>
      <div className="memories-container">
        {memories.length > 0 &&
          filterMemories.map((memory) => (
            <div className="memory" key={memory._id}>
              <Link to={`/memories/${memory._id}`}>
                <img
                  src={`${axios.defaults.baseURL}${memory.src}`}
                  alt={memory.title}
                />
              </Link>
              <p>{memory.title}</p>
              <Link className="btn" to={`/memories/${memory._id}`}>
                Comentar
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;

import "./App.css";
import { useState } from "react";
import { tempMusicData } from "./data/tempMusicData";
import { tempPlaylist } from "./data/tempPlaylist";

function Navbar({ musics, query, setQuery }) {
  //structural component
  return (
    <nav className="container">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumberResult musics={musics} />
    </nav>
  );
}
function Logo() {
  //stateless component
  return <h1 style={{ textAlign: "center" }}>Music App Logo</h1>;
}

function NumberResult({ musics }) {
  //for now, stateless component
  return (
    <p>
      Found <strong>{musics.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  //stateful component
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Music({ musics }) {
  //stateless component
  return (
    <ul>
      {musics.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist} ({music.genre})<button>♥️</button>
        </li>
      ))}
    </ul>
  );
}

function Box({ content, musics, playlist }) {
  return <div className="container">{content}</div>;
}

function Playlist({ playlist }) {
  //stateless component
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <p>
            <span>⭐</span>
            <span>{music.rating}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

function Main({ musics, playlist, setPlaylist, addToPlaylist }) {
  return (
    <div className="container">
      <Box
        content={<Music musics={musics} />}
        musics={musics}
        playlist={playlist}
      />
      <Box
        content={<Playlist playlist={playlist} />}
        musics={musics}
        playlist={playlist}
      />
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [musics, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };

  return (
    <>
      <Navbar musics={musics} query={query} setQuery={setQuery} />

      <Main
        musics={musics}
        setMusic={setMusic}
        playlist={playlist}
        setPlaylist={setPlaylist}
        addToPlaylist={addToPlaylist}
      />
    </>
  );
}

//stateless or presentational component
//stateful component
//structural component

export default App;

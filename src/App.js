import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { tempMusicData } from "./data/tempMusicData";
import { tempPlaylist } from "./data/tempPlaylist";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MusicList from "./components/MusicList";
import Playlist from "./components/Playlist";
function App() {
  const [query, setQuery] = useState("");
  const [musics, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };

  return (
    <div>
      <Header />
      <SearchBar query={query} setQuery={setQuery} />
      <div className="container">
        <MusicList musics={musics} setMusic={setMusic} />
        <Playlist
          musics={musics}
          playlist={playlist}
          setPlaylist={setPlaylist}
          addToPlaylist={addToPlaylist}
        />
      </div>
    </div>
  );
}

export default App;

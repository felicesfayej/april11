import "./App.css";
import { useEffect, useState } from "react";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
// import { tempMusicData } from "./data/tempMusicData";
// import { tempPlaylist } from "./data/tempPlaylist";

function Navbar({ children, musics, setMusic, query, setQuery, search }) {
  //structural component
  return (
    <nav className="container">
      <Logo />
      <Search
        query={query}
        setQuery={setQuery}
        search={search}
        musics={musics}
        setMusic={setMusic}
      />
      {children}
    </nav>
  );
}
function Logo() {
  //stateless component
  return <h1 style={{ textAlign: "center" }}>Faye's Music App 💗</h1>;
}

function NumberResult({ musics }) {
  //for now, stateless component
  return (
    <p>
      Found <strong>{musics.length}</strong> results
    </p>
  );
}

function Music({ musics, addToPlaylist }) {
  //stateless component
  const handleAddToPlaylist = (music) => {
    addToPlaylist(music);
  };
  return (
    <ul>
      <h2>Songs 🎶</h2>

      {musics.map((music) => (
        <li key={music.id}>
          <div className="row justify-content-between">
            <div className="col-4">
              {" "}
              {music.title} by {music.artist} ({music.genre})
              <p>
                <span>⭐</span>
                <span>{music.rating}</span>
              </p>
            </div>
            <div className="col-4">
              <button
                className="addToPlaylist"
                onClick={() => handleAddToPlaylist(music)}
              >
                <i className="bi bi-heart-fill"></i>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Box({ children, musics, playlist }) {
  return <div className="container box-container">{children}</div>;
}

function Playlist({
  playlist,
  removeFromPlaylist,
  children,
  sortAlphaDown,
  sortAlphaUp,
}) {
  //stateless component
  const handleRemoveFromPlaylist = (music) => {
    removeFromPlaylist(music);
  };
  return (
    <div>
      <h2>My playlist 🪐</h2>
      <button onClick={sortAlphaUp}>
        <i className="bi bi-sort-alpha-up"></i>
      </button>
      <button onClick={sortAlphaDown}>
        <i className="bi bi-sort-alpha-down"></i>
      </button>
      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            <div className="row justify-content-between">
              <div className="col-4">
                {music.title} by {music.artist}
                <p>
                  <span>⭐</span>
                  <span>{music.rating}</span>
                </p>
              </div>
              <div className="col-4">
                <button onClick={() => handleRemoveFromPlaylist(music)}>
                  <i className="bi bi-x-octagon-fill"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}

function Main({ children, musics, playlist, setPlaylist, addToPlaylist }) {
  return <div className="container">{children}</div>;
}

function Footer({ playlist }) {
  let songCount = playlist.length;
  let fiveStarCount = playlist.filter((song) => song.rating === 5).length;

  return (
    <div>
      <ul>
        <li>
          You have <strong>{songCount}</strong> songs in your playlist
        </li>
        <li>
          You added <strong>{fiveStarCount}</strong> songs that are rated 5⭐
        </li>
      </ul>
    </div>
  );
}

function Search({ query, setQuery, search, musics, setMusic }) {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function srch() {
    console.log("searching for " + query);

    var trackParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var tracks = await fetch(
      "https://api.spotify.com/v1/search?q=" + query + "&type=track&limit=50",
      trackParameters
    ).then((res) =>
      res.json().then((data) =>
        setMusic(
          data.tracks.items.map((track) => {
            return {
              id: track.id,
              title: track.name,
              artist: track.artists[0].name,
              rating: Math.round((track.popularity / 100) * 5),
            };
          })
        )
      )
    );
  }
  console.log(accessToken);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search song or artist..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          srch();
        }
      }}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        search(e.target.value);
      }}
    />
  );
}

const CLIENT_ID = "eb50e0a430b247bba51b0ef994d06e1b";
const CLIENT_SECRET = "35360305ec334ac2ae496c3ce4849c3c";
function App() {
  const [query, setQuery] = useState("");
  const [musics, setMusic] = useState([]); //tempMusicList
  const [playlist, setPlaylist] = useState([]); //tempPlaylist
  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };
  const removeFromPlaylist = (music) => {
    setPlaylist(playlist.filter((item) => item.id !== music.id));
  };

  const sortAlphaUp = () => {
    const sortedPlaylist = [...playlist].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setPlaylist(sortedPlaylist);
  };

  const sortAlphaDown = () => {
    const sortedPlaylist = [...playlist].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setPlaylist(sortedPlaylist);
  };

  const search = (searchQuery) => {
    setQuery(searchQuery);
  };

  const filteredMusic = musics.filter(
    (music) =>
      music.title.toLowerCase().startsWith(query.toLowerCase()) ||
      music.artist.toLowerCase().startsWith(query.toLowerCase())
  );

  const filteredPlaylist = playlist.filter(
    (music) =>
      music.title.toLowerCase().startsWith(query.toLowerCase()) ||
      music.artist.toLowerCase().startsWith(query.toLowerCase())
  );
  return (
    <>
      <Navbar
        musics={musics}
        setMusic={setMusic}
        query={query}
        setQuery={setQuery}
        search={search}
      >
        <NumberResult musics={musics} />
      </Navbar>
      <Main
        musics={musics}
        setMusic={setMusic}
        playlist={playlist}
        setPlaylist={setPlaylist}
        addToPlaylist={addToPlaylist}
      >
        <Box musics={musics} playlist={playlist}>
          <Music musics={filteredMusic} addToPlaylist={addToPlaylist} />
        </Box>
        <Box musics={musics} playlist={playlist}>
          <Playlist
            playlist={filteredPlaylist}
            removeFromPlaylist={removeFromPlaylist}
            sortAlphaDown={sortAlphaDown}
            sortAlphaUp={sortAlphaUp}
          >
            <Footer playlist={playlist} />
          </Playlist>
        </Box>
      </Main>
    </>
  );
}

export default App;

// function App() {
//   // fetch("https://jsonplaceholder.typicode.com/todos").then((result) =>
//   //   result.json().then((data) => console.log(data))
//   // );

//   async function getTodos() {
//     const result = await fetch("https://jsonplaceholder.typicode.com/todos");
//     const data = await result.json();
//     console.log(data);
//   }

//   getTodos();
//   console.log("Gab");

//   return <div></div>;
// }

// export default App;

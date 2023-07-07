import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useLocalStorageState } from "./useLocalStorageState";
import { useMovies } from "./useMovies";

const OMDB_API_KEY = "cd325220";
// const OMDB_API_KEY = "f84fc31d";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("")//"tt1632701");

  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = (id) => {
    setSelectedId(selectedId => selectedId === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    setWatched(watched => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  const handleRemoveWatched = (id) => setWatched((watched) => watched.filter(movie => movie.imdbID !== id))


  return (
    <>
      {/* Fixing PROP Drilling w/Component Composition */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {
            isLoading ? <Loader /> : (
              error ? <ErrorMessage message={error} />
                :
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )
          }
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onDeleteWatched={handleRemoveWatched} />
            </>)
          }
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className="error">
    <span>⚠️</span>{message}</p>
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn-v2 </h1>
    </div>
  )
}

function Search({ query, setQuery }) {
  // DO NOT SELECT ELEMENTS LIKE THIS
  // useEffect(function () {
  //   const el = document.querySelector('.search');
  //   console.log(el);
  //   el.focus();
  // }, []);

  // USING REF TO SELECT DOM
  const inputEl = useRef(null);

  useEffect(function () {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

function NumResults({ movies }) {
  return <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
}

function Main({ children }) {
  return <main className="main">
    {children}
  </main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (children)}
    </div>
  )
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>)
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  // UPDATING THE REF
  useEffect(function () {
    if (userRating) countRef.current = countRef.current + 1;
  },
    [userRating]
  );


  const isWatched = watched.map(movie => movie.imdbID)
    .includes(selectedId)

  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedId
  )?.userRating;


  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // Rule No.1) never use hooks conditionally (this will mess the order of hooks in linked-list) (6 hooks)
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);
  // This will make it (7 hooks) so doesnt work

  // Rule No.2) this will also doesnt run the hooks after this statement. (6 hooks)
  /* eslint-disable */
  // if (imdbRating > 8) return <p>Greatest ever!</p>
  // This will only render (3 hooks) so doesnt work 

  // USESTATE
  // The initila value of the useState is determined by the statement you give for the first time only
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // This will not be true because until it gets the imdbRating from the API it will be undefined and it only calls it once
  // console.log(isTop);

  // we can use useEffect for this but thats a lot of work so use derived state instead
  // useEffect(function () {
  //   setIsTop(imdbRating > 8)
  // }, [imdbRating]);

  const isTop = imdbRating > 8;
  console.log(isTop);


  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    }
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(function () {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    document.addEventListener('keydown', callback);

    return function () {
      document.removeEventListener('keydown', callback);
    }
  }, [onCloseMovie])

  useEffect(function () {
    async function getMovieDetails() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movie data");

        const data = await res.json();
        setMovie(data);

        if (data.Response === "False")
          throw new Error("Movie not found")
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(function () {
    if (!title) return;
    document.title = `MOVIE | ${title}`;

    // Cleanup function
    return function () {
      document.title = "usePopcorn";
      // console.log(`Clean up effect for movie ${title}`);
    }
  }, [title]);

  return (
    <div className="details">
      {loading ? <Loader /> :
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull;</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ?
                <>

                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
                  )}
                </>
                :
                <p>You rated this movie with {watchedUserRating} <span>⭐</span></p>
              }
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  )
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}>
          ❌
        </button>
      </div>
    </li>
  )
}


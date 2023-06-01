import Movie from './movie';
export default async function Home() {
  const data = await fetch(
    ` https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
  );

  const res = await data.json();
  return (
    <main>
      <h1 className='text-center justify-center font-bold text-4xl my-20'>
        Here are the top rated movies from the movie db :) Click on one!
      </h1>
      <div className='grid gap-16 grid-cols-fluid'>
        {' '}
        {/* I added fluid to  tailwind.config.js*/}
        {res.results.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </main>
  );
}

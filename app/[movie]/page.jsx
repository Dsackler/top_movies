import Image from 'next/image';

// export const revalidate = 60. The one in the fetch is built in to fetch. If you use a different fething library, can include this line

//this pre renders the images
export async function generateStaticParams() {
  const data = await fetch(
    ` https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return res.results.map((movie) => ({
    movie: toString(movie.id),
  }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = 'https://image.tmdb.org/t/p/original';
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  ); /*Okay, so, the next:revalidat thing. if you dont do this, it will cache the result and load quickly. But sometimes you need to load new data. So every 60 seconds it refetches the data*/

  const res = await data.json();
  return (
    <div>
      <div>
        <h2 className='text-2xl'>{res.title}</h2>
        <h2 className='text-2xl'>{res.release_date}</h2>
        <h2 className='text-2xl'>Runtime: {res.runtime}</h2>
        <h2 className='bg-green-600 inline-block my2 py2 px-4 rounded'>
          {res.status}
        </h2>
        <Image
          className='my-12 w-full'
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1000}
          priority
          alt={res.title}
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}

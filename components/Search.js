import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { movieData } from '../mock-data/moviesDataMock';

const Search = ({ onNavigateToSelectedMovie }) => {
  const searchFieldRef = useRef();
  const dataList = useRef();
  const onFocus = () => gsap.set('#searchbar', { boxShadow: '0 0 0 1px var(--brand-c)' });
  const onBlur = () => gsap.set('#searchbar', { boxShadow: '' });

  const onSubmit = e => {
    e.preventDefault();
    const target = searchFieldRef.current.value;

    onNavigateToSelectedMovie(target);
  };

  return (
    <article id="search">
      <form onSubmit={onSubmit} noValidate id="searchbar">
        <input
          ref={searchFieldRef}
          list="movies"
          placeholder="Search"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button type="submit" id="search-icon">
          <svg id="vector" viewBox="0 0 30.239 30.239">
            <g id="glass" fill="#B4BFFD">
              <path
                d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735
		c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0
		c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z
		 M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0
		C21.517,9.026,21.517,14.63,18.073,18.074z"
              />
            </g>
          </svg>
        </button>
      </form>

      <datalist id="movies" ref={dataList}>
        {movieData &&
          movieData.map(movie => (
            <option key={movie.title} value={movie.title}>
              {movie.title}
            </option>
          ))}
      </datalist>
    </article>
  );
};

export default Search;

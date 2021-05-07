import React from 'react';

/**
 * Second layer for expanded card with details, cast and trailer gallery
 * @returns {JSX.Element}
 * @constructor
 */
const CardDetails = ({ grade, title, tags, secInfo, synops, cast, trailPics, trail }) => {
  return (
    <article id="first-layer">
      <div className="big-poster" />
      <button type="button" className="close-card">
        <svg viewBox="0 0 100 100">
          <g transform="translate(0,-952.36218)">
            <path
              d="m 50.000001,962.36216
        c -22.10908,0 -40,17.88103 -40,40.00004 0,22.1085 17.8915,40 40,40 22.118968,0 39.999998,
        -17.8909 39.999998,-40 0,-22.11959 -17.88046,-40.00004 -39.999998,-40.00004 z m -15.25,23
        a 2.0002,2.0002 0 0 1 0.21875,0 2.0002,2.0002 0 0 1 1.4375,0.59375 l 13.59375,13.5625 13.562498,
        -13.5625 a 2.0002,2.0002 0 0 1 1.375,-0.59375 2.0002,2.0002 0 0 1 1.46875,3.4375 l -13.593748,
        13.59374 13.593748,13.5625 a 2.0108526,2.0108526 0 1 1 -2.84375,2.8438 l -13.562498,-13.5938
        -13.59375,13.5938 a 2.0108526,2.0108526 0 0 1 -2.84375,-2.8438 l 13.5625,-13.5625 -13.5625,
        -13.59374 a 2.0002,2.0002 0 0 1 1.1875,-3.4375 z"
              fill="#E6EBEF"
              fillOpacity="1"
              fillRule="evenodd"
              stroke="none"
              marker="none"
              visibility="visible"
              display="inline"
              overflow="visible"
            />
          </g>
        </svg>
      </button>

      <div className="big-movie-info">
        <div className="imdb">
          <div className="logo">IMDb</div>
          <div className="grade">{grade}</div>
        </div>
        <h4 className="movie-title">{title}</h4>
        <article className="tags">{tags}</article>
        <div className="info-last">{secInfo}</div>
      </div>

      <article id="bottom-screen">
        <article id="mid-nav">
          <a className="one" href="#">
            SHOWTIMES
          </a>
          <a className="two" href="#">
            DETAILS
          </a>

          <div id="nav-layer" ref={navLayer} />
          <svg>
            <rect
              id="text-bg"
              width="50%"
              height="100%"
              fill="#4c17ff"
              x="50%"
              y="0"
              rx="7"
              fillOpacity="1"
              mask="url(#knockout-text)"
            />
            <mask id="knockout-text">
              <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
              <text
                x="25%"
                y="57.5%"
                fill="#000"
                fontSize="11px"
                fontWeight="700"
                textAnchor="middle"
              >
                SHOWTIMES
              </text>
              <text
                x="75%"
                y="57.5%"
                fill="#000"
                fontSize="11px"
                fontWeight="700"
                textAnchor="middle"
              >
                DETAILS
              </text>
            </mask>
          </svg>
        </article>

        <section id="dual-wrapper">
          <article className="dual-screen left">
            <div id="movie-copy">
              <h4>Story</h4>
              <p>{synops}</p>
            </div>

            <div id="cast-wrap">
              <h4>Cast</h4>
              <article className="reel cast">
                {cast &&
                  cast.map(castItem => (
                    <div className="item" key={castItem.name}>
                      <div className="shot" style={{ backgroundImage: `url(${castItem.src})` }} />
                      <article className="details">
                        <h5>{castItem.name}</h5>
                        <p>{castItem.role}</p>
                      </article>
                    </div>
                  ))}
              </article>
            </div>

            <div id="trailer-wrap">
              <h4>Trailers</h4>
              <article className="reel trailer">
                {trail &&
                  trail.map(trailer => (
                    <div className="item" key={trailer}>
                      <div className="video-thumb" style={{ backgroundImage: `url(${trailer})` }} />
                    </div>
                  ))}
              </article>
            </div>
          </article>

          <article className="dual-screen right">
            <div id="date-picker">
              <h4>Date</h4>
              <article className="reel date" />
            </div>
            <div id="theaters-wrap" />
          </article>
        </section>
      </article>
    </article>
  );
};

export default CardDetails;

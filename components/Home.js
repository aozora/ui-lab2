import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Footer from '@/components/Footer';
import { movieData } from '../mock-data/moviesDataMock';

const Home = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(Flip, ScrollToPlugin, ScrollTrigger);
  }

  const fixedLayer = useRef();
  const dataList = useRef();
  const backArrow = useRef();
  const scroller = useRef();
  const navLayer = useRef();
  const progress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [trailerIndex, setTrailerIndex] = useState(null);
  const labels = useMemo(() => ['start', 'two', 'three', 'four', 'five', 'end'], []);

  const scrollTl = useMemo(
    () =>
      gsap
        .timeline({
          defaults: {
            ease: 'none'
          }
        })
        .pause(),
    []
  );

  /**
   * Shorthand function to populate the scroll timeline.
   * @param el
   * @param el2
   * @param el3
   * @param el4
   * @param label
   * @param duration
   */
  const passCardTween = useCallback(
    (el, el2, el3, el4, label, duration) => {
      scrollTl
        .addLabel(label)
        .to(el, {
          scale: 0.85,
          duration
        })
        .to(
          el2,
          {
            scale: 1,
            duration
          },
          `>-${duration}`
        )
        .to(el3, { opacity: 0, duration }, `>-${duration}`)
        .to(el4, { opacity: 1, duration }, `>-${duration}`);
    },
    [scrollTl]
  );

  // const init = () => {
  //   const setInnerText = (els, arr) => {
  //     document.querySelectorAll(els).forEach((item, i) => {
  //       item.innerText = `${arr[i]}`;
  //     });
  //   };
  //
  //   // Call event handler functions.
  //   this.inputFunc();
  //   this.handleClicks();
  // };

  useEffect(() => {
    if (navLayer.current) {
      // Set middle tab navigation to the second option (details).
      gsap.set(navLayer.current, { x: '105%' });
    }
  }, []);

  /**
   * Set Movie cards animations
   */
  useEffect(() => {
    if (scroller.current) {
      // Scale up the first movie card and hide all primary infos but the one of the active first card.
      gsap.set('.movie-card', { scale: 0.85 });
      gsap.set('.movie-card.one', { scale: 1 });
      gsap.set('.movie-info', { opacity: 0 });
      gsap.set('.movie-card.one .movie-info', { opacity: 1 });

      const cards = Array.from(document.querySelectorAll('.movie-card'));
      const infos = Array.from(document.querySelectorAll('.movie-info'));

      // Populate scroll timeline wih the movie cards animation.
      for (let i = 0; i < cards.length - 1; i += 1) {
        if (i !== cards.length - 2) {
          passCardTween(cards[i], cards[i + 1], infos[i], infos[i + 1], labels[i], 0.85);
        } else if (i === 0) {
          passCardTween(cards[i], cards[i + 1], infos[i], infos[i + 1], labels[i], 0.85);
        } else if (i === 3) {
          passCardTween(cards[i], cards[i + 1], infos[i], infos[i + 1], labels[i], 0.875);
        } else {
          passCardTween(cards[i], cards[i + 1], infos[i], infos[i + 1], labels[i], 0.775);

          scrollTl.addLabel('end');
        }
      }

      // Create trigger to link the scroll timeline directly to the scrollbar (scrub).
      const trigger = ScrollTrigger.create({
        horizontal: true,
        scroller: scroller.current,
        animation: scrollTl,
        scrub: true,
        start: 0,
        end: () => `+=${ScrollTrigger.maxScroll(scroller.current, true)}`,
        snap: {
          snapTo: 'labels',
          duration: 0.2
        }
      });

      // Handles synchronisation of scrolling animation on resize.
      // let progress = 0;
      const refreshInit = () => {
        progress.current = trigger.progress;
      };

      const refresh = () => {
        trigger.scroll(progress.current * ScrollTrigger.maxScroll(scroller.current, true));
      };
      ScrollTrigger.addEventListener('refreshInit', refreshInit);
      ScrollTrigger.addEventListener('refresh', refresh);

      // Create a trigger for every movie card to handle active state.
      cards.forEach(card => {
        // const index = cards.indexOf(card);
        const st = ScrollTrigger.create({
          horizontal: true,
          scroller: '#card-gallery',
          start: '0 80%',
          end: '0 0',
          trigger: card,
          toggleClass: 'active'
        });
      });
    }

    // TODO: fix this
    // return () => {
    //   ScrollTrigger.removeEventListener('refreshInit', refreshInit);
    //   ScrollTrigger.removeEventListener('refresh', refresh);
    // };
  }, [labels, passCardTween, scrollTl]);

  /**
   * Set backArrow animation
   */
  useEffect(() => {
    if (backArrow.current) {
      gsap.set(backArrow.current, {
        opacity: 0,
        x: '-10%',
        rotate: 180
      });
    }
  }, []);

  // Main UI controller object to handle dynamic scrolling, animation to detailed view and data injection.
  // const dynamicScroll = {
  //   cssBody: document.body.style,
  //   // fixedLayer: document.querySelector('#fixed-layer'),
  //   // dataList: document.querySelector('#movies'),
  //   searchField: document.querySelector('#searchbar > input'),
  //   searchButton: document.querySelector('#search-icon'),
  //   // scroller: document.querySelector('#card-gallery'),
  //   bigInfo: document.querySelector('.big-movie-info'),
  //   movieCopy: document.querySelector('#movie-copy p'),
  //   // backArrow: document.querySelector('#fixed-layer > .back-arrow'),
  //   // cards: Array.from(document.querySelectorAll('.movie-card')),
  //   posters: Array.from(document.querySelectorAll('.movie-card .poster')),
  //   links: Array.from(document.querySelectorAll('.movie-card a')),
  //   // infos: Array.from(document.querySelectorAll('.movie-info')),
  //   midNavLinks: Array.from(document.querySelectorAll('#mid-nav a')),
  //   castItems: Array.from(document.querySelectorAll('.reel.cast .item')),
  //   trailerItems: Array.from(document.querySelectorAll('.reel.trailer .item'))
  //   // activeIndex: null,
  //   // trailerIndex: null,
  //   // labels: ['start', 'two', 'three', 'four', 'five', 'end']
  // };

  // Initiate clock, bottom navigation and scroll animation.
  // dynamicClock.init();
  // footerNav.init();

  const convertIndexToWord = index => {
    const words = ['one', 'two', 'three', 'four', 'five', 'six'];
    return words[index];
  };

  return (
    <section id="phone">
      <article id="screen">
        <header>
          <article id="top-icons">
            <article className="topbar left">
              <div id="" />
            </article>
            <article className="topbar right">
              <div>
                <svg viewBox="0 0 100 100">
                  <path
                    d="M28.984,67.871h3.282c1.262,0,2.288-1.026,2.288-2.288v-7.012c0-1.262-1.026-2.288-2.288-2.288h-3.282
        c-1.261,0-2.288,1.026-2.288,2.288v7.012C26.697,66.844,27.723,67.871,28.984,67.871z"
                  />
                  <path
                    d="M38.678,67.871h3.257c1.269,0,2.3-1.032,2.3-2.3V52.49c0-1.269-1.032-2.3-2.3-2.3h-3.257c-1.269,0-2.3,
        1.032-2.3,2.3V65.57 C36.377,66.839,37.409,67.871,38.678,67.871z"
                  />
                  <path
                    d="M48.362,67.871h3.25c1.271,0,2.304-1.033,2.304-2.304V46.47c0-1.271-1.033-2.304-2.304-2.304h-3.25
        c-1.271,0-2.304,1.034-2.304,2.304v19.097C46.059,66.837,47.092,67.871,48.362,67.871z"
                  />
                  <path
                    d="M58.035,67.871h3.266c1.266,0,2.296-1.03,2.296-2.295V40.462c0-1.266-1.03-2.296-2.296-2.296h-3.266
        c-1.266,0-2.296,1.03-2.296,2.296v25.113C55.739,66.841,56.769,67.871,58.035,67.871z"
                  />
                  <path
                    d="M67.775,67.871h3.148c1.302,0,2.362-1.06,2.362-2.362V34.491c0-1.302-1.06-2.362-2.362-2.362h-3.148
        c-1.302,0-2.362,1.06-2.362,2.362v31.018C65.413,66.811,66.473,67.871,67.775,67.871z"
                  />
                </svg>
              </div>
              <div>
                <svg viewBox="0 0 470 470">
                  <path d="M170.667,336.6l64,64l64-64C263.36,301.293,205.973,301.293,170.667,336.6z" />
                  <path
                    d="M85.333,251.267L128,293.933c58.88-58.88,154.453-58.88,213.333,0L384,251.267
				C301.547,168.813,167.787,168.813,85.333,251.267z"
                  />
                  <path
                    d="M0,165.933L42.667,208.6c106.027-106.027,277.973-106.027,384,0l42.667-42.667C339.733,36.333,
			129.6,36.333,0,165.933z"
                  />
                </svg>
              </div>
              <div>
                <svg viewBox="0 0 77 30">
                  <g>
                    <rect x="3.83" y="3.83" width="64.63" height="25.35" rx="1.63" ry="1.63" />
                    <path
                      d="M74.49,9.79H72.3V5.46A5.47,5.47,0,0,0,66.83,0H5.47A5.47,5.47,0,0,0,0,5.46V27.56A5.47,5.47,0,0,0,
            5.47,33H66.83a5.47,5.47,0,0,0,5.46-5.46V23h2.19a2.67,2.67,0,0,0,2.67-2.67V12.46A2.67,2.67,0,0,0,74.49,
            9.79ZM70.3,27.56A3.47,3.47,0,0,1,66.83,31H5.47A3.47,3.47,0,0,1,2,27.56V5.46A3.47,3.47,0,0,1,5.47,
            2H66.83A3.47,3.47,0,0,1,70.3,5.46Zm4.87-7.25a.67.67,0,0,1-.67.67H72.3V11.79h2.19a.68.68,0,0,1,.67.67Z"
                    />
                  </g>
                </svg>
              </div>
            </article>
          </article>

          <article id="search">
            <div id="searchbar">
              <input list="movies" placeholder="Search" />
              <button type="button" id="search-icon">
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
            </div>

            <datalist id="movies" ref={dataList}>
              {movieData &&
                movieData.map(movie => (
                  <option key={movie.title} value={movie.title}>
                    {movie.title}
                  </option>
                ))}
            </datalist>
          </article>
        </header>

        <main>
          <h3>Now Playing</h3>
          <article id="card-gallery" ref={scroller}>
            {movieData.map((movie, index) => (
              <div key={movie.title} className={`movie-card ${convertIndexToWord(index)}`}>
                <div className="poster" style={{ backgroundImage: `url(${movie.picture})` }} />
                <article className="movie-info">
                  <div className="imdb">
                    <div className="logo">IMDb</div>
                    <div className="grade">{movie.grade}</div>
                  </div>
                  <h4 className="movie-title">{movie.title}</h4>
                  <article className="tags">{movie.tags}</article>
                </article>
                <a href="#" />
              </div>
            ))}

            <div id="spacer" />
          </article>
        </main>

        <Footer />

        {/* Second layer for expanded card with details, cast and trailer gallery */}
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
              <div className="grade" />
            </div>
            <h4 className="movie-title" />
            <article className="tags" />
            <div className="info-last" />
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
                  <p />
                </div>
                <div id="cast-wrap">
                  <h4>Cast</h4>
                  <article className="reel cast">
                    <div className="item">
                      <div className="shot" />
                      <article className="details">
                        <h5>copy</h5>
                        <p>copy</p>
                      </article>
                    </div>
                    <div className="item">
                      <div className="shot" />
                      <article className="details">
                        <h5>copy</h5>
                        <p>copy</p>
                      </article>
                    </div>
                    <div className="item">
                      <div className="shot" />
                      <article className="details">
                        <h5>copy</h5>
                        <p>copy</p>
                      </article>
                    </div>
                    <div className="item">
                      <div className="shot" />
                      <article className="details">
                        <h5>copy</h5>
                        <p>copy</p>
                      </article>
                    </div>
                    <div className="item">
                      <div className="shot" />
                      <article className="details">
                        <h5>copy</h5>
                        <p>copy</p>
                      </article>
                    </div>
                  </article>
                </div>
                <div id="trailer-wrap">
                  <h4>Trailers</h4>
                  <article className="reel trailer">
                    <div className="item">
                      <div className="video-thumb" />
                    </div>
                    <div className="item">
                      <div className="video-thumb" />
                    </div>
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

        <article id="fixed-layer" ref={fixedLayer}>
          <button type="button" ref={backArrow} className="back-arrow">
            <svg viewBox="0 0 512 512">
              <path
                fill="white"
                d="M 506.134 241.843 C 506.128 241.837 506.123 241.83 506.116 241.824 L 401.612 137.824 C 393.783 130.033 381.12 130.062 373.327 137.892
		C 365.535 145.721 365.565 158.384 373.394 166.176 L 443.558 236 H 20 C 8.954 236 0 244.954 0 256 C 0 267.046 8.954 276 20 276 H 443.557 L 373.395 345.824
		C 365.566 353.616 365.536 366.279 373.328 374.108 C 381.121 381.939 393.785 381.966 401.613 374.176 L 506.117 270.176 C 506.123 270.17 506.128 270.163
		506.135 270.157 C 513.968 262.339 513.943 249.635 506.134 241.843 Z"
              />
            </svg>
          </button>
        </article>
      </article>
    </section>
  );
};

export default Home;

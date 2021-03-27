import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { movieData } from '../mock-data/movies';

const Home = () => {
  const init = () => {
    const setInnerText = (els, arr) => {
      document.querySelectorAll(els).forEach((item, i) => {
        item.innerText = `${arr[i]}`;
      });
    };

    // Set primary data elements (pictures, text)
    document.querySelectorAll('.poster').forEach((item, i) => {
      gsap.set(item, { backgroundImage: `url(${movieData.pictures[i]})` });
    });

    setInnerText('.movie-card .grade', movieData.gradeArr);
    setInnerText('.movie-card .movie-title', movieData.titles);
    setInnerText('.movie-card .tags', movieData.tagArr);

    gsap.set(this.backArrow, {
      opacity: 0,
      x: '-10%',
      rotate: 180
    });

    // Populate scroll timeline wih the movie cards animation.
    for (let i = 0; i < this.cards.length - 1; i++) {
      if (i !== this.cards.length - 2) {
        this.passCardTween(
          this.cards[i],
          this.cards[i + 1],
          this.infos[i],
          this.infos[i + 1],
          this.labels[i],
          0.85
        );
      } else if (i === 0) {
        this.passCardTween(
          this.cards[i],
          this.cards[i + 1],
          this.infos[i],
          this.infos[i + 1],
          this.labels[i],
          0.85
        );
      } else if (i === 3) {
        this.passCardTween(
          this.cards[i],
          this.cards[i + 1],
          this.infos[i],
          this.infos[i + 1],
          this.labels[i],
          0.875
        );
      } else {
        this.passCardTween(
          this.cards[i],
          this.cards[i + 1],
          this.infos[i],
          this.infos[i + 1],
          this.labels[i],
          0.775
        );
        this.scrollTl.addLabel('end');
      }
    }

    // Create trigger to link the scroll timeline directly to the scrollbar (scrub).
    const trigger = ScrollTrigger.create({
      horizontal: true,
      scroller: this.scroller,
      animation: this.scrollTl,
      scrub: true,
      start: 0,
      end: () => `+=${ScrollTrigger.maxScroll(this.scroller, true)}`,
      snap: {
        snapTo: 'labels',
        duration: 0.2
      }
    });
    // Handles synchronisation of scrolling animation on resize.
    let progress = 0;
    ScrollTrigger.addEventListener('refreshInit', () => (progress = trigger.progress));
    ScrollTrigger.addEventListener('refresh', () => {
      trigger.scroll(progress * ScrollTrigger.maxScroll(this.scroller, true));
    });

    // Create a trigger for every movie card to handle active state.
    this.cards.forEach((card, i) => {
      const index = this.cards.indexOf(card);
      const st = ScrollTrigger.create({
        horizontal: true,
        scroller: '#card-gallery',
        start: '0 80%',
        end: '0 0',
        trigger: card,
        toggleClass: 'active'
      });
    });

    // Set middle tab navigation to the second option (details).
    gsap.set('#nav-layer', { x: '105%' });

    // Call event handler functions.
    this.inputFunc();
    this.handleClicks();
  };

  useEffect(() => {
    // Scale up the first movie card and hide all primary infos but the one of the active first card.
    gsap.set('.movie-card', { scale: 0.85 });
    gsap.set('.movie-card.one', { scale: 1 });
    gsap.set('.movie-info', { opacity: 0 });
    gsap.set('.movie-card.one .movie-info', { opacity: 1 });
  }, []);

  const fixedLayer = useRef();
  const dataList = useRef();

  // Main UI controller object to handle dynamic scrolling, animation to detailed view and data injection.
  const dynamicScroll = {
    cssBody: document.body.style,
    // fixedLayer: document.querySelector('#fixed-layer'),
    // dataList: document.querySelector('#movies'),
    searchField: document.querySelector('#searchbar > input'),
    searchButton: document.querySelector('#search-icon'),
    scroller: document.querySelector('#card-gallery'),
    bigInfo: document.querySelector('.big-movie-info'),
    movieCopy: document.querySelector('#movie-copy p'),
    backArrow: document.querySelector('#fixed-layer > .back-arrow'),
    cards: Array.from(document.querySelectorAll('.movie-card')),
    posters: Array.from(document.querySelectorAll('.movie-card .poster')),
    links: Array.from(document.querySelectorAll('.movie-card a')),
    infos: Array.from(document.querySelectorAll('.movie-info')),
    midNavLinks: Array.from(document.querySelectorAll('#mid-nav a')),
    castItems: Array.from(document.querySelectorAll('.reel.cast .item')),
    trailerItems: Array.from(document.querySelectorAll('.reel.trailer .item')),
    activeIndex: null,
    trailerIndex: null,
    labels: ['start', 'two', 'three', 'four', 'five', 'end']
  };

  // Initiate clock, bottom navigation and scroll animation.
  // dynamicClock.init();
  footerNav.init();
  dynamicScroll.init();

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
              <button id="search-icon">
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
              {movieData && movieData.titles.map(title => <option value={title}>{title}</option>)}
            </datalist>
          </article>
        </header>

        <main>
          <h3>Now Playing</h3>
          <article id="card-gallery">
            <div className="movie-card one">
              <div className="poster" />
              <article className="movie-info">
                <div className="imdb">
                  <div className="logo">IMDb</div>
                  <div className="grade" />
                </div>
                <h4 className="movie-title" />
                <article className="tags" />
              </article>
              <a href="#" />
            </div>

            <div id="test" className="movie-card two">
              <div className="poster" />
              <article className="movie-info">
                <div className="imdb">
                  <div className="logo">IMDb</div>
                  <div className="grade" />
                </div>
                <h4 className="movie-title" />
                <article className="tags" />
              </article>
              <a href="#" />
            </div>
            <div className="movie-card three">
              <div className="poster" />
              <article className="movie-info">
                <div className="imdb">
                  <div className="logo">IMDb</div>
                  <div className="grade" />
                </div>
                <h4 className="movie-title" />
                <article className="tags" />
              </article>
              <a href="#" />
            </div>
            <div className="movie-card four">
              <div className="poster" />
              <article className="movie-info">
                <div className="imdb">
                  <div className="logo">IMDb</div>
                  <div className="grade" />
                </div>
                <h4 className="movie-title" />
                <article className="tags" />
              </article>
              <a href="#" />
            </div>
            <div className="movie-card five">
              <div className="poster" />
              <article className="movie-info">
                <div className="imdb">
                  <div className="logo">IMDb</div>
                  <div className="grade" />
                </div>
                <h4 className="movie-title" />
                <article className="tags" />
              </article>
              <a href="#" />
            </div>
            <div className="movie-card six">
              <div className="poster" />
              <article className="movie-info">
                <div className="imdb">
                  <div className="logo">IMDb</div>
                  <div className="grade" />
                </div>
                <h4 className="movie-title" />
                <article className="tags" />
              </article>
              <a href="#" />
            </div>
            <div id="spacer" />
          </article>
        </main>

        <footer>
          <nav>
            <ul>
              <li>
                <a href="#">
                  <svg viewBox="0 0 192 192">
                    <path
                      className="icon"
                      fill="#627d8b"
                      d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724
    111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0
    .048-4.027z"
                    />
                  </svg>
                  <h4>Trending</h4>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg viewBox="0 0 58 58">
                    <path
                      className="icon"
                      fill="#627d8b"
                      d="M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M10,50H2v-9h8V50z
	 M10,39H2v-9h8V39z M10,28H2v-9h8V28z M10,17H2V8h8V17z M36.537,29.844l-11,7C25.374,36.947,25.187,37,25,37
	c-0.166,0-0.331-0.041-0.481-0.123C24.199,36.701,24,36.365,24,36V22c0-0.365,0.199-0.701,0.519-0.877
	c0.32-0.175,0.71-0.162,1.019,0.033l11,7C36.825,28.34,37,28.658,37,29S36.825,29.66,36.537,29.844z M56,50h-8v-9h8V50z M56,39h-8
	v-9h8V39z M56,28h-8v-9h8V28z M56,17h-8V8h8V17z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg viewBox="0 0 8.5 8.5">
                    <path
                      fill="rgba(0,0,0,0.4)"
                      d="M 0.0599 5.3151 A 0.2646 0.2646 0 0 0 0.0775 5.6703 L 0.8068 6.3996 A 0.2646 0.2646 0 0 0 1.1799 6.3993
    L 1.2807 6.2984 C 1.5297 6.0494 1.9182 6.0494 2.1672 6.2984 C 2.4162 6.5474 2.4162 6.9359 2.1672 7.1849 L 2.0664
    7.2858 A 0.2646 0.2646 0 0 0 2.0675 7.6603 L 2.7954 8.3882 A 0.2646 0.2646 0 0 0 3.1699 8.3893 L 4.7525 6.8067
    L 1.6604 3.7146 L 0.0778 5.2972 A 0.2646 0.2646 0 0 0 0.0599 5.3151 Z"
                    />
                    <path
                      className="icon"
                      fill="#627d8b"
                      d="M 2.0346 3.3405 L 5.1267 6.4325 L 8.3886
    3.1705 A 0.2646 0.2646 0 0 0 8.3886 2.7949 L 7.6608 2.067 A 0.2646 0.2646 0 0 0 7.2851 2.067 L 7.1846 2.1675
    C 6.9356 2.4165 6.5468 2.4169 6.2978 2.1679 C 6.0488 1.9189 6.0491 1.53 6.2982 1.281 L 6.3986 1.1805 A 0.2646
    0.2646 0 0 0 6.4001 0.8063 L 5.6708 0.077 A 0.2646 0.2646 0 0 0 5.2966 0.0785 Z Z Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg viewBox="0 0 100 100">
                    <path
                      fill="rgba(0,0,0,0.4)"
                      d="M76.31,5H34.8a5.16,5.16,0,0,0-5.11,5.21v.34H70.76a5.16,5.16,0,0,1,5.1,5.21V83.66a5.15,5.15,0,0,0,
    5.55-5.19V10.24A5.15,5.15,0,0,0,76.31,5Z"
                    />
                    <path
                      className="icon"
                      fill="#627d8b"
                      d="M65.2,16.13H23.69a5.15,5.15,0,0,0-5.1,5.21V89.77a5.1,5.1,0,0,0,8,4.28L41.93,83.22a5,5,0,0,1,5.88,
    0L62.23,93.81a5.11,5.11,0,0,0,8.08-4.24V21.34A5.16,5.16,0,0,0,65.2,16.13Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </footer>

        {/* Second layer for expanded card with details, cast and trailer gallery */}
        <article id="first-layer">
          <div className="big-poster" />
          <button className="close-card">
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
              <div id="nav-layer" />
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
          <button className="back-arrow">
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

import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flip } from 'gsap/dist/Flip';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Footer from '@/components/Footer';
import Search from '@/components/Search';
import TopIcons from '@/components/TopIcons';
import CardDetails from '@/components/CardDetails';
import { movieData } from '../mock-data/moviesDataMock';
import { scrollFunc } from '../utils';
import { flipCard } from '../utils/flip';

const labels = ['start', 'two', 'three', 'four', 'five', 'end'];

const Home = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(Flip, ScrollToPlugin, ScrollTrigger);
  }

  const fixedLayer = useRef();
  const backArrow = useRef();
  const scroller = useRef();
  const navLayer = useRef();
  const progress = useRef(0);
  const activeIndexRef = useRef(0);
  // const [trailerIndex, setTrailerIndex] = useState(null);

  /**
   * Create and pause the timeline for movie cards animation.
   * @returns {gsap.core.Timeline}
   */
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
   * Setup Movie cards animations
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

      /**
       * Handles synchronisation of scrolling animation on resize.
       */
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
        const cardIndex = cards.indexOf(card);
        const st = ScrollTrigger.create({
          horizontal: true,
          scroller: '#card-gallery',
          start: '0 80%',
          end: '0 0',
          trigger: card,
          toggleClass: 'active',
          onToggle: ({ progress, direction, isActive }) => {
            if (isActive) {
              // set the movie card active index to the card that trigger scrollTrigger
              activeIndexRef.current = cardIndex;
            }
          }
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

  // Initiate clock, bottom navigation and scroll animation.
  // dynamicClock.init();

  const convertIndexToWord = index => {
    const words = ['one', 'two', 'three', 'four', 'five', 'six'];
    return words[index];
  };

  /**
   * Scroll to the selected card
   * @param target
   */
  const navigateToSelectedMovie = target => {
    if (typeof window !== 'undefined') {
      // Index of the selected movie card
      const movieIndex = movieData.findIndex(movie => movie.title === target);
      let diff;
      const cards = Array.from(document.querySelectorAll('.movie-card'));
      // Index of active movie card.
      // const activeIndex = cards.indexOf(document.querySelector('.movie-card.active'));

      if (movieIndex > activeIndexRef.current) {
        // Check index difference in forwards direction (right scrolling).
        diff = movieIndex - activeIndexRef.current;

        // Adapt scrolling speed and offset to navigate between one or several movie cards.
        // eslint-disable-next-line default-case
        switch (diff) {
          case 1:
            // eslint-disable-next-line no-unused-expressions
            movieIndex === cards.length - 1
              ? scrollFunc(cards[movieIndex], 0, 0.16)
              : scrollFunc(cards[movieIndex], 54, 0.2);
            break;
          case 2:
            // eslint-disable-next-line no-unused-expressions
            movieIndex === cards.length - 1
              ? scrollFunc(cards[movieIndex], 0, 0.36)
              : scrollFunc(cards[movieIndex], 72, 0.4);
            break;
          case 3:
            // eslint-disable-next-line no-unused-expressions
            movieIndex === cards.length - 1
              ? scrollFunc(cards[movieIndex], 0, 0.56)
              : scrollFunc(cards[movieIndex], 90, 0.6);
            break;
          case 4:
            // eslint-disable-next-line no-unused-expressions
            movieIndex === cards.length - 1
              ? scrollFunc(cards[movieIndex], 0, 0.76)
              : scrollFunc(cards[movieIndex], 108, 0.8);
            break;
          case 5:
            // eslint-disable-next-line no-unused-expressions
            movieIndex === cards.length - 1
              ? scrollFunc(cards[movieIndex], 0, 0.96)
              : scrollFunc(cards[movieIndex], 126, 1);
            break;
        }
      } else if (movieIndex < activeIndexRef.current) {
        // Check index difference in backwards direction (left scrolling).
        diff = activeIndexRef.current - movieIndex;
        // Adapt scrolling speed and offset to navigate between one or several movie cards.
        // eslint-disable-next-line default-case
        switch (diff) {
          case 1:
            // eslint-disable-next-line no-unused-expressions
            activeIndexRef.current === cards.length - 1
              ? scrollFunc(cards[movieIndex], 18, 0.16)
              : scrollFunc(cards[movieIndex], 16, 0.2);
            break;
          case 2:
            // eslint-disable-next-line no-unused-expressions
            activeIndexRef.current === cards.length - 1
              ? scrollFunc(cards[movieIndex], 0, 0.36)
              : scrollFunc(cards[movieIndex], -2, 0.4);
            break;
          case 3:
            // eslint-disable-next-line no-unused-expressions
            activeIndexRef.current === cards.length - 1
              ? scrollFunc(cards[movieIndex], -18, 0.56)
              : scrollFunc(cards[movieIndex], -20, 0.6);
            break;
          case 4:
            // eslint-disable-next-line no-unused-expressions
            activeIndexRef.current === cards.length - 1
              ? scrollFunc(cards[movieIndex], -36, 0.76)
              : scrollFunc(cards[movieIndex], -38, 0.8);
            break;
          case 5:
            // eslint-disable-next-line no-unused-expressions
            activeIndexRef.current === cards.length - 1
              ? scrollFunc(cards[movieIndex], -54, 0.96)
              : scrollFunc(cards[movieIndex], -56, 1);
            break;
        }
      }
    }
  };

  /**
   * When a movie card is clicked
   * @param e
   * @param index
   */
  const onMovieCardSelected = (e, currentIndex) => {
    // Disable hash redirection.
    e.preventDefault();

    // // Get index of active movie card inside its respective array.
    // const activeIndex = this.cards.indexOf(document.querySelector('.movie-card.active'));
    //
    // // Get index of selected movie card.
    // const currentIndex = this.links.indexOf(e.target);

    const cards = Array.from(document.querySelectorAll('.movie-card'));
    const infos = Array.from(document.querySelectorAll('.movie-info'));
    const posters = Array.from(document.querySelectorAll('.movie-card .poster'));

    // Handle forward navigation between movie cards (only one card every time).
    if (currentIndex > activeIndexRef.current) {
      // eslint-disable-next-line no-unused-expressions
      currentIndex === movieData.length - 1
        ? scrollFunc(cards[currentIndex], 0, 0.16)
        : scrollFunc(cards[currentIndex], 54, 0.2);
    } else if (currentIndex < activeIndexRef.current) {
      scrollFunc(cards[currentIndex], 18, 0.2);
    } else if (currentIndex === activeIndexRef.current) {
      // Handle click on active movie card.
      // activeIndex = activeIndex;
      flipCard(
        posters[activeIndexRef.current],
        infos[activeIndexRef.current],
        activeIndexRef.current
      );
    }
    // } else if (e.target.matches('.video-thumb')) {
    //   this.trailerIndex = this.trailerItems.indexOf(e.target.parentElement);
    //   this.expandTrailer(e.target, this.trailerIndex);
    // } else if (e.target.matches('#fixed-layer .back-arrow')) {
    //   this.closeTrailer(e.target, this.trailerIndex);
    // }
  };

  return (
    <section id="phone">
      <article id="screen">
        <header>
          <TopIcons />
          <Search onNavigateToSelectedMovie={navigateToSelectedMovie} />
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
                <a href="#" onClick={e => onMovieCardSelected(e, index)} />
              </div>
            ))}

            <div id="spacer" />
          </article>
        </main>

        <Footer />

        {/* Second layer for expanded card with details, cast and trailer gallery */}
        <CardDetails movie={movieData[activeIndexRef.current]} />

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

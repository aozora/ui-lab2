import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';

/**
 * Clock object to handle display of time (European time, not much customization here).
 * @type {{init: dynamicClock.init, wrap: Element, parseTime: dynamicClock.parseTime}}
 */
// // eslint-disable-next-line import/prefer-default-export
// export const dynamicClock =()=> {
//   wrap: document.querySelector('#clock'),
//   parseTime() {
//     const baseDate = new Date();
//     const baseHours = baseDate.getHours();
//     const baseMins = baseDate.getMinutes();
//     let cleanHours;
//     let cleanMins;
//     const hourArr = baseHours.toString().split('');
//     const minArr = baseMins.toString().split('');
//
//     // eslint-disable-next-line no-unused-expressions
//     hourArr.length < 2
//       ? (hourArr.unshift('0'), (cleanHours = hourArr.join('')))
//       : (cleanHours = baseHours);
//     // eslint-disable-next-line no-unused-expressions
//     minArr.length < 2
//       ? (minArr.unshift('0'), (cleanMins = minArr.join('')))
//       : (cleanMins = baseMins);
//     this.wrap.innerText = `${cleanHours}:${cleanMins}`;
//   },
//
//   init() {
//     this.parseTime();
//     // Parse time every second to update.
//     setInterval(() => {
//       this.parseTime();
//     }, 1000);
//   }
// };

/**
 * Shorthand function to scroll to a specific movie-card.
 * @param pos
 * @param off
 * @param dur
 */
export const scrollFunc = (pos, off, dur) => {
  gsap.to('#card-gallery', {
    scrollTo: {
      x: pos,
      offsetX: off
    },
    ease: 'none',
    duration: dur
  });
};

/**
 * Shorthand function to fade out irrelevant elements during fade transitions. Uses css custom properties.
 * @param prop
 * @param val
 */
export const fadeAll = (prop, val) => {
  this.cssBody.setProperty(prop, val);
};

/**
 * Shorthand function to scroll to the selected movie with the search input.
 * @param cards
 * @param tar
 */
// export const inputNav = (cards, tar) => {
//   const target = tar;
//   // Index of active movie card.
//   // const activeIndex = this.cards.indexOf(document.querySelector('.movie-card.active'));
//   const activeIndex = cards.indexOf(document.querySelector('.movie-card.active'));
//
//   // Index of the selected movie card
//   const movieIndex = movieData.titles.indexOf(target);
//   let diff;
//
//   if (movieIndex > activeIndex) {
//     // Check index difference in forwards direction (right scrolling).
//     diff = movieIndex - activeIndex;
//     // Adapt scrolling speed and offset to navigate between one or several movie cards.
//     switch (diff) {
//       case 1:
//         movieIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 0, 0.16)
//           : scrollFunc(this.cards[movieIndex], 54, 0.2);
//         break;
//       case 2:
//         movieIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 0, 0.36)
//           : scrollFunc(this.cards[movieIndex], 72, 0.4);
//         break;
//       case 3:
//         movieIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 0, 0.56)
//           : scrollFunc(this.cards[movieIndex], 90, 0.6);
//         break;
//       case 4:
//         movieIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 0, 0.76)
//           : scrollFunc(this.cards[movieIndex], 108, 0.8);
//         break;
//       case 5:
//         movieIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 0, 0.96)
//           : scrollFunc(this.cards[movieIndex], 126, 1);
//         break;
//     }
//   } else if (movieIndex < activeIndex) {
//     // Check index difference in backwards direction (left scrolling).
//     diff = activeIndex - movieIndex;
//     // Adapt scrolling speed and offset to navigate between one or several movie cards.
//     switch (diff) {
//       case 1:
//         activeIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 18, 0.16)
//           : scrollFunc(this.cards[movieIndex], 16, 0.2);
//         break;
//       case 2:
//         activeIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], 0, 0.36)
//           : scrollFunc(this.cards[movieIndex], -2, 0.4);
//         break;
//       case 3:
//         activeIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], -18, 0.56)
//           : scrollFunc(this.cards[movieIndex], -20, 0.6);
//         break;
//       case 4:
//         activeIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], -36, 0.76)
//           : scrollFunc(this.cards[movieIndex], -38, 0.8);
//         break;
//       case 5:
//         activeIndex === this.cards.length - 1
//           ? scrollFunc(this.cards[movieIndex], -54, 0.96)
//           : scrollFunc(this.cards[movieIndex], -56, 1);
//         break;
//     }
//   }
// };

/**
 * Shorthand function to navigate to a tab/section in the middle navigation (showtimes / details).
 * @param tl
 * @param off
 * @param off2
 * @param off3
 */
export const dualTween = (tl, off, off2, off3) => {
  tl.to('#nav-layer', { x: off })
    .to(
      '#text-bg',
      {
        attr: {
          x: off2
        }
      },
      '>-.3'
    )
    .to('.dual-screen', { x: off3 }, '>-.3');
};

/**
 * Function to navigate to chosen tab in the middle navigation.
 * @param pos
 */
export const toggleMidNav = pos => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'Power3.in',
      duration: 0.3
    }
  });

  pos === 0 ? this.dualTween(tl, '0%', '0%', '-100%') : this.dualTween(tl, '105%', '50%', '0%');
};

export const loadTrailers = (el, pos) => {
  const trailer = `<video src=${movieData.trailArr[this.activeIndex][pos]} controls></video>`;
  el.insertAdjacentHTML('beforeend', trailer);
};

/**
 * Function to populate elements visible after selecting an active movie card. Uses the index of the active card to select relevant data to display.
 * @param pos
 */
export const fetchInfo = pos => {
  const setInnerText = (el, arr, pos) => {
    el.innerText = arr[pos];
  };
  const resizeShot = (el, size, pos) => {
    gsap.set(el, {
      backgroundSize: size,
      backgroundPosition: pos
    });
  };
  setInnerText(this.bigInfo.querySelector('.grade'), movieData.gradeArr, pos);
  setInnerText(this.bigInfo.querySelector('.movie-title'), movieData.titles, pos);
  setInnerText(this.bigInfo.querySelector('.tags'), movieData.tagArr, pos);
  setInnerText(this.bigInfo.querySelector('.info-last'), movieData.secInfos, pos);
  setInnerText(this.movieCopy, movieData.synopses, pos);

  this.castItems.forEach((item, i) => {
    gsap.set(item.querySelector('.shot'), {
      backgroundImage: `url(${movieData.castArr[this.activeIndex][i].src})`
    });

    item.querySelector('h5').innerText = movieData.castArr[this.activeIndex][i].name;
    item.querySelector('p').innerText = movieData.castArr[this.activeIndex][i].role;

    // Resize and position actor thumbnails in the cast section.
    switch (this.activeIndex) {
      case 0:
        i === 2
          ? resizeShot(item.querySelector('.shot'), '125%', '75% 0')
          : i === 3
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 20%')
          : i === 4
          ? resizeShot(item.querySelector('.shot'), '195%', '40% 5%')
          : null;
        break;
      case 1:
        i === 0
          ? resizeShot(item.querySelector('.shot'), '120%', '50% 22.5%')
          : i === 1
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
          : i === 2
          ? resizeShot(item.querySelector('.shot'), '120%', '60% 15%')
          : i === 3
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 20%')
          : i === 4
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 15%')
          : null;
        break;
      case 2:
        i === 0
          ? resizeShot(item.querySelector('.shot'), '125%', '40% 7.5%')
          : i === 1
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
          : i === 2
          ? resizeShot(item.querySelector('.shot'), 'cover', '60% 40%')
          : i === 3
          ? resizeShot(item.querySelector('.shot'), '150%', '64% 10%')
          : i === 4
          ? resizeShot(item.querySelector('.shot'), '110%', '40% 15%')
          : null;
        break;
      case 3:
        i === 0
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 30%')
          : i === 1
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
          : i === 2
          ? resizeShot(item.querySelector('.shot'), '375%', '48% 12.5%')
          : i === 3
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 10%')
          : i === 4
          ? resizeShot(item.querySelector('.shot'), '110%', '100% 7.5%')
          : null;
        break;
      case 4:
        i === 0
          ? resizeShot(item.querySelector('.shot'), '150%', '60% 17.5%')
          : i === 1
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
          : i === 2
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 5%')
          : i === 3
          ? resizeShot(item.querySelector('.shot'), '120%', '90% 17.5%')
          : i === 4
          ? resizeShot(item.querySelector('.shot'), '110%', '0 7.5%')
          : null;
        break;
      case 5:
        i === 0
          ? resizeShot(item.querySelector('.shot'), '350%', '7.5%  0')
          : i === 1
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 10%')
          : i === 2
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 5%')
          : i === 3
          ? resizeShot(item.querySelector('.shot'), '150%', '50% 25%')
          : i === 4
          ? resizeShot(item.querySelector('.shot'), 'cover', '50% 20%')
          : null;
        break;
    }
  });

  this.trailerItems.forEach((item, i) => {
    gsap.set(item.children[0], {
      backgroundImage: `url(${movieData.trailPics[this.activeIndex][i]})`
    });
  });
};

export const switchOp = (el, val) => {
  gsap.set(el, { opacity: val });
};

export const fadeEl = (el, val, dur) => {
  gsap.to(el, { opacity: val, duration: dur, ease: 'none' });
};

/**
 * Function to execute shared element transition to the vertical section with movie details.
 * @param el
 * @param el2
 * @param pos
 */
export const flipCard = (el, el2, pos) => {
  // Parse data with the active index and display relevant information inside the hidden elements.
  this.fetchInfo(pos);

  // Set the hidden big movie picture right on top of the active movie card.
  Flip.fit('.big-poster', el, {
    absolute: true,
    props: 'borderRadius,boxShadow'
  });
  // Set the hidden primary info right on top of the equivalent element from the active card.
  Flip.fit('.big-movie-info', el2, { absolute: true });

  // Hide original elements and show entering elements to see the transition to the next view (big).
  this.cards.forEach((card, i) => {
    i === pos ? this.switchOp(card, 0) : this.fadeEl(card, 0, 0.2);
  });
  this.fadeAll('--layer-zero-opacity', '0');
  this.fadeAll('--layer-one-opacity', '1');

  // Get states from both hidden elements.
  const bigState = Flip.getState('.big-poster', {
    props: 'borderRadius,boxShadow',
    absolute: true
  });
  const infoState = Flip.getState('.big-movie-info', {
    absolute: true
  });
  // Set the hidden elements back to their original state(bigger).
  gsap.set('.big-poster', { clearProps: true });
  gsap.set('.big-movie-info', { clearProps: true });
  // Show previously hidden big picture and set relevant background image with the active index.
  gsap.set('.big-poster', {
    backgroundImage: `url(${movieData.pictures[pos]})`
  });
  // Animate now visible elements from 'small' state to 'big' state.
  Flip.from(bigState, {
    duration: 0.4,
    ease: 'power3.in',
    absolute: true,
    onComplete: () => {
      // Enable vertical scrolling.
      // gsap.set("#screen", { overflowY: "scroll" });
      // Enable pointer.
      gsap.set('#screen > #first-layer', { pointerEvents: 'all' });
      // Show close button to go back to the gallery view.
      this.fadeEl('.close-card svg', 1, 0.1);
    }
  });

  Flip.from(infoState, {
    duration: 0.4,
    absolute: true,
    ease: 'power3.in'
  });
  // Reveal last line of primary info.
  setTimeout(() => {
    this.fadeEl('.info-last', 1, 0.1);
  }, 0.2);
};

export const flipBack = () => {
  // Reverse order of operations to apply the FLIP technique to go back to the first view.
  this.fadeEl('.close-card svg', 0, 0.1);

  const picState = Flip.getState('.big-poster', {
    absolute: true,
    props: 'borderRadius,boxShadow'
  });

  const subState = Flip.getState('.big-movie-info', { absolute: true });

  setTimeout(() => {
    Flip.fit('.big-poster', this.posters[this.activeIndex], {
      absolute: true,
      props: 'borderRadius,boxShadow'
    });
    Flip.fit('.big-movie-info', this.infos[this.activeIndex], {
      absolute: true
    });

    Flip.from(picState, {
      duration: 0.4,
      ease: 'power3.in',
      absolute: true,
      onComplete: () => {
        // Hide previous (big) elements (poster,info and bottom content) and show original elements.
        this.cards.forEach((card, i) => {
          i === this.activeIndex ? this.switchOp(card, 1) : this.fadeEl(card, 1, 0.2);
        });
        this.switchOp('.big-poster', 0);
        this.switchOp('.big-movie-info', 0);
        this.fadeAll('--layer-zero-opacity', '1');
        this.fadeAll('--layer-one-opacity', '0');
        // Disable pointer events.
        gsap.set('#screen > #first-layer', { pointerEvents: 'none' });
        // Reset scroll position of cast and trailer galleries.
        gsap.to('.dual-screen.left .reel', 0, {
          scrollTo: {
            x: 0
          }
        });
      }
    });
    Flip.from(subState, {
      duration: 0.4,
      ease: 'power3.in'
    });
    // Hide last line of primary info.
    setTimeout(() => {
      this.fadeEl('.info-last', 0, 0.1);
    }, 200);
  }, 100);
};

/**
 * Expand trailer thumbnail to full-screen loaded video on click
 * @param el
 * @param pos
 */
export const expandTrailer = (el, pos) => {
  const thumbState = Flip.getState(el, {
    absolute: true,
    props: 'backgroundImage, borderRadius'
  });

  el.classList.toggle('open');

  setTimeout(() => {
    document.querySelector('#fixed-layer').appendChild(el);
    this.fadeEl('.big-poster', 0, 0.2);
    this.fadeEl('.big-movie-info', 0, 0.2);
    this.fadeEl('#mid-nav', 0, 0.2);
    this.fadeEl('#movie-copy', 0, 0.2);
    this.fadeEl('#cast-wrap', 0, 0.2);
    this.fadeEl('#trailer-wrap > h4', 0, 0.2);
    this.trailerItems.forEach((item, i) => {
      if (i !== pos) {
        this.fadeEl(item, 0, 0.2);
      }
    });
    this.fadeAll('--layer-two-opacity', 1);
    gsap.set(el, {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundImage: `url(${movieData.trailPics[this.activeIndex][pos]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '25px'
    });

    Flip.from(thumbState, {
      duration: 0.4,
      ease: 'power3.in',
      absolute: true,
      onComplete: () => {
        el.classList.toggle('active');
        gsap.set('#fixed-layer', {
          pointerEvents: 'all'
        });

        setTimeout(() => {
          const videoClip = `<video disablePictureInPicture controls controlslist='nodownload nofullscreen' src=${
            movieData.trailArr[this.activeIndex][pos]
          } type='video/mp4'></video>`;
          el.insertAdjacentHTML('beforeend', videoClip);
          setTimeout(() => {
            el.classList.toggle('active');
            gsap.to(this.backArrow, {
              opacity: 1,
              x: '0',
              duration: 0.2,
              ease: 'none'
            });
          }, 30);
        }, 150);
      }
    });
  }, 100);
};

export const closeTrailer = (el, pos) => {
  // Reverse and adjust FLIP animation back to first thumbnail view.
  const clip = this.fixedLayer.querySelector('.video-thumb');
  const vid = this.fixedLayer.querySelector('video');
  const target = this.trailerItems[pos];
  const clipState = Flip.getState(clip, { absolute: true });

  gsap.to(this.backArrow, {
    opacity: 0,
    x: '-10%',
    duration: 0.2,
    ease: 'none'
  });
  clip.classList.toggle('active');

  setTimeout(() => {
    clip.removeChild(vid);
    clip.classList.toggle('active');

    setTimeout(() => {
      Flip.fit(clip, target, {
        absolute: true,
        props: 'borderRadius'
      });

      Flip.from(clipState, {
        duration: 0.4,
        ease: 'Power3.in',
        absolute: true,
        onComplete: () => {
          this.fadeEl('.big-poster', 1, 0.2);
          this.fadeEl('.big-movie-info', 1, 0.2);
          this.fadeEl('#mid-nav', 1, 0.2);
          this.fadeEl('#movie-copy', 1, 0.2);
          this.fadeEl('#cast-wrap', 1, 0.2);
          this.fadeEl('#trailer-wrap > h4', 1, 0.2);
          this.trailerItems.forEach((item, i) => {
            if (i !== pos) {
              this.fadeEl(item, 1, 0.2);
            }
          });
          this.fadeAll('--layer-two-opacity', 0);
          gsap.set('#fixed-layer', {
            pointerEvents: 'none'
          });
          target.appendChild(clip);
          gsap.set(clip, { clearProps: true });
          gsap.set(clip, {
            backgroundImage: `url(${movieData.trailPics[this.activeIndex][pos]})`
          });

          target.querySelector('.video-thumb').classList.toggle('open');
        }
      });
    }, 150);
  }, 200);
};

/**
 * Handle all click interactions.
 */
export const handleClicks = () => {
  document.addEventListener(
    'click',
    e => {
      // Handles click of search input button.
      if (e.target.matches('#search-icon')) {
        const target = this.searchField.value;
        this.inputNav(target);
      }
      // Handles click of close button (detailed view).
      else if (e.target.matches('.close-card')) {
        if (document.querySelector('#first-layer').scrollTop !== 0) {
          gsap.to('#first-layer', 0.2, {
            scrollTo: {
              y: 0
            },
            onComplete: () => {
              dynamicScroll.flipBack();
            }
          });
        } else {
          dynamicScroll.flipBack();
        }
      }
      // Handles click on middle navigation tab buttons.
      else if (e.target.matches('#mid-nav a')) {
        const index = this.midNavLinks.indexOf(e.target);
        this.toggleMidNav(index);
      }
      // Handles click on movie cards (links).
      else if (e.target.matches('.movie-card a')) {
        // Disable hash redirection.
        e.preventDefault();
        // Get index of active movie card inside its respective array.
        const activeIndex = this.cards.indexOf(document.querySelector('.movie-card.active'));
        // Get index of selected movie card.
        const currentIndex = this.links.indexOf(e.target);
        // Handle forward navigation between movie cards (only one card every time).
        if (currentIndex > activeIndex) {
          currentIndex === this.cards.length - 1
            ? this.scrollFunc(this.cards[currentIndex], 0, 0.16)
            : this.scrollFunc(this.cards[currentIndex], 54, 0.2);
        } else if (currentIndex < activeIndex) {
          this.scrollFunc(this.cards[currentIndex], 18, 0.2);
        }
        // Handle click on active movie card.
        else if (currentIndex === activeIndex) {
          this.activeIndex = activeIndex;
          this.flipCard(this.posters[activeIndex], this.infos[activeIndex], activeIndex);
        }
      } else if (e.target.matches('.video-thumb')) {
        this.trailerIndex = this.trailerItems.indexOf(e.target.parentElement);
        this.expandTrailer(e.target, this.trailerIndex);
      } else if (e.target.matches('#fixed-layer .back-arrow')) {
        this.closeTrailer(e.target, this.trailerIndex);
      }
    },
    false
  );
};

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

// export const loadTrailers = (el, pos) => {
//   const trailer = `<video src=${movieData[activeIndex].trail[pos]} controls></video>`;
//   el.insertAdjacentHTML("beforeend", trailer);
//   };

//
// /**
//  * Function to populate elements visible after selecting an active movie card. Uses the index of the active card to select relevant data to display.
//  * @param pos
//  */
// export const fetchInfo = pos => {
//   // const setInnerText = (el, arr, pos) => {
//   //   el.innerText = arr[pos];
//   // };
//   const resizeShot = (el, size, pos) => {
//     gsap.set(el, {
//       backgroundSize: size,
//       backgroundPosition: pos
//     });
//   };
//   // setInnerText(this.bigInfo.querySelector('.grade'), movieData.gradeArr, pos);
//   // setInnerText(this.bigInfo.querySelector('.movie-title'), movieData.titles, pos);
//   // setInnerText(this.bigInfo.querySelector('.tags'), movieData.tagArr, pos);
//   // setInnerText(this.bigInfo.querySelector('.info-last'), movieData.secInfos, pos);
//   // setInnerText(this.movieCopy, movieData.synopses, pos);
//
//   this.castItems.forEach((item, i) => {
//     // gsap.set(item.querySelector('.shot'), {
//     //   backgroundImage: `;
//   url(${movieData.castArr[this.activeIndex][i].src})`
//     // });
//     //
//     // item.querySelector('h5').innerText = movieData.castArr[this.activeIndex][i].name;
//     // item.querySelector('p').innerText = movieData.castArr[this.activeIndex][i].role;
//
//     // Resize and position actor thumbnails in the cast section.
//     switch (this.activeIndex) {
//       case 0:
//         i === 2
//           ? resizeShot(item.querySelector('.shot'), '125%', '75% 0')
//           : i === 3
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 20%')
//           : i === 4
//           ? resizeShot(item.querySelector('.shot'), '195%', '40% 5%')
//           : null;
//         break;
//       case 1:
//         i === 0
//           ? resizeShot(item.querySelector('.shot'), '120%', '50% 22.5%')
//           : i === 1
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
//           : i === 2
//           ? resizeShot(item.querySelector('.shot'), '120%', '60% 15%')
//           : i === 3
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 20%')
//           : i === 4
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 15%')
//           : null;
//         break;
//       case 2:
//         i === 0
//           ? resizeShot(item.querySelector('.shot'), '125%', '40% 7.5%')
//           : i === 1
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
//           : i === 2
//           ? resizeShot(item.querySelector('.shot'), 'cover', '60% 40%')
//           : i === 3
//           ? resizeShot(item.querySelector('.shot'), '150%', '64% 10%')
//           : i === 4
//           ? resizeShot(item.querySelector('.shot'), '110%', '40% 15%')
//           : null;
//         break;
//       case 3:
//         i === 0
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 30%')
//           : i === 1
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
//           : i === 2
//           ? resizeShot(item.querySelector('.shot'), '375%', '48% 12.5%')
//           : i === 3
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 10%')
//           : i === 4
//           ? resizeShot(item.querySelector('.shot'), '110%', '100% 7.5%')
//           : null;
//         break;
//       case 4:
//         i === 0
//           ? resizeShot(item.querySelector('.shot'), '150%', '60% 17.5%')
//           : i === 1
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 25%')
//           : i === 2
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 5%')
//           : i === 3
//           ? resizeShot(item.querySelector('.shot'), '120%', '90% 17.5%')
//           : i === 4
//           ? resizeShot(item.querySelector('.shot'), '110%', '0 7.5%')
//           : null;
//         break;
//       case 5:
//         i === 0
//           ? resizeShot(item.querySelector('.shot'), '350%', '7.5%  0')
//           : i === 1
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 10%')
//           : i === 2
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 5%')
//           : i === 3
//           ? resizeShot(item.querySelector('.shot'), '150%', '50% 25%')
//           : i === 4
//           ? resizeShot(item.querySelector('.shot'), 'cover', '50% 20%')
//           : null;
//         break;
//     }
//   });
//
//   // this.trailerItems.forEach((item, i) => {
//   //   gsap.set(item.children[0], {
//   //     backgroundImage: `;
//   url(${movieData.trailPics[this.activeIndex][i]})`
//   //   });
//   // });
// };

export const switchOp = (el, val) => {
  gsap.set(el, { opacity: val });
};

export const fadeEl = (el, val, dur) => {
  gsap.to(el, { opacity: val, duration: dur, ease: 'none' });
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
            backgroundImage: `
url($
  {
    movieData.trailPics[this.activeIndex][pos]
  }
)
  `
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
      // // Handles click of search input button.
      // if (e.target.matches('#search-icon')) {
      //   const target = this.searchField.value;
      //   this.inputNav(target);
      // }
      // Handles click of close button (detailed view).
      if (e.target.matches('.close-card')) {
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
      // // Handles click on middle navigation tab buttons.
      // else if (e.target.matches('#mid-nav a')) {
      //   const index = this.midNavLinks.indexOf(e.target);
      //   this.toggleMidNav(index);
      // }
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

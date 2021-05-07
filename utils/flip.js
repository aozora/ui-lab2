import gsap from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import { fadeAll } from './index';

/**
 * Function to execute shared element transition to the vertical section with movie details.
 * @param el
 * @param el2
 * @param pos
 */
export const flipCard = (el, el2, pos) => {
  // Parse data with the active index and display relevant information inside the hidden elements.
  // fetchInfo(pos);

  // Set the hidden big movie picture right on top of the active movie card.
  Flip.fit('.big-poster', el, {
    absolute: true,
    props: 'borderRadius,boxShadow'
  });

  // Set the hidden primary info right on top of the equivalent element from the active card.
  Flip.fit('.big-movie-info', el2, { absolute: true });

  // Hide original elements and show entering elements to see the transition to the next view (big).
  const cards = Array.from(document.querySelectorAll('.movie-card'));
  cards.forEach((card, i) => {
    i === pos ? this.switchOp(card, 0) : this.fadeEl(card, 0, 0.2);
  });

  fadeAll('--layer-zero-opacity', '0');
  fadeAll('--layer-one-opacity', '1');

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

// export const flipBack = () => {
//   // Reverse order of operations to apply the FLIP technique to go back to the first view.
//   this.fadeEl('.close-card svg', 0, 0.1);
//
//   const picState = Flip.getState('.big-poster', {
//     absolute: true,
//     props: 'borderRadius,boxShadow'
//   });
//
//   const subState = Flip.getState('.big-movie-info', { absolute: true });
//
//   setTimeout(() => {
//     Flip.fit('.big-poster', this.posters[this.activeIndex], {
//       absolute: true,
//       props: 'borderRadius,boxShadow'
//     });
//     Flip.fit('.big-movie-info', this.infos[this.activeIndex], {
//       absolute: true
//     });
//
//     Flip.from(picState, {
//       duration: 0.4,
//       ease: 'power3.in',
//       absolute: true,
//       onComplete: () => {
//         // Hide previous (big) elements (poster,info and bottom content) and show original elements.
//         this.cards.forEach((card, i) => {
//           i === this.activeIndex ? this.switchOp(card, 1) : this.fadeEl(card, 1, 0.2);
//         });
//         this.switchOp('.big-poster', 0);
//         this.switchOp('.big-movie-info', 0);
//         this.fadeAll('--layer-zero-opacity', '1');
//         this.fadeAll('--layer-one-opacity', '0');
//         // Disable pointer events.
//         gsap.set('#screen > #first-layer', { pointerEvents: 'none' });
//         // Reset scroll position of cast and trailer galleries.
//         gsap.to('.dual-screen.left .reel', 0, {
//           scrollTo: {
//             x: 0
//           }
//         });
//       }
//     });
//     Flip.from(subState, {
//       duration: 0.4,
//       ease: 'power3.in'
//     });
//     // Hide last line of primary info.
//     setTimeout(() => {
//       this.fadeEl('.info-last', 0, 0.1);
//     }, 200);
//   }, 100);
// };

/**
 * Expand trailer thumbnail to full-screen loaded video on click
 * @param el
 * @param pos
 */
// export const expandTrailer = (el, pos) => {
//   let thumbState = Flip.getState(el, {
//     absolute: true,
//     props: "backgroundImage, borderRadius"
//   });
//
//   el.classList.toggle("open");
//
//   setTimeout(() => {
//     document.querySelector("#fixed-layer").appendChild(el);
//     this.fadeEl(".big-poster", 0, 0.2);
//     this.fadeEl(".big-movie-info", 0, 0.2);
//     this.fadeEl("#mid-nav", 0, 0.2);
//     this.fadeEl("#movie-copy", 0, 0.2);
//     this.fadeEl("#cast-wrap", 0, 0.2);
//     this.fadeEl("#trailer-wrap > h4", 0, 0.2);
//     this.trailerItems.forEach((item, i) => {
//       if (i !== pos) {
//         this.fadeEl(item, 0, 0.2);
//       }
//     });
//     this.fadeAll("--layer-two-opacity", 1);
//     gsap.set(el, {
//       width: "100%",
//       height: "100%",
//       position: "absolute",
//       backgroundImage: `url(${movieData.trailPics[this.activeIndex][pos]})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       borderRadius: "25px"
//     });
//
//     Flip.from(thumbState, {
//       duration: 0.4,
//       ease: "power3.in",
//       absolute: true,
//       onComplete: () => {
//         el.classList.toggle("active");
//         gsap.set("#fixed-layer", {
//           pointerEvents: "all"
//         });
//
//         setTimeout(() => {
//           let videoClip = `<video disablePictureInPicture controls controlslist='nodownload nofullscreen' src=${movieData.trailArr[this.activeIndex][pos]} type='video/mp4'></video>`;
//           el.insertAdjacentHTML("beforeend", videoClip);
//
//           setTimeout(() => {
//             el.classList.toggle("active");
//             gsap.to(this.backArrow, {
//               opacity: 1,
//               x: "0",
//               duration: 0.2,
//               ease: "none"
//             });
//           }, 30);
//
//         }, 150);
//       }
//     });
//   }, 100);
//
// }

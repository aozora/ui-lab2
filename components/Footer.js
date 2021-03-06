import React, { useState } from 'react';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <footer>
      <nav>
        <ul>
          <li>
            <button
              type="button"
              onClick={() => setActiveIndex(0)}
              className={activeIndex === 0 ? 'active' : ''}
            >
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
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveIndex(1)}
              className={activeIndex === 1 ? 'active' : ''}
            >
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
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveIndex(2)}
              className={activeIndex === 2 ? 'active' : ''}
            >
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
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveIndex(3)}
              className={activeIndex === 3 ? 'active' : ''}
            >
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
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;

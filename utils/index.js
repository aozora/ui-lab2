/**
 * Clock object to handle display of time (European time, not much customization here).
 * @type {{init: dynamicClock.init, wrap: Element, parseTime: dynamicClock.parseTime}}
 */
export const dynamicClock = {
  wrap: document.querySelector('#clock'),
  parseTime() {
    const baseDate = new Date();
    const baseHours = baseDate.getHours();
    const baseMins = baseDate.getMinutes();
    let cleanHours;
    let cleanMins;
    const hourArr = baseHours.toString().split('');
    const minArr = baseMins.toString().split('');

    hourArr.length < 2
      ? (hourArr.unshift('0'), (cleanHours = hourArr.join('')))
      : (cleanHours = baseHours);
    minArr.length < 2
      ? (minArr.unshift('0'), (cleanMins = minArr.join('')))
      : (cleanMins = baseMins);
    this.wrap.innerText = `${cleanHours}:${cleanMins}`;
  },

  init() {
    this.parseTime();
    // Parse time every second to update.
    setInterval(() => {
      this.parseTime();
    }, 1000);
  }
};

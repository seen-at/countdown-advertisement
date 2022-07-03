const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// hard-coded date initially to get different countdown values
// let futureDate = new Date(2022, 7, 12, 18, 30, 0);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// date always set to 10 days beyond the current date
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30);

// the parameters give the value
const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// need arrays to get the names
let month = futureDate.getMonth();
month = months[month];
// obtains the weekday dynamically with the given parameters
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}:${minutes}am`;

// getTime() gets the time in milliseconds for a given date
const futureTime = futureDate.getTime();

function getRemainingTime() {
  // time in milliseconds for the current date
  const today = new Date().getTime();
  const t = futureTime - today;

  // values in milliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  // items contain the hard-coded values of the countdown cards in HTML are iterated over
  items.forEach(function (item, index) {
    // item is used to access the h4 classes within 'deadline-format' in HTML one by one
    // index allows the values from the array to be assigned to item since they are in the same order
    item.innerHTML = format(values[index]);
  });

  // this function adds a zero in front of a singular number in the card
  function format(item) {
    if (item < 10) {
      return `0${item}`;
    }
    else {
      return item;
    }
  }

  // function clears the countdown cards once the values reach 0
  // countdown is accessed when it is called before the function has been called
  if (t < 0) {
    clearInterval(countdown);
    // the countdown cards are replaced by the text
    deadline.innerHTML = `<h4>sorry, this giveaway has expired</h4>`
  }
}

// real-time countdown
let countdown = setInterval(getRemainingTime, 1000);

// to access the countdown, the function has to be called after the variable
getRemainingTime();
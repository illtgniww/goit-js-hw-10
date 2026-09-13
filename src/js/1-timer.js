// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
        iziToast.error({message: 'Please choose a date in the future', position: 'topRight'});
        startBtn.disabled = true;
      }
      else {
        startBtn.disabled = false;
      }
  },
};
flatpickr(input, options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let userSelectedDate;
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    input.disabled = true;
    const timerID = setInterval(() => {
        const currentDate = new Date();
        const timeDifference = userSelectedDate - currentDate;
        if (timeDifference <= 0) {
            clearInterval(timerID);
            input.disabled = false;
            return;
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeDifference);
            document.querySelector('[data-days]').textContent = addLeadingZero(days);
            document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
            document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
            document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
        }
    }, 1000);
})

function addLeadingZero(value) {
        return String(value).padStart(2, '0');
}
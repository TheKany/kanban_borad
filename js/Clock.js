const MainClock = document.querySelector('.clock');
const MainDate = document.querySelector('.date');

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  MainClock.innerHTML = hour + ':' + minutes + ':' + seconds;

  setInterval(getTime, 1000);
}

function getDate() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDay();
  const dayOfWeek = date.getDate();

  const StrMonth = getMonthString(month);

  MainDate.innerHTML =
    StrMonth +
    '.' +
    ('00' + day.toString()).slice(-2) +
    '.' +
    ('00' + dayOfWeek.toString()).slice(-2);
}

function getMonthString(month) {
  switch (month) {
    case 1:
      return 'Jan';
      break;
    case 2:
      return 'Feb';
      break;
    case 3:
      return 'Mar';
      break;
    case 4:
      return 'Apr';
      break;
    case 5:
      return 'May';
      break;
    case 6:
      return 'Jun';
      break;
    case 7:
      return 'Jal';
      break;
    case 8:
      return 'Aug';
      break;
    case 9:
      return 'Sep';
      break;
    case 10:
      return 'Oct';
      break;
    case 11:
      return 'Nov';
      break;
    default:
      return 'Dec';
  }
}

getTime(MainClock);
getDate(MainDate);

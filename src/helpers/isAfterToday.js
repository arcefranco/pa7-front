export default function isAfterToday(date) {
  return new Date(date).valueOf() > new Date().valueOf();
  }


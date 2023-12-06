export const generateTimeSlots = (openingTime, closingTime, turnDuration) => {
  const slots = [];

  const duration = parseInt(turnDuration, 10);
  if (isNaN(duration) || duration <= 0) {
    return slots;
  }

  let [hours, minutes] = openingTime.split(':').map(Number);
  const closingHours = closingTime.split(':')[0];

  while (hours < parseInt(closingHours, 10) || (hours === parseInt(closingHours, 10) && minutes < 60)) {
    slots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    minutes += duration;
    if (minutes >= 60) {
      hours += 1;
      minutes %= 60;
    }
  }

  return slots;
};

export const formatTimeHHMMSS = (timeString) => {
  if (!timeString) return '';  
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};
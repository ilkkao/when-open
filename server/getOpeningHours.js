const fs = require('fs');
const path = require('path');
const jsonschema = require('jsonschema');
const schema = require('./schema.json');

const validator = new jsonschema.Validator();

function getNextDay(day) {
  const WEEKDAYS = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  const index = WEEKDAYS.findIndex(currentDay => currentDay === day);
  const nextDayIndex = index === WEEKDAYS.length - 1 ? 0 : index + 1;

  return WEEKDAYS[nextDayIndex];
}

function loadOpeningHours(restaurant) {
  const file = fs.readFileSync(
    path.join(__dirname, `../data/${restaurant}.json`),
    'utf8'
  );

  return JSON.parse(file);
}

function denormalizeOpeningHours(openingHours) {
  // TODO: Check that open and close events take turns correctly in the data file
  const denormalizedOpeningHours = [];

  Object.keys(openingHours).forEach(day => {
    const daySchedule = openingHours[day];
    const denormalizedDaySchedule = [];

    daySchedule.forEach((event, index) => {
      if (event.type === 'open') {
        const end =
          index === daySchedule.length - 1
            ? openingHours[getNextDay(day)][0]
            : daySchedule[index + 1];

        denormalizedDaySchedule.push([event.value, end.value]);
      }
    });

    denormalizedOpeningHours.push({ day, schedule: denormalizedDaySchedule });
  });

  return denormalizedOpeningHours;
}

module.exports = function getOpeningHours(restaurant) {
  const openingHours = loadOpeningHours(restaurant);
  const validationResult = validator.validate(openingHours, schema);

  if (!validationResult.valid) {
    return null;
  }

  return denormalizeOpeningHours(openingHours);
};

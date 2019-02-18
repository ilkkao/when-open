import React from 'react';
import PropTypes from 'prop-types';
import { format, addSeconds } from 'date-fns';
import TodayLabel from '../TodayLabel';
import capitalize from '../../lib/capitalize';
import styles from './index.css';

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

function formattedTime(timeInSeconds) {
  const date = addSeconds(new Date(0), timeInSeconds);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const hour = format(utcDate, 'h');
  const minute = format(utcDate, 'mm');
  const amPm = format(utcDate, 'A');

  // Show minutes only when necessary
  return `${hour}${minute === '00' ? ' ' : `:${minute}`} ${amPm}`;
}

export default function DaySchedule({ day, schedule }) {
  const openList = schedule.map(([start, end]) => (
    <div key={start}>
      {formattedTime(start)}
      {' - '}
      {formattedTime(end)}
    </div>
  ));
  const currentDate = new Date();
  const isToday = DAYS[currentDate.getDay()] === day;

  return (
    <div className={styles.container}>
      <div className={styles.dayName}>{capitalize(day)}</div>
      {isToday ? <TodayLabel /> : null}
      <div className={styles.hoursList}>
        {openList.length > 0 ? openList : <div className={styles.closed}>Closed</div>}
      </div>
    </div>
  );
}

DaySchedule.propTypes = {
  day: PropTypes.string.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import DaySchedule from '../DaySchedule';
import ClockIcon from '../ClockIcon';
import styles from './index.css';

export default function OpeningHours({ hours }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ClockIcon width={18} height={18} />
        <div className={styles.title}>Opening hours</div>
      </div>
      {hours.map(daySchedule => (
        <DaySchedule
          key={daySchedule.day}
          day={daySchedule.day}
          schedule={daySchedule.schedule}
        />
      ))}
    </div>
  );
}

OpeningHours.propTypes = {
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      schedule: PropTypes.array.isRequired
    })
  ).isRequired
};

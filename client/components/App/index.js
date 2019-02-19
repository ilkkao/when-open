import React, { Component } from 'react';
import Select from 'react-select';
import OpeningHours from '../OpeningHours';
import styles from './index.css';
import capitalize from '../../lib/capitalize';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      selectedRestaurant: null
    };

    this.handleChangeRestaurant = this.handleChangeRestaurant.bind(this);
  }

  async componentWillMount() {
    const response = await fetch('/api/restaurants.json');
    const restaurantNames = await response.json();

    const restaurants = restaurantNames.map(restaurant => ({
      value: restaurant,
      label: capitalize(restaurant)
    }));

    this.setState({
      restaurants,
      selectedRestaurant: restaurants[0]
    });

    await this.fetchHours(restaurantNames[0]);
  }

  async handleChangeRestaurant(selectedRestaurant) {
    this.setState({ selectedRestaurant });

    await this.fetchHours(selectedRestaurant.value);
  }

  async fetchHours(restaurant) {
    const response = await fetch(`/api/restaurants/${restaurant}/opening-hours.json`);
    const openingHours = await response.json();

    this.setState({ openingHours });
  }

  render() {
    const { restaurants, selectedRestaurant, openingHours } = this.state;

    return (
      <div className={styles.app}>
        <div className={styles.select}>
          <Select
            value={selectedRestaurant}
            onChange={this.handleChangeRestaurant}
            options={restaurants}
          />
        </div>
        <div className={styles.background}>
          {openingHours ? <OpeningHours hours={openingHours} /> : null}
        </div>
      </div>
    );
  }
}

export default App;

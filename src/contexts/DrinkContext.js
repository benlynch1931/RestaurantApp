import React, { createContext, Component } from 'react';

export const DrinkContext = createContext();


class DrinkContextProvider extends Component {
  state = {
    screen: 'main',
    previousScreen: null
  }

  setScreen = (newScreen, previousScreen) => {
    this.setState({ screen: newScreen })
    this.setState({ previousScreen: previousScreen })
  }

  

  render() {
    return (
      <DrinkContext.Provider value={{
        ...this.state,
        setScreen: this.setScreen
      }}>
      {this.props.children}
      </DrinkContext.Provider>
    )
  }
}

export default DrinkContextProvider;

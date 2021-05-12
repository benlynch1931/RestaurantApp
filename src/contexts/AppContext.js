import React, { createContext, Component } from 'react';

export const AppContext = createContext();


class AppContextProvider extends Component {
  state = {
    section: 'home',
    previousSection: null,
    title: 'Home',
    total: 0,
    basket: []
  }

  setSection = (newSection, previousSection) => {
    this.setState({ section: newSection })
    this.setState({ previousSection: previousSection })
  }

  setTitle = (newTitle) => {
    this.setState({ title: newTitle })
  }
  
  addToTotal = (addition) => {
    this.setState({ total: addition })
  }
  
  removeFromTotal = (subtraction) => {
    this.setState({ total: subtraction })
  }
  
  addToBasket = (basket) => {
    this.setState({ basket: basket })
  }
  
  removeFromBasket = (basket) => {
    this.setState({ basket: basket })
  }
  

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        setSection: this.setSection,
        setTitle: this.setTitle,
        addToTotal: this.addToTotal,
        removeFromTotal: this.removeFromTotal,
        addToBasket: this.addToBasket,
        removeFromBasket: this.removeFromBasket
      }}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContextProvider;

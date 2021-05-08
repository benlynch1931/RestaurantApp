import React, { createContext, Component } from 'react';

export const AppContext = createContext();


class AppContextProvider extends Component {
  state = {
    section: 'home',
    previousSection: null,
    title: 'Home',
    total: 0
  }

  setSection = (newSection, previousSection) => {
    this.setState({ section: newSection })
    this.setState({ previousSection: previousSection })
  }

  setTitle = (newTitle) => {
    this.setState({ title: newTitle })
  }
  

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        setSection: this.setSection,
        setTitle: this.setTitle
      }}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContextProvider;

import React, { createContext, Component } from 'react';

export const TabContext = createContext();


class TabContextProvider extends Component {
  state = {
    tabs: []
  }
  
  addTab = (newTabs) => {
    this.setState({ tabs: newTabs })
  }


  

  render() {
    return (
      <TabContext.Provider value={{
        ...this.state,
        addTab: this.addTab
      }}>
      {this.props.children}
      </TabContext.Provider>
    )
  }
}

export default TabContextProvider;

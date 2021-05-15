import React, { createContext, Component } from 'react';

export const TabContext = createContext();


class TabContextProvider extends Component {
  state = {
    tabs: [],
    isCurrentTab: false,
    currentTabNumber: null,
    currentTabName: null,
    viewTabInfo: {
      name: '',
      number: '',
      basket: [],
      total: 0
    }
  }
  
  addTab = (newTabs) => {
    this.setState({ tabs: newTabs })
  }
  
  setIsCurrentTab = (newBoolean) => {
    this.setState({ isCurrentTab: newBoolean })
  }
  
  setCurrentTabNumber = (tabNumber) => {
    this.setState({ currentTabNumber: tabNumber })
  }
  
  setCurrentTabName = (tabName) => {
    this.setState({ currentTabName: tabName })
  }
  
  setViewTabInfo = (tab) => {
    this.setState({ viewTabInfo: tab })
  }


  

  render() {
    return (
      <TabContext.Provider value={{
        ...this.state,
        addTab: this.addTab,
        setIsCurrentTab: this.setIsCurrentTab,
        setCurrentTabNumber: this.setCurrentTabNumber,
        setCurrentTabName: this.setCurrentTabName,
        setViewTabInfo: this.setViewTabInfo
      }}>
      {this.props.children}
      </TabContext.Provider>
    )
  }
}

export default TabContextProvider;

import React, { createContext, Component } from 'react';

export const AppContext = createContext();


class AppContextProvider extends Component {
  state = {
    section: 'view-groups',
    previousSection: null,
    title: 'Home',
    total: 0,
    basket: [],
    departments: [],
    selectedDepartment: null,
    groups: [],
    selectedGroup: null,
    pluList: []
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
  
  setDepartments = (departments) => {
    this.setState({ departments: departments })
  }
  
  setGroups = (groups) => {
    this.setState({ groups: groups })
  }
  
  setPluList = (plu) => {
    this.setState({ pluList: plu })
  }
  
  setSelectedGroup = (groupID) => {
    this.setState({ selectedGroup: groupID })
  }
  
  setSelectedDepartment = (departmentID) => {
    thi.setState({ selectedDepartment: departmentID })
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
        removeFromBasket: this.removeFromBasket,
        
        setDepartments: this.setDepartments,
        setGroups: this.setGroups,
        setPluList: this.setPluList,
        setSelectedGroup: this.setSelectedGroup,
        setSelectedDepartment: this.setSelectedDepartment
      }}>
      {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContextProvider;

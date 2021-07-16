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
    pluList: [],
    orders: []
  }

  setSection = (newSection, previousSection) => {
    this.setState({ section: newSection })
    this.setState({ previousSection: previousSection })
  }

  setTitle = (newTitle) => {
    this.setState({ title: newTitle })
  }
  
  setTotal = (addition) => {
    this.setState({ total: addition })
  }
  
  
  addToBasket = (basket) => {
    this.setState({ basket: basket })
  }
  
  setBasket = (basket) => {
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
    this.setState({ selectedDepartment: departmentID })
  }
  
  addOrder = (newOrder) => {
    this.setState({ orders: [ ...this.state.orders, ...newOrder ] })
  }
  

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        setSection: this.setSection,
        setTitle: this.setTitle,
        setTotal: this.setTotal,
        addToBasket: this.addToBasket,
        setBasket: this.setBasket,
        
        addOrder: this.addOrder,
        
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

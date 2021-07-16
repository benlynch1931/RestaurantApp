import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { DOMAIN_IP } from '@env'

const REPORTINGS_BODY = {
    "NET_total": 0,
    "GROSS_total": 0,
    "CASH_total": 0,
    "CARD_total": 0,
    "total": 0,
    "GROUP_total": 0,
    "DEPARTMENT_total": 0,
    "BAR_total": 0,
    "KITCHEN_total": 0,
    "no_of_tabs": 0
}

export const pushNewTabToDatabase = (tabName, tabId, total, basket) => {
  const formattedBasket = `${formatBasketForDatabase(basket)}`
  
  const body = {
    name: tabName,
    id: tabId,
    total: total,
    basket: formattedBasket,
  }
  fetch(`http://${DOMAIN_IP}:6030/api/tabs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
}

export const updateExistingTabInDatabase = (tabName, tabId, total, tabBasket) => {
  const formattedBasket = `${formatBasketForDatabase(tabBasket)}`
  
  const body = {
    name: tabName,
    id: tabId,
    total: total,
    basket: formattedBasket,
  }
  fetch(`http://${DOMAIN_IP}:6030/api/tabs/${tabId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
}
console.log(DOMAIN_IP)

export const createNewOrder = (orderBasket, tabId, total, isPaid) => {
  const body = {
    "table_number": tabId,
    "total": total,
    "orders": formatBasketForDatabase(orderBasket),
    "employees_id": 1,
    "is_paid": isPaid
  }
  fetch(`http://${DOMAIN_IP}:6030/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
}

export const updateReportings = (field, value) => {
  let body = REPORTINGS_BODY
  body[field] = value
  fetch(`http://${DOMAIN_IP}:6030/api/reportings/0`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const extractBasketInfo = (tabBasket) => {
  const formattedItems = []
  const itemsQuantities = {}
  const separateItems = tabBasket.split(';')
  separateItems.forEach((item, idx) => {
    const itemInfoSplit = item.split(',')
    itemsQuantities[itemInfoSplit[0].split(':')[1]] = {
        [itemInfoSplit[0].split(':')[0]]: convertValue(itemInfoSplit[0].split(':')),
        [itemInfoSplit[1].split(':')[0]]: convertValue(itemInfoSplit[1].split(':')),
        [itemInfoSplit[2].split(':')[0]]: convertValue(itemInfoSplit[2].split(':')),
        [itemInfoSplit[3].split(':')[0]]: convertValue(itemInfoSplit[3].split(':')),
        [itemInfoSplit[4].split(':')[0]]: convertValue(itemInfoSplit[4].split(':'))
      }
  });
  const itemsQuantitiesArray = Object.entries(itemsQuantities)
  itemsQuantitiesArray.forEach((item, idx) => {
    formattedItems.push(item[1])
  });

  return formattedItems;
  
  
}

const convertValue = ([key, value]) => {
  if (key === 'quantity') {
    return stringToInteger(value)
  } else if (key === 'displayBar' || key === 'displayKitchen') {
    return stringToBoolean(value)
  } else if (key === 'price') {
    return stringToFloat(value)
  } else {
    return value
  }
}

export const addItemsToExistingTab = (basket, tab, currentTabIndexPosition, tabList) => {
  let updatedTabBasket = []
  basket.forEach((basketItem, basketIndex) => {
    let edited = false
    tab.basket.forEach((tabItem, TabBasketIndex) => {
        if (tabItem.label === basketItem.label) {
          edited = true
          tabItem.quantity += basketItem.quantity
          return
        }
    });
    // if the basket item isn't in the tab basket (using edited var)
    if (edited === false) {
      updatedTabBasket.push(basketItem)
    }
  });
  updatedTabBasket.splice(0, 0, ...tab.basket)
  let newTotal = 0
  updatedTabBasket.forEach((item, i) => {
    newTotal += item.price * item.quantity
  });
  let updatedTab = tab
  updatedTab.basket = updatedTabBasket
  updatedTab.total = newTotal
  const updatedTabList = tabList.splice(currentTabIndexPosition, 1, updatedTab)
  return [updatedTabList, updatedTab]
  
}

export const removeItemFromExistingTab = (itemLabel, basket, basketIndex, currentTabIndexPosition, tabs) => {
  const originalBasket = basket;
  let updatedBasket = [];
  const originalTabList = tabs;
  const originalTab = tabs[currentTabIndexPosition];
  basket.forEach((basketItem, idx) => {
    // if quantity over 1, remove 1
    if (itemLabel === basketItem.label && basketItem.quantity > 1) {
      basketItem.quantity -= 1;
      updatedBasket.push(basketItem)
    // if it's not the right item just keep it the same
    } else if (itemLabel != basketItem.label) {
      updatedBasket.push(basketItem)
    }
    // (hidden) if the quantity is 1, `remove` item by not pushing it to new basket
  });
  let newTotal = 0
  updatedBasket.forEach((item, i) => {
    newTotal += item.price * item.quantity
  });
  
  let updatedTab = originalTab
  updatedTab.basket = updatedBasket;
  updatedTab.total = newTotal;
  let newTabList = originalTabList
  newTabList.splice(currentTabIndexPosition, 1, updatedTab)
  return [newTabList, updatedTab];
}



export const formatTabs = (tabs) => {
  let formattedTabs = []
  tabs.forEach((tab, i) => {
    tab.basket = extractBasketInfo(tab.basket)
    tab.total = stringToFloat(tab.total)
    formattedTabs.push(tab)
  });
  return formattedTabs
}

export const isLastItemInBasket = (index, basketLength) => {
  if (index == basketLength - 1) {
    return hp('1%') + wp('2.5%')
  } else {
    return hp('0%')
  }
}

const stringToBoolean = (string) => {
  if (string === 'true') {
    return true
  } else {
    return false
  }
}

const stringToFloat = (string) => {
  return parseFloat(string)
}

const stringToInteger = (string) => {
  return parseInt(string)
}

const formatBasketForDatabase = (basket) => {
  let basketArray = basket.map( basketItem => Object.entries(basketItem) );
  basketArray = basketArray.map((basketItem) => {
     basketItem = basketItem.map((itemAttributes) => itemAttributes.join(':') )
     return basketItem.join(',')
  })
  basketArray = basketArray.join(';')
  return basketArray;
}
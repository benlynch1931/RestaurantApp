import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LOCALHOST_IP } from '@env'

export const pushToTab = (tabName, tabId, total, basket, tabBasket) => {
  const formattedBasket = `${formatBasketForDatabase(tabBasket)};${formatBasketForDatabase(basket)}`
  
  const body = {
    name: newTabName || currentTabName,
    number: newTabNumber || currentTabNumber,
    total: total,
    basket: formattedBasket,
  }
  fetch(`http://${LOCALHOST_IP}:6030/api/tabs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
}

export const updateExistingTab = (tabName, tabId, total, tabBasket) => {
  const formattedBasket = `${formatBasketForDatabase(tabBasket)}`
  
  const body = {
    name: tabName,
    number: tabId,
    total: total,
    basket: formattedBasket,
  }
  fetch(`http://${LOCALHOST_IP}:6030/api/tabs/${tabId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
    // if (itemsQuantities[itemInfoSplit[0].split(':')[1]] === undefined) {
      itemsQuantities[itemInfoSplit[0].split(':')[1]] = {
          // label: itemInfoSplit[0].split(':')[1],
          // quantity: itemInfoSplit[1].split(':')[1],
          // price: stringToFloat(itemInfoSplit[1].split(':')[1]),
          // displayBar: stringToBoolean(itemInfoSplit[2].split(':')[1]),
          // displayKitchen: stringToBoolean(itemInfoSplit[3].split(':')[1])
          
          [itemInfoSplit[0].split(':')[0]]: convertValue(itemInfoSplit[0].split(':')),
          [itemInfoSplit[1].split(':')[0]]: convertValue(itemInfoSplit[1].split(':')),
          [itemInfoSplit[2].split(':')[0]]: convertValue(itemInfoSplit[2].split(':')),
          [itemInfoSplit[3].split(':')[0]]: convertValue(itemInfoSplit[3].split(':')),
          [itemInfoSplit[4].split(':')[0]]: convertValue(itemInfoSplit[4].split(':'))
        }
    // }
    // itemsQuantities[itemInfoSplit[0].split(':')[1]]['quantity'] += 1
    
    // formattedItems.push(
    //   {
    //     label: itemInfoSplit[0].split(':')[1],
    //     quantity: 1,
    //     price: stringToFloat(itemInfoSplit[1].split(':')[1]),
    //     displayBar: stringToBoolean(itemInfoSplit[2].split(':')[1]),
    //     displayKitchen: stringToBoolean(itemInfoSplit[3].split(':')[1])
    //   }
    // )
    
  });
  // console.log(itemsQuantities)
  const itemsQuantitiesArray = Object.entries(itemsQuantities)
  itemsQuantitiesArray.forEach((item, idx) => {
    formattedItems.push(item[1])
  });
  // {
//    tribute: {
//      label: ,
//      quantity: ,
//    },
//    {
//      label: ,
//      quantity: ,
//    }
// }
  // console.log(formattedItems)
  return formattedItems;
  
  // Next step: store quantities at value > 1
  
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
`addToBasket([...basket, [ale.label, ale.price]])`


TO DO:

- dash, shandy, splash etc.
- allow opt. to change tab number, if done, check orders for original tab no and change to new one automatically
- fetch departments where group_id == props.group_id
- pushing to tab only displays that tab
- click on info button
- rendering display for plu item options (i.e. dash, spl b/current, sandwich filling, bread, sides etc.)
- plu database add 4-5 columns for item options

DRINKS DISPLAY:

- Right sidebar with tabs for paying off

TABS:

- Stored in Database 
  - `id [tab number]{INT}` | `name [tab name]{VARCHAR}` | `total{DECIMAL}` | `item_total{INT}` | `items{VARCHAR}` | `allow_access{BOOLEAN}` | `bill_printed{BOOLEAN}` | `contact_number`
- Only one person can access the same tab at one time
  - Field `allow access` either true or false
- OR can only 'push' onto tab. Everything begins in BASKET.
- Colour for `bill_printed`
- Colour for `total` > £100 etc.
- Can view tab to remove items 
- Can print bill 
- Can pay off tab
- Search tabs by tabName/tabId

- Methods:
  - fetchTabs()
  - renderTabs()
  - getTabForViewing([tabId])
  - deleteTabItem([tabId, tabItemToDelete])
  - payTabOff([tabId])
    - Cash or Card -> Denominations/how drawer is split
    - Integrate payment API to push tab price and info to card machine. When paid, automatically pays off tab.
  
  
  
  
BASKET (Better name?):

- Stored locally
  - { `item name`, `item price`, `quantity`}
- Delete 
  - If quantity > 1, quantity -= 1
  - If quantity = 1, remove object from array
- Push to tab 
  - So can send orders to bar/kitchen without doubling up (tough to separate previous balance with new balance) -> create prev balance?
  - Button at bottom, give drop list of all available tabs AND button to create tab
  
- Methods:
  - PushToTab([tabId])
  - PushToNewTab()
  - DeleteItem([itemToDeletee])
  
  
  
  
  





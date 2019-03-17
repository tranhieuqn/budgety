// GLOBAL APP CONTROLLER
var controller = (function(dataCtrl, UICtrl) {
  var initialValue = {
    INCOME: 0,
    EXPENSES: 0,
    AVAILABEL_BUDGET: 0,
    PERCENTAGE: -1,
  }
  var DOMStrings = UICtrl.getDOMstrings();

  var setupEventListeners = function() {
    // event listener for add item button
    document.querySelector(DOMStrings.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    // event listener for delete item button (use event delegate)
    document.querySelector(DOMStrings.container).addEventListener('click', ctrlDeleteItem);
  }

  // delete item from the data and UI
  var ctrlDeleteItem = function(event) {
    if (!event.target.matches('.ion-ios-close-outline')) {
      return;
    }

    // in case delete button is clicked
    // get item type, item id
    var itemHtmlId, itemType, itemId;
    itemHtmlId = event.target
      .parentNode
      .parentNode
      .parentNode
      .parentNode
      .id;
    itemType = itemHtmlId.split('-')[0].substring(0, 3);
    itemId = parseInt(itemHtmlId.split('-')[1]);
    // delete item from data
    dataCtrl.deleteItem(itemType, itemId);
    // Re-calculate the budget
    dataCtrl.calculateBudget();
    // delete item from UI
    UICtrl.deleteItem(itemType, itemId);
    // Update UI budget
    var publicData = dataCtrl.getPublicData();
    UICtrl.updateBudget(
      publicData.income, publicData.expenses, publicData.availableBudget, publicData.percentage);
    // Update percentage of each item
    var allItems = dataCtrl.getAllItems();
    UIController.updatePercentageForEachItem(allItems['inc'], allItems['exp']);
  }

  // add item to data and display it
  var ctrlAddItem = function() {
    // 1. Get the field input data and validate
    var input = UICtrl.getInput();
    if (input.description === "" || isNaN(input.value) || input.value <= 0) {
      alert('Please input valid information!');
      return;
    }
    // 2. Add item to the data
    var newItem = dataCtrl.addItem(input.type, input.description, input.value);
    // 3. Calculate the budget
    dataCtrl.calculateBudget();
    // 4. Add the item to the UI
    UICtrl.addItem(newItem, input.type);
    // clear input fields
    UICtrl.clearFields();
    // 5. Display the budget on the UI
    var publicData = dataCtrl.getPublicData();
    UICtrl.updateBudget(
      publicData.income, publicData.expenses, publicData.availableBudget, publicData.percentage);
    // 6. Update percentage of each item
    var allItems = dataCtrl.getAllItems();
    UIController.updatePercentageForEachItem(allItems['inc'], allItems['exp']);
  };

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
      UICtrl.updateBudget(initialValue.INCOME,
                          initialValue.EXPENSES,
                          initialValue.AVAILABEL_BUDGET,
                          initialValue.PERCENTAGE);
    }
  };
}(dataController, UIController));

controller.init();

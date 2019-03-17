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

  var ctrlDeleteItem = function(event) {
    if (!event.target.matches(DOMStrings.deleteButton)) {
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
      publicData.income,
      publicData.expenses,
      publicData.availableBudget,
      publicData.totalPercentage);
    // Update percentage of each item
    UIController.updatePercentageForEachItem(publicData.allItemsPercentages.exp,
                                             publicData.allItemsPercentages.inc);
  }

  var ctrlAddItem = function() {
    // get the field input data and validate
    var input = UICtrl.getInput();
    if (input.description === "" || isNaN(input.value) || input.value <= 0) {
      alert('Please input valid information!');
      return;
    }
    // add item to the data
    var newItem = dataCtrl.addItem(input.type, input.description, input.value);
    // calculate the budget
    dataCtrl.calculateBudget();
    // add the item to the UI
    UICtrl.addItem(newItem, input.type);
    // clear input fields
    UICtrl.clearFields();
    // display the budget on the UI
    var publicData = dataCtrl.getPublicData();
    UICtrl.updateBudget(
      publicData.income,
      publicData.expenses,
      publicData.availableBudget,
      publicData.totalPercentage);
    // update percentage of each item
    UIController.updatePercentageForEachItem(publicData.allItemsPercentages.exp,
                                             publicData.allItemsPercentages.inc);
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

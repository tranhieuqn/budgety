// UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    availableBudgetLabel: '.budget__value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    addItem: function(obj, type) {
      // Create HTML string with placeholder text
      var html;
      var itemListDOM;
      if (type === 'inc') {
        itemListDOM = document.querySelector(DOMstrings.incomeContainer);
        html =
        '<div class="item clearfix" id="income-%id%">' +
            '<div class="item__description">%description%</div>' +
            '<div class="right clearfix">' +
              '<div class="item__value">%value%</div>' +
              '<div class="item__percentage">%percentage%</div>' +
              '<div class="item__delete">' +
                  '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
              '</div>' +
          '</div>' +
        '</div>';
      } else if (type === 'exp') {
        itemListDOM = document.querySelector(DOMstrings.expensesContainer);
        html =
        '<div class="item clearfix" id="expense-%id%">' +
            '<div class="item__description">%description%</div>' +
            '<div class="right clearfix">' +
                '<div class="item__value">%value%</div>' +
                '<div class="item__percentage">%percentage%</div>' +
                '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                '</div>' +
            '</div>' +
        '</div>';
      }

      // Replace placeholder text with actual data
      html = html.replace('%description%', obj.description)
             .replace('%value%', obj.value)
             .replace('%id%', obj.id)
             .replace('%percentage%', obj.percentage + '%')

      // Insert the HTML into the DOM
      itemListDOM.insertAdjacentHTML('beforeend', html);
    },
    clearFields: function() {
      var fields;
      var fieldArr;
      // get all fields to clear text (return List)
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      // List -> Array
      fieldArr = Array.prototype.slice.call(fields);
      // forEach array and clear data
      fieldArr.forEach(function(current) {
        current.value = "";
      });
      // forcus to description box
      fields[0].focus();
    },
    getDOMstrings: function() {
      return DOMstrings;
    },
    updateBudget: function(income, expenses, availableBudget , percentage) {
      // update budget
      var incomeField = document.querySelector(DOMstrings.incomeLabel);
      var expensesField = document.querySelector(DOMstrings.expensesLabel);
      var availableBudgetField = document.querySelector(DOMstrings.availableBudgetLabel);
      var percentageField = document.querySelector(DOMstrings.percentageLabel);

      if (income > 0) {
        incomeField.innerHTML = '+ ' + income;
      } else {
        incomeField.innerHTML = income;
      }

      if (expenses > 0) {
        expensesField.innerHTML = '- ' + expenses;
      } else {
        expensesField.innerHTML = expenses;
      }

      if (availableBudget > 0) {
        availableBudgetField.innerHTML = '+ ' + availableBudget;
      } else {
        availableBudgetField.innerHTML = availableBudget;
      }

      if (percentage >= 0) {
        percentageField.innerHTML = percentage + '%';
      } else {
        percentageField.innerHTML = '---';
      }
    },
    updatePercentageForEachItem: function(incomeArr, expenseArr) {
      var childContainPercentValue;
      incomeArr.forEach(function(current) {
        childContainPercentValue = document.querySelector('#income-' + current.id).childNodes[1].childNodes[1];
        childContainPercentValue.replaceChild(document.createTextNode(current.percentage), childContainPercentValue.childNodes[0]);
      });
      expenseArr.forEach(function(current) {
        childContainPercentValue = document.querySelector('#expense-' + current.id).childNodes[1].childNodes[1];
        childContainPercentValue.replaceChild(document.createTextNode(current.percentage), childContainPercentValue.childNodes[0]);
      });
    },
    deleteItem: function(type, id) {
      var item;
      if (type === 'inc') {
        item = document.querySelector('#income-' + id);
      } else if (type === 'exp') {
        item = document.querySelector('#expense-' + id);
      }
      item.remove();
    }
  }
}());

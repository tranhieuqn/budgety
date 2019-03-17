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
    expPercentages: '.exp__percentage',
    incPercentages: '.inc__percentage',
    deleteButton: '.ion-ios-close-outline',
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
              '<div class="inc__percentage">%21%</div>' +
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
                '<div class="exp__percentage">%21%</div>' +
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
    updateBudget: function(income, expenses, availableBudget , totalPercentage) {
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

      if (totalPercentage >= 0) {
        percentageField.innerHTML = totalPercentage + '%';
      } else {
        percentageField.innerHTML = '---';
      }
    },
    updatePercentageForEachItem: function(expPercs, incPercs) {
      var expPercNodes, incPercNodes, updatePercForEachNodeList, replacePerc;
      expPercNodes = document.querySelectorAll(DOMstrings.expPercentages);
      incPercNodes = document.querySelectorAll(DOMstrings.incPercentages);
      updatePercForEachNodeList = function(nodeList, percList, callback) {
          for (var i = 0; i < nodeList.length; i++) {
            callback(nodeList[i], percList[i]);
        }
      }
      replacePerc = function(node, perc) {
        node.innerHTML = perc + '%';
      }
      updatePercForEachNodeList(expPercNodes, expPercs, replacePerc);
      updatePercForEachNodeList(incPercNodes, incPercs, replacePerc);

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

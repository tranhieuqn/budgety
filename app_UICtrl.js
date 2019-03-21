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
    monthField: '.budget__title--month',
  }
  var formatNumber = function(inputNum) {
    if (isNaN(inputNum)) {
      return inputNum;
    }
    var numStr, int, dec, num = '';
    numStr = Math.abs(inputNum).toFixed(2);
    int = numStr.split('.')[0];
    dec = numStr.split('.')[1];
    while (int.length > 3) {
      num += int.substr(0, 3) + ',';
      int = int.substr(3, int.length - 3);
    }
    num += int;
    return ((inputNum >= 0) ? '' : '-') + num + '.' + dec;
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
             .replace('%value%', formatNumber(obj.value))
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

      incomeField.innerHTML = ((income > 0) ? '+ ' : '') + formatNumber(income);
      expensesField.innerHTML = ((expenses > 0) ? '- ' : '') + formatNumber(expenses);
      availableBudgetField.innerHTML = ((availableBudget > 0) ? '+ ' : '') + formatNumber(availableBudget);
      percentageField.innerHTML = (totalPercentage > 0) ? formatNumber(totalPercentage) + '%' : '---';
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
        node.innerHTML = !isNaN(perc) ? formatNumber(perc) + '%' : perc;
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
    },
    displayMonth: function() {
      var now, month, months, year;
      now = new Date();
      month = now.getMonth();
      year = now.getFullYear();
      months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      document.querySelector(DOMstrings.monthField).innerHTML = months[month] + ' ' + year;
    },
    changeInputBorderColor: function() {
      var fieldList = document.querySelectorAll(DOMstrings.inputType + ','
                                             + DOMstrings.inputDescription + ','
                                             + DOMstrings.inputValue);
      var forEachNodeList = function(nodeList, callback) {
        for (var i = 0; i < nodeList.length; i++) {
          callback(nodeList[i]);
        }
      };
      forEachNodeList(fieldList, function(current) {
        current.classList.toggle('red-focus');
      });

      var addBtn = document.querySelector(DOMstrings.inputBtn);
      addBtn.classList.toggle('red');
    }
  }
}());

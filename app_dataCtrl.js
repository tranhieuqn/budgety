// DATA CONTROLLER
var dataController = (function() {
  var Expense = function(id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = percentage;
  }
  Expense.prototype.calcPercentage = function(totalInc) {
    this.percentage = ((this.value / totalInc) * 100).toFixed(2);
  }

  var Income = function(id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = percentage;
  }
  Income.prototype.calcPercentage = function(totalInc) {
    this.percentage = ((this.value / totalInc) * 100).toFixed(2);
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    availableBudget: 0,
    totalPercentage: 0,
    allItemsPercentages: {
      exp: [],
      inc: []
    }
  };

  return {
    addItem: function(type, description, value) {
      var newItem;
      // get increment of last ID of current array
      var id;
      if (data.allItems[type].length === 0) {
        id = 0;
      } else {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }
      // create new item
      if (type === 'inc') {
        newItem = new Income(id, description, value, 0);
      } else if (type == 'exp') {
        newItem = new Expense(id, description, value, 0);
      }
      // push new item to current array (use [] to access object value)
      data.allItems[type].push(newItem);
      // re-calculate total value
      data.totals[type] = data.totals[type] + newItem.value;

      return newItem;
    },
    deleteItem: function(type, id) {
      var ids, index;
      if (type !== 'inc' && type !== 'exp') {
        return;
      }
      if (isNaN(id) || id < 0) {
        return;
      }
      // get index of delete item
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      // delete item
      if (index !== -1) {
        data.totals[type] = data.totals[type] - data.allItems[type][index].value;
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function() {
      // calculate display budget value
      data.availableBudget = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.totalPercentage = ((data.totals.exp / data.totals.inc) * 100).toFixed(2);
      } else {
        data.totalPercentage = -1;
      }
      // calculate percentage for each item
      data.allItems.inc.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
      data.allItemsPercentages.exp = data.allItems.exp.map(function(cur) {
        return cur.percentage;
      })
      data.allItemsPercentages.inc = data.allItems.inc.map(function(cur) {
        return cur.percentage;
      })
    },
    getPublicData: function() {
      return {
        income: data.totals.inc,
        expenses: data.totals.exp,
        availableBudget: data.availableBudget,
        totalPercentage: data.totalPercentage,
        allItemsPercentages: data.allItemsPercentages,
      }
    },
    getInternalData: function() {
      console.log(data);
    },
  }

}());

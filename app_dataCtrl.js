// DATA CONTROLLER
var dataController = (function() {
  var Expense = function(id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = percentage;
  }

  var Income = function(id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = percentage;
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
    percentage: 0,
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
    calculateBudget: function() {
      // calculate display budget value
      data.availableBudget = data.totals['inc'] - data.totals['exp'];
      if (data.totals['inc'] > 0) {
        data.percentage = ((data.totals['exp'] / data.totals['inc']) * 100).toFixed(2);
      } else {
        data.percentage = -1;
      }
      // calculate percentage for each item
      data.allItems['inc'].forEach(function(current) {
        current.percentage = ((current.value / data.totals['inc']) * 100).toFixed(2);
      });
      data.allItems['exp'].forEach(function(current) {
        current.percentage = ((current.value / data.totals['inc']) * 100).toFixed(2);
      });
    },
    deleteItem: function(type, id) {
      var ids, index;
      if (type !== 'inc' && type !== 'exp') {
        return;
      }
      if (isNaN(id) || id < 0) {
        return;
      }
      // data.allItems[type].forEach(function(item, ind) {
      //   if (item.id === id) {
      //     data.totals[type] = data.totals[type] - data.allItems[type][ind].value;
      //     data.allItems[type].splice(ind, 1);
      //   }
      // });-
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.totals[type] = data.totals[type] - data.allItems[type][index].value;
        data.allItems[type].splice(index, 1);
      }
      // coding in this way is more clearly
    },
    getPublicData: function() {
      return {
        income: data.totals['inc'],
        expenses: data.totals['exp'],
        availableBudget: data.availableBudget,
        percentage: data.percentage,
      }
    },
    getAllItems: function() {
      return data.allItems;
    },
    getInternalData: function() {
      console.log(data);
    },
  }

}());

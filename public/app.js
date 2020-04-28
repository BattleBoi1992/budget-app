// BUDGET CONTROLLER MODULE
var budgetController = (function() {
   
    var Expense = function(id, description, value) {
        this.id = id; 
        this.description = description;
        this.value = value;
    }; 

    var Income = function(id, description, value) {
        this.id = id; 
        this.description = description; 
        this.value = value;
    };

    var data = {
        allTransactions: {
            exp: [], 
            inc: []
        }, 
        totals: {
            exp: 0, 
            inc: 0
        }
    };

    return {
        addTransaction: function(type, des, val) {
            var newTransaction, ID;

            // Create new ID
            if (data.allTransactions[type].length > 0) {
                ID = data.allTransactions[type][data.allTransactions[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new transaction based on inc or exp type
            if (type === 'exp') {
                newTransaction = new Expense(ID, des, val)
            } else {
                newTransaction = new Income(ID, des, val)
            }

            // Push it into the data structure
            data.allTransactions[type].push(newTransaction);

            // Return new element
            return newTransaction;
        }
    };

})();

// UI CONTROLLER MODULE
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type', 
        inputDescription: '.add__description',
        inputValue: '.add__value', 
        inputBtn: '.add__btn', 
        incomeContainer: '.income__list', 
        expenseContainer: '.expenses__list'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        }, 

        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">%Value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%Description%</div><div class="right clearfix"><div class="item__value">%Value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%Description%', obj.description);
            newHtml = newHtml.replace('%Value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

// GLOBAL APP CONTROLLER MODULE
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        // ADD BUTTON EVENT LISTENER
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 

        // ENTER KEY EVENT LISTENER
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }        
        });
    };

    var ctrlAddItem = function() {
        var input, newTransaction;

        // 1. Get the field input date
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newTransaction = budgetCtrl.addTransaction(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newTransaction, input.type);

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    return {
        init: function() {
            console.log('Application initialization successful.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();
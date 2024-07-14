var Calculator = function (news) {
	/* Import News. */
	var key;
	this.settings = {};
	for (key in news) {
		this.settings[key] = news[key];
	}

	/* Init Function. */
	this.init = function () {
		/* Build calculator. */
		this.render();
		/* Setup click events. */
		this.listeners();
		/* Defualt variables. */
		this.settings.memory = "";
		this.settings.vmemory = "";
	};

	/* Key Mappings. */
	this.keymap = {
		"display": [],
		"mainboard": [
			{
				"name": "7",
				"value": "7",
				"width": "3"
			},
			{
				"name": "8",
				"value": "8",
				"width": "3"
			},
			{
				"name": "9",
				"value": "9",
				"width": "3"
			},
			{
				"name": "4",
				"value": "4",
				"width": "3"
			},
			{
				"name": "5",
				"value": "5",
				"width": "3"
			},
			{
				"name": "6",
				"value": "6",
				"width": "3"
			},
			{
				"name": "1",
				"value": "1",
				"width": "3"
			},
			{
				"name": "2",
				"value": "2",
				"width": "3"
			},
			{
				"name": "3",
				"value": "3",
				"width": "3"
			},
			{
				"name": "Del",
				"value": "del",
				"width": "3"
			},
			{
				"name": "0",
				"value": "0",
				"width": "3"
			},
			{
				"name": "=",
				"value": "equals",
				"width": "3"
			}
		],
		"functions": [
			{
				"name": "+",
				"value": "+",
				"width": "2"
			},
			{
				"name": "-",
				"value": "-",
				"width": "2"
			},
			{
				"name": "&divide;",
				"value": "/",
				"width": "2"
			},
			{
				"name": "&times;",
				"value": "*",
				"width": "2"
			},
			{
				"name": "(",
				"value": "(",
				"width": "2"
			},
			{
				"name": ")",
				"value": ")",
				"width": "2"
			},
			{
				"name": ".",
				"value": ".",
				"width": "2"
			},
		]
	};

	/* Render the calculator UI. */
	this.render = function () {
		/* Add the class to the main container. */
		if ( this.settings.hasOwnProperty("div") ) this.settings["div"].classList.add("calculator");
		/* Create and append the UI structure divs. */
		var sclass, node;
		for (sclass in this.keymap) {
			node = document.createElement("div");
			node.classList.add(sclass);
			this.settings[sclass] = node;
			this.settings["div"].appendChild(this.settings[sclass]);
		}
		/* Create and append the UI buttons. */
		var snode;
		for ( snode in this.keymap ) {
			if ( this.keymap[snode].length > 0 ) {
				var i = 0;
				for (i; i < this.keymap[snode].length; i++) {
					var node;
					node = document.createElement("span");
					node.classList.add("button");
					node.setAttribute("data-func", this.keymap[snode][i]["value"]);
					node.classList.add("w-"+ this.keymap[snode][i]["width"]);
					node.innerHTML = this.keymap[snode][i]["name"];
					this.settings[snode].appendChild(node);
				}
			}
		}
	};

	/* Display updater */
	this.updateDisplay = function (content) {
		if (content) {
			this.settings.display.innerHTML = content;
		} else {
			this.settings.display.innerHTML = this.settings.vmemory;
		}
	};

	/* Event listeners. */
	this.listeners = function () {
		var i = 0, calculator = this, buttons = document.getElementsByClassName("button");
		for (i; i < buttons.length; i++) {
			buttons[i].addEventListener("click", function (event) {
				calculator.trigger( this.getAttribute("data-func"), this.innerHTML );
			});
		}
	};

	/* Trigger function to route commands. */
	this.trigger = function (func, act) {
		if ( func == "equals" ) {
			/* Read memory and calculate the result. */
			if ( this.settings.memory != '' && this.settings.memory != undefined ) {
				/* Something entered, try calc. */
				try {
					var result = eval( this.settings.memory );
					this.settings.memory = result;
					this.settings.vmemory = result;
					this.updateDisplay();
				} catch (e) {
					/* Invalid. */
					this.updateDisplay("<p style='color:#ff5c5c;text-align:center;'>Syntax Error</p>");
					setTimeout(function(calc, vmem){
						calc.updateDisplay(vmem);
					}, 750, this, this.settings.vmemory)
				}
			} else {
				/* Nothing entered. */
				this.updateDisplay("...");
			}
		} else if ( func == "del" ) {
			/* Back space once in memory. */
			if ( this.settings.memory != '' && this.settings.memory != undefined ) {
				if ( this.settings.memory != this.settings.display.innerHTML ) {
					/* If deleting the calculated number. */
					this.settings.memory = "";
					this.settings.vmemory = "";
				} else {
					/* Deleting a part of a entered formular... */
					this.settings.memory = this.settings.memory.toString().slice(0, this.settings.memory.length - 1);
					this.settings.vmemory = this.settings.vmemory.toString().slice(0, this.settings.vmemory.length - 1);
				}
			} else {
				/* Just do nothing (or reset the memory strings). */
				this.settings.memory = "";
				this.settings.vmemory = "";
			}
			/* Always update the  */
			this.updateDisplay();
		} else {
			/* Add to memory. */
			this.settings.memory += func;
			this.settings.vmemory += act;
			this.updateDisplay();
		}
	};

	/* Start app, called after all functions are declared. */
	this.init();
};

var calculator = new Calculator({
	"div": document.getElementById("calculator"),
});

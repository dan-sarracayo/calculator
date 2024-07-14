(function(){

	window.createNode = function(type) {

		return document.createElement(type);

	},
	window.addClass = function(node, className) {

		node.classList.add(className);
		return node;

	},
	window.removeClass = function(node, className) {

		node.classList.remove(className);
		return node;

	},
	window.append = function(child, parent) {

		parent.appendChild(child);

	},
	window.setHtml = function(node, html) {

		node.innerHTML = html;
		return node;

	};
	window.el = function(selector) {
		/* Return array if no selector. */
		if (!selector) return [];
		/* Selector provided, check what is requested. */
		var pre = selector.slice(0, 1),
			rest = selector.slice(1, selector.length);
		/* ID */
		if (pre == "#") return document.getElementById(rest);
		/* Class */
		else if (pre == ".") return document.getElementsByClassName(rest);
		/* Name attr */
		else if (pre == "n" && (selector.slice(0, 6) == "name='" || selector.slice(0, 6) == 'name="')) return document.getElementsByName(selector.slice(6, selector.length - 1));
		/* Tag */
		return document.getElementsByTagName(rest);
	};

})();

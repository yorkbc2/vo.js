
var WHITE_SPACES = /[\ ]/g;

var CLICK_STRING = "click", INPUT_STRING = "input", CHANGE_STRING = "change";


var vo = function (selector) {
	return DOMControllerVO.create(selector)
}

var Helper = {

	type: function (obj) {
		return typeof obj;
	},

	error: function (message) {
		throw new Error("[vo error] :: " + message);
	},
	count: function (array) {
		return array.length;
	}
}





var DOMControllerVO = {

	create: function(selector) {

		var DOMElement = this.getAll(selector);

		if(Helper.count(DOMElement) > 1) {
			var DOMElements = [];

			for(var key = 0 ; key < Helper.count(DOMElement); key++) {

				var SingleElement = DOMElement[key];

				SingleElement.__proto__ = Object.assign({}, this.protos, SingleElement.__proto__);

				DOMElements.push(SingleElement);

			}

			this.element = DOMElements;

			return DOMElements;

		}
		else {

			var SingleElement = DOMElement[0];

			var VOProto =  Object.assign(SingleElement.__proto__, this.protos );

			SingleElement.__proto__ = VOProto

			this.element = SingleElement;

			return SingleElement;

		}

	},

	getAll: function(selector) {
		return document.querySelectorAll(selector)
	},

	proto: function() {

	},

	protos: {},

	methods: function() {
		return this.protos;
	},

	addMethod: function(method) {
		var type = Helper.type(method);

		if(type !== 'function') {
			return Helper.error("Method must be a function");
		}

		if(!method.name) {
			return Helper.error("Method must have name");
		}

		this.protos[method.name.toString()] = method;
		this[method.name.toString()] = method;


		return this;

	},

	addMethods: function(array) {

		for(var key = 0 ; key < Helper.count(array) ; key++) {

			this.addMethod(array[key]);

		}

		return this;

	}

}

DOMControllerVO.addMethods([
	function html(htmlString) {
		if(htmlString !== undefined) {
			this.innerHTML = htmlString;

			return this;
		}
		else {
			return this.innerHTML;
		}
	},

	function val(value) {
		if(value !== undefined) {
			this.value = value;

			return this;
		}
		else {
			return this.value;
		}
	},

	function upper() {

		var _html = this.html().toUpperCase();

		this.html(_html);

		return this;

	},

	function lower() {
		var _html = this.html().toLowerCase();

		this.html(_html);

		return this;
	},

	function replace(reg, string) {

		var _html = this.html();

		_html = _html.replace(reg, string);

		this.html(_html);

		return this;


	}

])

var VO = {
	dom: DOMControllerVO
}


VO.dom.addMethods([
	function css (selector, value){
		var reg = /[/-]\w{1}/g;

		selector = selector.replace(reg, function (value) {
			var letter = value.slice(1)
			return letter.toUpperCase()
		})
		
		this.style[selector] = value;

	},

	function addClass(className, timeout) {
		className = className.replace(WHITE_SPACES, ",").split(',');

		var self = this;

		if(Helper.count(className) > 1) {
			if(timeout !== undefined) {
					setTimeout(function () {
						for(var key = 0 ; key < Helper.count(className) ; key++) {
							self.classList.add(className[key])
						}
					}, timeout)
				}
				else {
					for(var key = 0 ; key < Helper.count(className) ; key++) {
							self.classList.add(className[key])
						}
				}
			
		}

		else {
			if(timeout !== undefined) {
				setTimeout(function () {
					self.classList.add(className)
				}, timeout)
			}
			else {
				this.classList.add(className)
			}
		}

		

		return this;
	},


	function rmClass(className, timeout) {
		className = className.replace(WHITE_SPACES, ",").split(',');

		var self = this;

		if(Helper.count(className) > 1) {
			if(timeout !== undefined) {
					setTimeout(function () {
						for(var key = 0 ; key < Helper.count(className) ; key++) {
							self.classList.remove(className[key])
						}
					}, timeout)
				}
				else {
					for(var key = 0 ; key < Helper.count(className) ; key++) {
							self.classList.remove(className[key])
						}
				}
			
		}

		else {
			if(timeout !== undefined) {
				setTimeout(function () {
					self.classList.remove(className)
				}, timeout)
			}
			else {
				this.classList.remove(className)
			}
		}

		

		return this;
	}
])

VO.__proto__.get = function (url, sync) {
	if(async !== undefined) {
		sync = async;
	}
	else {
		sync = false;
	}
	return new Promise(function (resolve, reject) {

		var xhr = new new XMLHttpRequest();

		xhr.open("GET", url, sync);

		xhr.onload = function () {

			if(this.status >= 200 && this.status < 300) {
				resolve(xhr.response)
			}
			else {
				reject({
					status: this.status,
					statusData: xhr.statusText
				})
			}

		}

		xhr.send()


	});
}


VO.dom.addMethods([
	function click(event) {

		var self = this;

		this.addEventListener(CLICK_STRING, function (e) {

			event(e, self)

		})

		return this;

	},

	function event(name, handler) {

		var self = this;

		this.addEventListener(name, function (ev) {
			handler(ev, self);
		})

		return this;

	},

	function rmEvent(name) {

		this.removeEventListener(name)

		return this;
	},

	// TODO
	function hover() {},

	function input(event) {
		var self = this;

		this.addEventListener(INPUT_STRING, function (e) {

			event(e, self)

		})

		return this;
	},

	function change(event) {
		var self = this;

		this.addEventListener(CHANGE_STRING, function (e) {

			event(e, self)

		})

		return this;
	},

	function dblclick(event) {
		var self = this;
		
		this.addEventListener('dblclick', function (e) {
			event(e, self);
		})
		
		return this;
	}


])

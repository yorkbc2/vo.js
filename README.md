# VO - progressive, light, easy to learn

VO it's progressive javascript library for creating plugins and controlling DOM. If you want to change jQuery on something new, VO is your choice. 

## VO Syntax

VO syntax is so easy for developers, who have alredy worked with jQuery. For the others developers is easy too, but you need better learning. 

## VO Methods list

### vo( selector )

The main function of all project. With this function, you can get DOM element from your DOM tree and start control this. 
Just try this code

``` html

<div id="root">
	My Code here
</div>

```
``` javascript

var rootElement = vo("#root");


```

And it's all. The block with id "root" in variable "rootElement"; You can start controll this by methods

### vo().html( [ string ]);

The string is unrequired argument for HTML method. This method does :

* If argument is undefined, it just return html code in your block
* If argument is string, it change html code in your block on text in argument.

It's so easy, just try

``` javascript

vo("#root").html("<b>It works!</b>")

console.log(vo("#root").html())

// <b>It works!</b>

```
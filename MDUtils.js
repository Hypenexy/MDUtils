/*MDUtils.js
Version: 1.0.0 Dev
Author: Hypenexy
License: https://github.com/Hypenexy/MDUtils/blob/main/LICENSE
*/

/**
 * Variables
 */
 
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Load scripts dynamically.
 * @param {*} url The url of the file
 * @param {*} id The id of the loaded script in the dom
 * @param {*} onload A function to call after it's finished loading
 */
 function loadScript(url, id, onload) {
    var script = document.createElement("script")
    if(id){
        script.id = id
    }
    script.src = url
    document.body.appendChild(script)

    if(onload){
        script.onload = function(){
            onload()
        }
    }
}

/**
 * Sets an event of an element.
 * @param {*} element Any element
 * @param {*} action A function
 * @param {*} param A parameter to call the function with
 */
function ButtonEvent(element, action, param){
    element.tabIndex = 0
    element.onclick = function(){
        action(param)
    }
    element.onkeydown = function(e){
        if(e.key == "Enter" || e.key == " "){
            e.preventDefault()
            action(param)
        }
    }
}

/**
 * Warning: WIP Function do not use in production builds. 
 * Sets an event of an element with styling.
 * By default it uses one of my styles for buttons. 
 * @param {*} element Any element
 * @param {*} action A function
 * @param {*} hoverstyle CSS to use on mouse over element
 * @param {*} clickstyle CSS to use momentarily when clicking on the element
 */
function ButtonEventStyled(element, action, hoverstyle, clickstyle){
    var mouseover = false
    element.onmouseenter = function(){
        mouseover = true
        if(hoverstyle){
            element.style = hoverstyle
        }
        else{
            element.style.color = "#fff"
            element.style.boxShadow = "0 2px 0 #222"
            element.style.transform = "translateY(-2px)"
        }
    }
    element.onmouseleave = function(){
        mouseover = false
        if(hoverstyle){
            //element.style =
            //how do I remove the hover style :/
            //I can't save element.style (not easily) 
        }
        else{
            element.style.color = "#ddd"
            element.style.removeProperty("box-shadow")
            element.style.removeProperty("transform")
        }
    }
    function elementaction(){
        action()
        if(clickstyle){
            element.style = clickstyle
        }
        else{
            element.style.color = "#444"
            element.style.background = "#999"
            var lastStyle1 = element.style.boxShadow
            var lastStyle2 = element.style.transform
            element.style.removeProperty("box-shadow")
            element.style.removeProperty("transform")
        }
        setTimeout(() => {
            if(clickstyle){
                //element.style = \
                //again.. how do I remove it??
            }
            else{
                if(mouseover==true){
                    element.style.boxShadow = lastStyle1
                    element.style.transform = lastStyle2
                }
                element.style.color = "#ddd"
                element.style.background = "#444"
            }
        }, 200);
    }
    ButtonEvent(element, elementaction)
}

/**
 * Get's an element's offset.
 * @param {*} el Any element
 * @returns An array of the top and left pixels offset of the element.
 */
function getOffset(el){
    var _x = 0
    var _y = 0
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft
        _y += el.offsetTop - el.scrollTop
        el = el.offsetParent
    }
    return { top: _y, left: _x }
}

/**
 * Used to get a specific css property's value.
 * @param {*} el Any element
 * @param {*} styleProp Any computed css property
 * @returns The value of the param styleProp.
 */
function getStyle(el, styleProp){
    if (window.getComputedStyle)
    {
        var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp) 
    }
    else if (el.currentStyle){
        var y = el.currentStyle[styleProp]
    }
    return y
}

/**
 * Warning: WIP Function do not use in production builds. 
 * Blurs behind element.
 * Requires getOffset() & getStyle()
 * @param {*} element Any element
 * @param {*} amount The amount of blur in px
 * @returns Function to remove itself
 */
function BlurElement(element, amount){
    function close(){
        blur.remove()
    }

    var offset = getOffset(element)
    var zIndex = getStyle(element, "z-index")
    var borderRadius = getStyle(element, "border-radius")
    var transform = getStyle(element, "transform")
    var width = getStyle(element, "width")
    var height = getStyle(element, "height")

    var blur = document.createElement("mdblur")
    blur.style.display = "block"
    blur.style.position = "absolute"
    blur.style.top = offset.top + "px"
    blur.style.left = offset.left + "px"
    blur.style.transform = transform
    blur.style.zIndex = zIndex-1//change to - after debugging TODO: add blur bro
    blur.style.width = width
    blur.style.height = height
    blur.style.backdropFilter = "blur("+amount+"px)"
    blur.style.borderRadius = borderRadius

    document.getElementsByTagName("body")[0].appendChild(blur)
    return close;

    // window.onresize = function(){ replicate this!

    // }
}

/**
 * Returns a random number between 2 numbers.
 * @param {*} min Minimum number
 * @param {*} max Maximum number
 * @returns A random number between the 2 parameters.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * Shuffles arrays
 * @param {*} array Any array
 * @returns Shuffled parameter array
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

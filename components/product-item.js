// product-item.js

var shadowRoot;

var counter = 0;
class ProductItem extends HTMLElement {
  
  constructor() {

    // enact super constructor
    super();

    //css 
    const templateInnerHTML = `
    <style>
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    </style>
    <li class="product">
                      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
                      <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
                      <p class="price">$109.95</p>
                      <button onclick="alert('Added to Cart!')">Add to Cart</button>
    </li>`;

    // create shadowDOM
    shadowRoot = this.attachShadow({ mode: 'open' });
    // set shadow html to the css and html template
    shadowRoot.innerHTML = templateInnerHTML;
  }

  // make attributes adjustable (src, alt, and two p's)
  changeContent(srcStr, altStr, pStr1, pStr2, loadedItems) {
    // get most recent button
    let elem = shadowRoot.lastChild;

    // update content w/ read in values
    elem.getElementsByTagName('img')[0].setAttribute('src', srcStr);
    elem.getElementsByTagName('img')[0].setAttribute('alt', altStr);
    elem.getElementsByClassName('title')[0].innerHTML = pStr1;
    elem.getElementsByClassName('price')[0].innerHTML = '$' + pStr2;

    // add event listener
    elem.getElementsByTagName('button')[0].onclick = buttonPressed;

    // add id attribute to more easily track
    elem.getElementsByTagName('button')[0].setAttribute('id', counter);

    // if loadedItems was read in and this item's id matches one in the array,
    if(loadedItems != null && loadedItems.indexOf(counter.toString()) != -1) {
      // simulate a click
      elem.getElementsByTagName('button')[0].click();
    }

    // increment counter
    counter = counter + 1;
  }

}

//define new element to enact ctor
customElements.define('product-item', ProductItem);
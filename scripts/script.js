// Script.js

// id of items that are stored
var loadedItems;

// on site load
window.addEventListener('DOMContentLoaded', () => {
  
  // check for stored items and load them in
  loadedItems = JSON.parse(localStorage.getItem('storedItems'));

  // can't be null reference
  if(loadedItems == null) {
    loadedItems = [];
  }

    // fetch array from site
    fetch('https://fakestoreapi.com/products')
    // wait for response
    .then(response => response.json())
    // then load in all the data
    .then(data => {

      // returns null if no key exists -- checks if first load
      if(localStorage.getItem('fetchedArray') === null) {
        console.log(data);
        // store in local storage as string
        localStorage.setItem('fetchedArray', JSON.stringify(data));
      }
    
        // generating cards
        let i;

        // container and child
        let container = document.getElementById('product-list');
        let child;
      
        // entire array
        let items;

        // 20 items
        for( i = 0; i < 20; i++) {

        // read in from localStorage
        items = JSON.parse(localStorage.getItem('fetchedArray'));

        // each element
        source = items[i].image;
        alt = items[i].title;
        p2 = items[i].price;
        
        //make new product element
        child = document.createElement('product-item');

        //change content
        child.changeContent(source, alt, alt, p2, loadedItems);

        // append
        container.appendChild(child);
        }
    });
});

//button click functionality
function buttonPressed() {

  // get number from span
  let number = parseInt(document.getElementById('cart-count').innerHTML);
  
  // get inner html of button that you called from
  let text = this.innerHTML;

  // swap button to "Add to" or "Remove from"
  if(text == "Add to Cart") {
    // increment number
    number = number + 1;
    text = "Remove from Cart";
  
    // set new values
    document.getElementById('cart-count').innerHTML = number;
    this.innerHTML = text;

    // store item
    // dont allow duplicates
    if(loadedItems.indexOf(this.id) == -1) {
      loadedItems.push(this.id);
    }

    // update local storage
    localStorage.setItem('storedItems', JSON.stringify(loadedItems));

  } else {
    // decrement number
    number = number - 1;
    text = "Add to Cart";

    // set new values
    document.getElementById('cart-count').innerHTML = number;
    this.innerHTML = text;

    // remove item from stored list
    let index = loadedItems.indexOf(this.id);
    loadedItems.splice(index, 1);

    // update local storage
    localStorage.setItem('storedItems', JSON.stringify(loadedItems));
  }
}
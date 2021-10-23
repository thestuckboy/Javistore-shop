/* 

This is an array with many objects 
that will be rendered after pages loads

*/

const productList = [
    {
        productType: 'Top',
        productImage: 'media/Item_1.jpg',
        productName: 'Sueter tricolor',
        productPrice: '99.99$'
    },
    {
        productType: 'Top',
        productImage: 'media/Item_2.jpg',
        productName: 'Sueter tricolor 2',
        productPrice: '99.99$'
    },
    {
        productType: 'Top',
        productImage: 'media/Item_3.jpg',
        productName: 'Camiseta "Heat Miami"',
        productPrice: '99.99$'
    },
    {
        productType: 'Top',
        productImage: 'media/Item_4.jpg',
        productName: 'Playera "Shallow"',
        productPrice: '99.99$'
    },
    {
        productType: 'Top',
        productImage: 'media/Item_5.jpg',
        productName: 'Playera Golden Black',
        productPrice: '99.99$'
    },
    {
        productType: 'Shoe',
        productImage: 'media/Item_6.jpg',
        productName: 'Zapatos Louis Vuitton',
        productPrice: '99.99$'
    }
]

/* -------------------------------------------------------------------------- */
/*                           Reusable Functions                           */
/* -------------------------------------------------------------------------- */

function createProductsFragmentBasedOn(array){

    const fragment = document.createDocumentFragment();

    for (let item of array) {
        
        /* 

            For each element inside productList Array
            we create the product following this template:

            <div class="product__item">
                <div class="item__image">
                    <img src="media/name_of_image.jpg" alt="product alt">
                </div>
                <h2 class="item__title">Title</h2>
                <p class="item__price">99.99$</p>
            </div>

        */

        /*  product__item  */
        const productItem = document.createElement('DIV');
        productItem.classList.add('product__item');

        /*  item__image  */
        const itemImage = document.createElement('DIV');
        itemImage.classList.add('item__image');

        /* image inside item__image  */
        const image = document.createElement('IMG');
        image.setAttribute('src', `${item.productImage}`);

        /*  item__title  */
        const itemTitle = document.createElement('H2');
        itemTitle.classList.add('item__title');
        itemTitle.innerText = `${item.productName}`;


        const itemPrice = document.createElement('P');
        itemPrice.classList.add('item__price');
        itemPrice.innerText = `${item.productPrice}`;


        itemImage.appendChild(image);
        productItem.appendChild(itemImage);
        productItem.appendChild(itemTitle);
        productItem.appendChild(itemPrice);
        fragment.appendChild(productItem);
    }

    /* 

    At this point fragment contains all the products,
    so now we return the fragment

    */


    return fragment;
}

/* -------------------------------------------------------------------------- */
/*                               Main Functions                               */
/* -------------------------------------------------------------------------- */

function addItems() {

    /*First we grab the container where the products will be located:*/
    const productContainer = document.querySelector('.product__container');

    /* Then we create a HTML fragment which contains all products from the productList array */

    let items = createProductsFragmentBasedOn(productList);

    /* Now we append the fragment to the container */

    productContainer.appendChild(items);
}

addItems();

/* Observe Product Items */

function ObserveProductItems() {
    const productItems = document.querySelectorAll('.product__item');

    const verifyVisibility = (entries) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                entry.target.style.background = 'rgb(0,0,0)';
                entry.target.style.color = 'white';
            } else {
                entry.target.style.background = 'white';
                entry.target.style.color = 'rgb(0,0,0)';
            }
        }
    }

    const observer = new IntersectionObserver(verifyVisibility, { rootMargin: "-400px" });

    for (let item of productItems) {
        observer.observe(item);
    }
}

ObserveProductItems();

/* Header animation */

function headerAnimation() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            document.querySelector('.container__navigation').classList.remove('hidden');
        } else {
            document.querySelector('.container__navigation').classList.add('hidden');
        }
    });
}

headerAnimation();

/* Observe sections */

function ObserveSections() {
    let container = document.querySelector('.container__presentation')
    container.navCompanionElement = document.getElementById('Home');

    let products = document.querySelector('.container__products')
    products.navCompanionElement = document.getElementById('Products');

    let about = document.querySelector('.container__about');
    about.navCompanionElement = document.getElementById('AboutUs')

    let sections = [container, products, about];

    const observer = new IntersectionObserver((entries) => {
        for (let entry of entries){
            if (entry.isIntersecting){
                entry.target.navCompanionElement.classList.add('active');
            }else{
                entry.target.navCompanionElement.classList.remove('active');
            }
        }
    }, {rootMargin: '0px 0px 50% 0px', threshold: 0.4});

    for (let section of sections) {
        observer.observe(section);
    }
}

ObserveSections();

function reRenderProducts(type){
    if (type == null){
        const productContainer = document.querySelector('.product__container');
        const items = createProductsFragmentBasedOn(productList);
        productContainer.innerHTML = '';
        productContainer.appendChild(items);
        return;
    }

    const result = productList.filter(item => item.productType == type);

    const productContainer = document.querySelector('.product__container');
    productContainer.innerHTML = '';
    const items = createProductsFragmentBasedOn(result);

    productContainer.appendChild(items);

    if (productContainer.innerHTML == ''){
        productContainer.innerText = 'Ningún producto por ahora :(';
    };
}

let SlideOn = true;

function slideShowFunctionality(){
    let slideElement2 = document.querySelectorAll('.slideshow__element')[1];
    setTimeout(()=>{
        if (SlideOn){
            slideElement2.style.animation = "pop-leave 1s forwards";
            SlideOn = false;
            slideShowFunctionality()
        } else {
            slideElement2.style.animation = "pop-come 1s forwards";
            SlideOn = true;
            slideShowFunctionality()
        }
    }, 5000)
}

slideShowFunctionality();
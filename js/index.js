/* 

This is an array with many objects 
that will be rendered after pages loads

*/

const productList = [
    {
        productId: 1,
        productImage: 'media/Item_1.jpg',
        productName: 'Sueter tricolor',
        productPrice: '99.99$'
    },
    {
        productId: 2,
        productImage: 'media/Item_2.jpg',
        productName: 'Sueter tricolor 2',
        productPrice: '99.99$'
    },
    {
        productId: 3,
        productImage: 'media/Item_3.jpg',
        productName: 'Camiseta "Heat Miami"',
        productPrice: '99.99$'
    },
    {
        productId: 4,
        productImage: 'media/Item_4.jpg',
        productName: 'Playera "Shallow"',
        productPrice: '99.99$'
    },
    {
        productId: 5,
        productImage: 'media/Item_5.jpg',
        productName: 'Playera Golden Black',
        productPrice: '99.99$'
    },
    {
        productId: 6,
        productImage: 'media/Item_6.jpg',
        productName: 'Zapatos Louis Vuitton',
        productPrice: '99.99$'
    }
]

/* 

This function adds the products taking as 
reference the productList array which contains
all the products data

*/

function addItems() {

    /*First we grab the container where the products will be located:*/
    const productContainer = document.querySelector('.product__container');

    /*Then we create a fragment to optimize the code*/
    const fragment = document.createDocumentFragment();

    /* 

    Then, for each element inside productList Array
    we create the product following this template:

    <div class="product__item">
        <div class="item__image">
            <img src="media/name_of_image.jpg" alt="product alt">
        </div>
        <h2 class="item__title">Title</h2>
        <p class="item__price">99.99$</p>
    </div>

    */
    for (let item of productList) {

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

        /*  item__price  */
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
    so now we append it to the container

    */

    productContainer.appendChild(fragment);
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

    let sections = [container, products];

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

ObserveSections()
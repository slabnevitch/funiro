(function() {

	// ibg class
		if('objectFit' in document.documentElement.style === false){
		  Array.prototype.forEach.call(document.querySelectorAll('._fit'), function(el){

		    var image = el.querySelector('img');
		    el.style.backgroundImage = 'url("'+image.src+'")';
		    el.classList.add('ibg');
		    el.classList.remove('_fit');
 		 });
		}
	// End ibg class

	// .webp browser support detection
		function testWebP(callback) {
			var webP = new Image(); 
			webP.onload = webP.onerror = function () {
			 callback(webP.height == 2); 
			}; 
			webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		}

		testWebP(function (support) {
			if (support == true) {
			 document.querySelector('body').classList.add('webp'); 
			}else{ 
				document.querySelector('body').classList.add('no-webp'); 
			}
		});
	
	// END .webp browser support detection

	var accordionLists = document.querySelectorAll('.accordion');
	[].forEach.call(accordionLists , function(item){
		new Accordion(item, 500, 767.98);
	});

})();

window.addEventListener('load', function() { 
	document.addEventListener('click', docClick);
	
	function docClick(e){//Обработчик клика на веь документ
		// console.log('docClick');
		var targetEl = e.target;

		// Открытие и закрытие выпадающих меню на тач-устройствах
		if(window.innerWidth > 767.98 && isMobile.any()){
			if(targetEl.classList.contains('menu__arrow')){
				targetEl.closest('.menu__item').classList.toggle('touch-hover');
				siblings('.menu__item', targetEl.closest('.menu__item'), 'touch-hover');		
			}
			if(!targetEl.closest('.menu__item') && document.querySelector('.menu__item.touch-hover') !== null){
				removeClass('.menu__item', 'touch-hover');
			}
		}
		// КОНЕЦ Открытие и закрытие выпадающих меню на тач-устройствах

		// Открытие и закрытие Формы поиска
			if(targetEl.classList.contains('search-form__icon')){
				document.querySelector('.search-form').classList.toggle('active');
			}
			if(!targetEl.closest('.search-form__icon') && document.querySelector('.search-form.active') !== null){
				document.querySelector('.search-form').classList.remove('active');
			}
		// КОНЕЦ Открытие и закрытие Формы поиска

				// console.log(targetEl)
		// Раскрытие мобильного меню
			if(targetEl.closest('.toggle-mnu')){
				console.log('toggel!')
				document.querySelector('.menu__body').classList.toggle('active');
				document.querySelector('.toggle-mnu').classList.toggle('on');
				
			}
		// КОНЕЫ раскрытие мобильного меню

		// подгрузка новых товаров
			if(targetEl.classList.contains('products__more')){
				fetchProducts(targetEl);
			}
		// КОНЕЫ подгрузка новых товаров

		// отправка картинки в корзину
			if(targetEl.classList.contains('actions-product__button')){
				sendToCard(targetEl);
			}
		// КОНЕЫ отправка картинки в корзину

	}
	function siblings(elSelector, el, classToRemove) {
		var elSiblings = document.querySelectorAll(elSelector);
		for (var i = 0; i < elSiblings.length; i++) {
			if(elSiblings[i] !== el){
				elSiblings[i].classList.remove(classToRemove);
			}
		}
	}
	function removeClass(elSelector, classToRemove) {
		var elems = document.querySelectorAll(elSelector);
		for (var i = 0; i < elems.length; i++) {
			elems[i].classList.remove(classToRemove);
		}
	}

	function fetchProducts(button) {
		if(!button.classList.contains('hold')){
			button.classList.add('hold');
			
			fetch('json/products.json')
				.then(function(response){
					return response.json();
				})
				.then(function(data) {
					// console.log(data.products);
					setTimeout(function() {
						createFetchedProducts(data.products);
						button.classList.remove('hold');
						button.remove();
					}, 1000);
				})
				.catch(function(error) {
					alert('loading error ' + error);
				});
		}
	}

	function createFetchedProducts(data) {
		var container = document.querySelector('.products__items');
		data.forEach(function(elem) {
			var product = '';
			var labels = '';
			var labelsStart = `<div class="item-product__labels">`;
			var labelsBody = '';
			var labelsEnd = `</div>`;

			if(elem.labels.length > 0){
				elem.labels.forEach(function(label) {
					labelsBody+= `<div class="item-product__label item-product__label--${label.type}">${label.value}</div>`
				});

				labels += labelsStart + labelsBody + labelsEnd;
        // console.log(labelsBody);
        console.log(labels);
			}
			
			var productStart = `<article data-pid="${elem.id}" class="products__item item-product">`;
	    var productEnd = `<div class="item-product__image _fit"><img src="img/products/${elem.image}" class="_fit-img"></div>
	              <div class="item-product__body">
	                <div class="item-product__content">
	                  <div class="item-product__title">${elem.title}</div>
	                  <div class="item-product__text">${elem.text}</div>
	                </div>
	                <div class="item-product__prices">
	                  <div class="item-product__price">${elem.price}</div>
	                  <div class="item-product__price item-product__price--old">${elem.priceOld}</div>
	                </div>
	                <div class="item-product__actions actions-product">
	                  <div class="actions-product__body"><span class="actions-product__button button button-wht">Add to cart</span><span class="actions-product__link icon-share">share</span><span class="actions-product__link icon-favorite">like</span></div>
	                </div>
	              </div>
	            </article>`;
      var product = productStart + labels + productEnd

     	container.insertAdjacentHTML('beforeend', product);

		});
	}

	function sendToCard(btn) {
		var product = btn.closest('.products__item'),
				img = product.querySelector('.item-product__image'),
				cart = document.querySelector('.cart-header__icon'),
				imgClone = img.cloneNode(true);

		if(!btn.classList.contains('hold')){
			btn.classList.add('hold');
			btn.innerText = 'allready in cart';
					console.log('transitionend!!');
		}

		imgClone.setAttribute('style', `width: ${img.offsetWidth}px; 
			height: ${img.offsetHeight}px;
			padding-bottom: 0;
			position: fixed;
			border: 2px solid #E89F72;
			left: ${img.getBoundingClientRect().left}px;
			top: ${img.getBoundingClientRect().top}px;`);

		document.body.append(imgClone);

		imgClone.setAttribute('style', `width: ${img.offsetWidth}px; 
			height: ${img.offsetHeight}px;
			padding-bottom: 0;
			position: fixed;
			border: 2px solid #E89F72;
			opacity: 0;
			width: 0;
			height: 0;
			z-index: 100;
			left: ${cart.getBoundingClientRect().left}px;
			top: ${cart.getBoundingClientRect().top}px;`);

		imgClone.addEventListener('transitionend', function(e) {
			// if(btn.classList.contains('hold')){
			// }
				if (e.propertyName == 'top') {
        	imgClone.remove();
					updateCart(btn, product.dataset.pid, false);
    		}
		});
	}

	function updateCart(btn, prodId, action) {

		var cartQuantity = document.querySelector('.cart-header__icon span'),
				cartIcon = document.querySelector('.cart-header__icon'),
				cartList = document.querySelector('.cart-header__list'),
				prodTitle = document.querySelector('.products__item[data-pid="'+prodId+'"]')
					.querySelector('.item-product__title').innerText,
				prodImg = document.querySelector('.products__item[data-pid="'+prodId+'"]')
					.querySelector('.item-product__image').innerHTML;

		console.log(prodTitle);

		if(!action){
			// var cartItem
			var listItem = `<li class="cart-list__item">
				<div class="cart-list__img">${prodImg}</div>	
				<div class="cart-list__title">${prodTitle}</div>	
				<div class="cart-list__remove">delete</div>	
			</li>`

			if(!cartQuantity){
				cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>');
			}else{
				cartQuantity.innerHTML = +cartQuantity.innerHTML + 1;
			}

			cartList.insertAdjacentHTML('beforeend', listItem);
		}
	}

	/*
		Список:
			- фото
			- нызвание
			- удаление
	*/

	var headerElem = document.querySelector('.header'),
			observerCallback = function(entries, observer) {
				console.log(entries);
				if(entries[0].isIntersecting){
					headerElem.classList.remove('_scroll');
				}else{

					headerElem.classList.add('_scroll');
				}
			};

	var headerObserver = new IntersectionObserver(observerCallback);
	headerObserver.observe(headerElem);


	var swiper = new Swiper('.swiper-container', {
	  // Optional parameters
	  loop: true,
	  spaceBetween: 30,
	  parallax: true,
	  // If we need pagination
	  pagination: {
	    el: '.controls-slider-main__dots',
	    clickable: true
	  },

	  // Navigation arrows
	  navigation: {
	    nextEl: '.slider-main__controls .slider-arrow--next',
	    prevEl: '.slider-main__controls .slider-arrow--prev',
	  }
	});


});

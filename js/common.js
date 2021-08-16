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
		console.log('docClick');
		
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

				console.log(targetEl)
		// Раскрытие мобильного меню
			if(targetEl.closest('.toggle-mnu')){
				console.log('toggel!')
				document.querySelector('.menu__body').classList.toggle('active');
				document.querySelector('.toggle-mnu').classList.toggle('on');
				
			}
		// КОНЕЫ раскрытие мобильного меню

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
});

// (function() {
	function Accordion(accordionList, duration, disableCheckPoint){
	  var _self = this;
	  var links = accordionList.querySelectorAll('.accordion__link');
	  
	  this.init = function(){
	  	console.log('init!')
	    for(var i=0 ; i<links.length; i++){
	      links[i].addEventListener('click', this.clicker);  
	    }
	  },
	  this.clicker = function(e){
	    if(screen.width <= disableCheckPoint){
	    	e.preventDefault();
		    var content = this.nextElementSibling;
		    _self.slideToggle(content, duration);
		    if(accordionList.hasAttribute('data-accordion')){
		      _self.slideSiblings(this, duration);
		    }    	
	    }else{
	    	return;
	    }
	  },
	  this.slideSiblings = function(item){
	    var parent = item.parentNode;
	    var accordionChildren = item.closest('.accordion__item').parentNode.children;
	    
	    for(var i=0; i< accordionChildren.length; i++){
	      if(accordionChildren[i] !== parent  && accordionChildren[i].querySelector('.accordion__content') !== null){
	        this.slideUp(accordionChildren[i].querySelector('.accordion__content'), duration);
	      }
	    }
	  },
	  this.slideUp = function(target, duration){

	    target.style.transitionProperty = 'height, margin, padding';
	    target.style.transitionDuration = duration + 'ms';
	    target.style.boxSizing = 'border-box';
	    target.style.height = target.offsetHeight + 'px';
	    target.offsetHeight;
	    target.style.overflow = 'hidden';
	    target.style.height = 0;
	    target.style.paddingTop = 0;
	    target.style.paddingBottom = 0;
	    target.style.marginTop = 0;
	    target.style.marginBottom = 0;
	    window.setTimeout( function(){
	      target.style.display = 'none';
	      target.style.removeProperty('height');
	      target.style.removeProperty('padding-top');
	      target.style.removeProperty('padding-bottom');
	      target.style.removeProperty('margin-top');
	      target.style.removeProperty('margin-bottom');
	      target.style.removeProperty('overflow');
	      target.style.removeProperty('transition-duration');
	      target.style.removeProperty('transition-property');
	    }, duration);
	    target.parentNode.classList.remove('active');
	  },
	  this.slideDown = function(target, duration){

	    target.style.removeProperty('display');
	    let display = window.getComputedStyle(target).display;
	    if (display === 'none') display = 'block';
	    target.style.display = display;
	    let height = target.offsetHeight;
	    target.style.overflow = 'hidden';
	    target.style.height = 0;
	    target.style.paddingTop = 0;
	    target.style.paddingBottom = 0;
	    target.style.marginTop = 0;
	    target.style.marginBottom = 0;
	    target.offsetHeight;
	    target.style.boxSizing = 'border-box';
	    target.style.transitionProperty = "height, margin, padding";
	    target.style.transitionDuration = duration + 'ms';
	    target.style.height = height + 'px';
	    target.style.removeProperty('padding-top');
	    target.style.removeProperty('padding-bottom');
	    target.style.removeProperty('margin-top');
	    target.style.removeProperty('margin-bottom');
	    window.setTimeout( function(){
	      target.style.removeProperty('height');
	      target.style.removeProperty('overflow');
	      target.style.removeProperty('transition-duration');
	      target.style.removeProperty('transition-property');
	    }, duration);
	    target.parentNode.classList.add('active');
	  },
	  this.slideToggle = function(target, duration){
	    if (window.getComputedStyle(target).display === 'none') {
	      return this.slideDown(target, duration);
	    } else {
	      return this.slideUp(target, duration);
	    }
	  }
	  this.init();
	}
// })();
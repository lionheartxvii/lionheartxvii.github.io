let autoJumperMenu = (function() {
    'use strict';
    
    let conf = {
        jump2elements:null,
        MenuElements: null,
        jumperMenuContainer: null,
        itemsText: null,
        scrollingObserver:null
    }
    
    function createMenuContainer() {
        conf.jumperMenuContainer = document.createElement('div');
        document.body.appendChild( conf.jumperMenuContainer );
        conf.jumperMenuContainer.setAttribute('id', 'jumpMenuContainer');
    }

    function createMenuItems() {
        let jumperMenuHTML = '<div class="inner">';

        conf.jump2elements.forEach((element, index) => {
        element.setAttribute('data-index', index);
            jumperMenuHTML += '<a href="#';
            jumperMenuHTML += element.getAttribute('id');
            jumperMenuHTML += '">';

            let jumpLinkText = getItemText(element);
            if(jumpLinkText){
                jumperMenuHTML += '<span>';
                jumperMenuHTML += jumpLinkText;
                jumperMenuHTML += '</span>';
            }        
            jumperMenuHTML += '</a>';
        });

        jumperMenuHTML += '</div>';
        jumperMenuContainer.innerHTML = jumperMenuHTML;

        conf.MenuElements = document.querySelectorAll('#jumperMenuContainer a');
    }
  
    function getItemText(element) {
// Text - element
        if(conf.itemsText && conf.itemsText[0] == 'element'){
            return element.querySelector( conf.itemsText[1] ).innerText;
        }
    }

    function initScrollingObserver() {
        let scrollingObserverOptions = {
            root: null,
            threshold: 0.5
        }

        conf.scrollingObserver = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
              if(entry.isIntersecting){
                setJumperActive(entry.target);
              }        
            });
        }, scrollingObserverOptions);

        conf.jump2elements.forEach((element,index)=>{
            conf.scrollingObserver.observe(element);
        })
    }

    function setJumperActive(element) {
        conf.MenuElements.forEach((entry, index) => {
          if(element.dataset.index != index){
            entry.classList.remove('active');
          }else{
            entry.classList.add('active');
          }
        });  
      }

    function init(param) {
        conf.jump2elements = document.querySelectorAll(param.targetElementsSelector);
// Text - element
// Todo: implement text-attribute
        if(param.jumpLinkTextSelector !== undefined){
            conf.itemsText = ['element', param.jumpLinkTextSelector];
        }

        if(conf.jump2elements){
            createMenuContainer();
            createMenuItems();
            initScrollingObserver();
        }
    }
  
    return {
      init: init, // public method
    };
  })();
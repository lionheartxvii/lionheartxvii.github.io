let autoJumperMenu = (function() {
    'use strict';
    
    let conf = {
        jump2elements:null,
        MenuElements: null,
        jumperMenuContainer: null,
        itemsText: null
    }
    
    function createMenuContainer() {
        conf.jumperMenuContainer = document.createElement('div');
        document.body.appendChild( conf.jumperMenuContainer );
        conf.jumperMenuContainer.setAttribute('id', 'jumperMenuContainer');
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
        }
    }
  
    return {
      init: init, // public method
    };
  })();
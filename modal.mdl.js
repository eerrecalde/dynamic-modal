/* global angular:false */
/*jshint unused:false */

(function () {
  'use strict';

  $('body').append('<div dynamic-modal show="modalShown"></div>');

  function Show(){
    this.data = {
      visibility: false,
      tpl: '',
      theme:''
    };
  }

  //Directive trigger modal
  // @ngInject
  function ModalTrigger(show, TplPath){
    var link = function(scope, elem, attrs){
      //update modal stage and template
      console.log(attrs);
      elem.bind('click', function(){
        console.log(attrs);
        show.data.visibility = true; 
        show.data.tpl = attrs.modalTpl;
        show.data.theme = attrs.modalTheme;
      });
    };

    return{
      restrict: 'A',
      scope: {
        modalTpl: '@',
        modalTheme: '@'
      },
      link: link
    };
  }

  //Directive modal
  // @ngInject
  function ModalDirective(show, $timeout, TplPath){

    var link = function(scope) {

      //show modal template
      scope.getTplUrl = function() {
        console.log('tpl', TplPath+show.data.tpl);
        return TplPath+show.data.tpl;
      };

      scope.getTheme = function(){
        return show.data.theme || 'white';
      };
      //Set modal stage
      scope.show = function(){
        if(show.data.visibility)
          $('body').addClass('loading');
          
        return show.data.visibility;
      };

      //update modal stage
      scope.hideModal = function() {
        $('body').removeClass('loading');
        show.data.visibility = false;
        show.data.tpl = '';
        show.data.theme = '';
      };

      scope.$on('closeModal', function(event, data) { 
        scope.hideModal();
      });

      scope.$on('updateModal', function(event, data) { 
        show.data.tpl = data.tpl;
        if(data.theme)
          show.data.theme = data.theme;
      }); 
         
    };

    return{
      restrict: 'EA',
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      link: link,
      template: '<div class="mod-modal" ng-show="show()">'+
                  '<div class="modal-wrap" ng-click="hideModal()"></div>'+
                  '<div class="modal-container {{getTheme()}}">'+
                    '<div class="modal-close" ng-click="hideModal()"></div>'+
                    '<div class="modal-tpl grid-container" ng-include="getTplUrl()"></div>'+
                  '</div>'+
                '</div>'
    };
  }

  /** Dependency Injection Array for minification **/
  ModalTrigger.$inject = ['show', 'TplPath'];
  ModalDirective.$inject = ['show', '$timeout', 'TplPath'];
  

  angular.module('dynamic-modal',[])
    .constant('TplPath', 'shared/dynamic-modal/templates/')
    .directive('dynamicModal', ModalDirective)
    .directive('triggerModal', ModalTrigger)
    .service('show', Show);
  }());
define([
    "jquery",  
    "common", 
    "class", 
    "jquery.tmpl", 
    "jquery.draggable"], function( $, common, Class ) {
    
    var Slides = new Class;
    // create new class
        Slides.extend({
          initialize: function( attr, cTemplate, sTemplate ) {
            this.slides = attr.slides;
            // check that our presentaion has at least one slide to show
            if( !this.slides.length ) 
               throw new Error("It should be passed at least one slide discription");
             this.option = $.extend( common.DEFAULTS.option , attr.option  );
             this.wrap   = $( "<div class=\"slide-wrap\"><div></div><\/div>" );  
             this.$Slides;
             this.$Container;
               // get templates or selectors to get
               this.cTemplate    = cTemplate;
               this.sTemplate    = sTemplate;
               // define some props for slides control 
                this.$currentSlide = 0;
                this.$play = false;
            // create slides review; It is possible to do using
            // logic in templates. However, I think this is a bad idea 
            // to put a lot of logic in templates
            this.option.slides = (function( slides ) {
              var array = [];
                $.each( slides , function( index, value ) {
                 array.push({
                  title  : common._case("up", value.title)[0],
                  shorts : common.cut( value.text.body, 0, 51 )[0]
                });
               });
               return array;
             }( this.slides ));
           } ,
          createContainer : function() { 
              // create main container for the current slideshow 
              // #1 compile template
              $.template( "static-main", common.expect( 
                  this.cTemplate , "array" ) && this.cTemplate[0] || $("#containerTmpl").html() );
              // #2 render and append to... by default to body
              this.$Container = $.tmpl( "static-main", this.option ).appendTo( this.option.to );
              // #3 add some useful utils 
              this.$Container.find(".drag").tinyDraggable( null, ".slides-nav-left" );
            return this;
           } ,
          renderSlides : function() {
           // start to render slides 
            $.template( "slides-each", common.expect( 
                  this.sTemplate , "array" ) && this.sTemplate[0] || $("#slidesTmpl").html() );
    
            this.$Slides = $.tmpl( "slides-each", this.slides, this.option );
            // wrap our slides 
            this.wrap
             .children()
             .append( this.$Slides )
             .parent()
             .css({
                width  : this.option.width,
                height : this.option.height
             })
              .appendTo( this.$Container );
            return this;
           } ,
          jumpTo : function( event, guid ) {
            var $index = this.$currentSlide = event 
                 ? +$( event.delegateTarget ).attr("data-slide") : guid;
            this.wrap
             .children()
             .animate({top: -$index * this.option.height});
            return false; 
          },
         control : function() {
           var Control = new Class( this );
               Control.extend({
                 next : function() {
                   if( !this.balance() ) return;
                   this.jumpTo( null, ($this.$currentSlide += 1));
                 },
                 prev : function() {
                   if( !this.balance() ) return;
                   this.jumpTo( null, ($this.$currentSlide -= 1));   
                  },
                 play : function() {
                 
                 },
                 balance : function() {
                   return this.$currentSlide <= this.slides.length;  
                }
             });
           return new Control 
         },
         addControllers : function() {
           this.$Container.find(".slides-item").bind("click", $.proxy(this.jumpTo, this));
           // add controls 
           $.each([
               "next" ,
               "prev" , 
               "play"
           ], $.proxy(function( index, value ) {
              this.$Container
                .on("click", ".slide-show-" + value, this.control()[value];
           }, this));
    
           return this;
         }
        });
    
    return function( attr, remote ) {
     if( common.expect( remote , "object" ) ) {
      var opt      = $.extend( common.DEFAULTS.setting, remote );
      var deferred = new $.Deferred();
       $.when(
          $.ajax({url: opt.cTemplateUrl}) ,
          $.ajax({url: opt.sTemplateUrl})
        )
         .done(function( containerTemplate, slidesTemplate ) {
           var res = (new Slides( attr, containerTemplate, slidesTemplate ))
            .createContainer()
             .renderSlides()
              .addControllers();
           deferred.resolve( res.$Slides );
        })
         .fail(function(event){
           deferred.reject(event.statusText);
       });
      return deferred;
     }
     // or load from html
      return (new Slides( attr )).createContainer().renderSlides()
      .addControllers();
    }
});

// Binding events 

 function handler( w, h ){
  // You should not call method scrollSubscribe. It will be called automatically.
  console.log( w, h )    
 }; 
 
  // Attach a handler to an event
   vk.on( "Scroll", handler );

  // Remove an event handler.
   vk.off( "Scroll", handler );
   
  // You can attach/remove multiple events
  vk.on({"Scroll": handler, "ScrollTop": handler, "WindowFocus": focusedHandler})

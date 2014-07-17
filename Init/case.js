// Use default VK init function 
VK.init(function() {
  
  // API initialization succeeded 
  // New instance of AiryVK API will be created 
  var req = new vk();

 }, function() { 
     // API initialization failed 
     // Can reload page here
    vk.again() ;
    // vk.latest is the latest version of VK API
}, vk.latest ); 




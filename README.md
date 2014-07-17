# AiryVK-API

VK API library

## Installation
### Put this into the head section: 
```
  <script src="//vk.com/js/api/xd_connection.js?2";  type="text/javascript"></script>
  <script src="airyvk-api.min.js?2";  type="text/javascript></script>;
```
### Get started 

```
<script type="text/javascript"> 
 VK.init(function() {
   var req = new vk()
       req.users("get").raw().res(function(data){
         console.log( data )  
      })
 }, function() {}, vk.latest ); 
</script>
```

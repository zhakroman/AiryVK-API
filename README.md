# AiryVK-API

VK API library

## Installation
### Put this into the head section: 
```
  <script src="//vk.com/js/api/xd_connection.js?2"  type="text/javascript"></script>
  <script src="airyvk-api.min.js?2"  type="text/javascript></script>
```
### Get started 

```
<script type="text/javascript"> 
 VK.init(function() {
   var req = new vk();
       req.users("get").photos("getAlbums")
        .filter({title: /qwqw|test/i}).res(function( data ){
           console.log( data )  // data contains all albums, filtered albums, and user data.    
      });
 }, function() {}, vk.latest ); 
</script>
```

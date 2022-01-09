# weatherflow-map

## To run the application

Clone it, run `npm i`, then open the html file in the browser.

## In case of CORS issue:

I had to download a chrome extension to get around a CORS issue:

`Access to XMLHttpRequest at 'https://api.weatherflow.com/wxengine/rest/spot/getSpotDetailSetByZoomLevel?lat_min=33.82&lat_max=34.18&lon_min=-119.13&lon_max=-117.93&zoom=11&wf_token=d24d7c08a1e0136dca93e86cd38455a4&units_wind=mph&units_temp=f&units_distance=mi' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

### Steps

- Add this extension to Chrome https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
- Once installed, go to the Chrome toolbar on the top of the page, click the 3 dots next to this extension, open up options.
- change `4. Access-Control-Allow-Origin` to `*`
- open the html page, and turn on the CORS extension.
- CORS error should now be gone

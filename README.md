# sample-article-carousel
This sample web application illustrates how to call IBM Watson Content Hub APIs from client JavaScript. The application uses jQuery and Bootstrap to display a carousel showing a list of articles with images from Watson Content Hub.

This sample shows:
* Using the powerful search API to retrieve a list of content items for a specific content type.
* Accessing content item elements for use in rendering.
* Dynamically building HTML for a carousel display using jQuery and Bootstrap.

###Alternative Handlebars implementation

There are two versions of the rendering implementation for this application. The first version (in index.html and app.js) builds up HTML by concatenating strings; the second version (in index-handlebars.html and app-handlebars.js) uses the Handlebars templating library. Otherwise the two implementations are the same. The Handlebars approach lets you avoid the string concatenation you see in app.js.

###Running the sample

#### 1. Download the files

Download the application files (html, js, and css) from the 'public' folder into any folder on your workstation.

#### 2. Update the baseTenantUrl and serverBaseUrl

The baseTenantUrl and serverBaseUrl variables in app.js and app-handlebars.js must also be set for your tenant. In the IBM Watson Content Hub user interface, open the user menu by clicking the drop-down arrow next to the user name on the top navigation bar. Select "Hub Information" from the user menu.  The pop-up window shows your Watson Content Hub tenant specific "API URL". Use this information to update the value of baseTenantUrl in the above mentioned JS files.  For example it might look something like this:

const baseTenantUrl = "https://my12.digitalexperience.ibm.com/api/12345678-9abc-def0-1234-56789abcdef0";

The serverBaseUrl will include just the first part of that, similar to this:

const serverBaseUrl = "https://my12.digitalexperience.ibm.com";


#### 3. Upload sample "Article" content

This application requires that you have an "Article" content type available and one or more content items using that type.

Follow the instructions at the [sample-article-content](https://github.com/ibm-wch/sample-article-content) repository, to download and push the sample article type and associated authoring artifacts, for your content hub tenant.

#### 4. Enable CORS support for your tenant

Since this sample will run from a different domain than Watson Content Hub services, you will need to enable CORS (Cross-Origin Resource Sharing) for your tenant. You should only add domains that require access to the content and assets stored in your content hub, such as your web servers or your development environment. The domain format must be `protocol://server:port` where the protocol is either http or https, the server is either your server name or its IP address, and the port is the port number of your server. For example: `http://my.domain.org:80`. You can also use the `*` wildcard to enable CORS for any domain, though this isn't recommended from a security perspective. To control the CORS enablement for Watson Content Hub, go to Hub set up -> General settings -> Security tab. After adding your domain, be sure to click the Save button at the top right of the screen


#### 5. Load index.html in a browser

You can do this right from the file system in Firefox, Chrome, or Safari browsers. Alternatively you can make the files available on any web server and open index.html in a browser using your web server URL.

If all goes well you should see a carousel looking something like this (depending on what you entered for text and on the images you selected):

![Alt text](/docs/article-sample-screenshot.jpg?raw=true "Sample screenshot")

###Resources

API Explorer reference documentation: https://developer.ibm.com/api/view/id-618

Watson Content Hub developer center: https://developer.ibm.com/wch/

Watson Content Hub forum: https://developer.ibm.com/answers/smartspace/wch/

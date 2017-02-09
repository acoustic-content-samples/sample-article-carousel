# sample-article-carousel
This sample web application illustrates how to call IBM Watson Content Hub APIs from client JavaScript. The application uses jQuery and Bootstrap to display a carousel showing a list of articles with images from Watson Content Hub.

This sample shows:
* Authenticating to the Watson Content Hub and calling APIs that require authentication.
* Using the powerful search API to retrieve a list of content items for a specific content type.
* Accessing content item elements for use in rendering.
* Dynamically building HTML for a carousel display using jQuery and Bootstrap.

### About the Watson Content Hub authoring APIs

The initial set of APIs provided by Watson Content Hub are for authoring services, which require authentication and are not optimized for retrieval by applications in production. Follow-on releases will provide "delivery" services which can be accessed anonymously and are optimized for caching and performance. However, the two APIs will be very similar, so to switch from authoring to delivery services you will just need to change the "authoring" portion of the service URL to "delivery." 

### About authentication and tenant handling

To call authenticated APIs, you need to first call the login service with the desired user name and password. This will return tenant information and an authentication token cookie for use on subsequent calls. The browser will include the authentication token cookie in subsequent requests. 

The login call will return both a tenant ID and a tenant base URL in the response header. The tenant ID needs to be part of the URL for subsequent API calls. For example, the search service will have a URL like this:

https://my.digitalexperience.ibm.com/api/[tenantID]/authoring/v1/search

Typically you will use the base URL from the x-ibm-dx-tenant-base-url header to construct the service URL with the tenant ID. This is what's done in the sample code. An alternative approach is to obtain the tenant ID from the Watson Content Hub user interface. Click on the "i" information icon at the top left next to where it says "IBM Watson Content Hub" and you will see your tenant ID.

Once you have the authentication token and have built the complete API link that includes the tenant ID, you can call any of the authenticated APIs by appending the specific API route for the service you want. This example calls the search service by appending "/authoring/v1/search" to the base URL.

Note that every API service operation has specific user roles that it can be used with. In the API Explorer (see link below under resources) you can see the user roles for all operations.

### About CORS support

Since this sample will run from a different domain than Watson Content Hub services, you will need to enable CORS (Cross-Origin Resource Sharing) in Watson Content Hub. You should only add domains that require access to the content and assets stored in your content hub, such as your web servers or your development environment. The domain format must be protocol://server:port where the protocol is either http or https, the server is either your server name or its IP address, and the port is the port number of your server. For example: http://my.domain.org:80. You can also use the "*" wildcard to enable CORS for any domain, though this isn't recommended from a security perspective.

###Alternative Handlebars implementation

There are two versions of the rendering implementation for this application. The first version (in index.html and app.js) builds up HTML by concatenating strings; the second version (in index-handlebars.html and app-handlebars.js) uses the Handlebars templating library. Otherwise the two implementations are the same. The Handlebars approach lets you avoid the string concatenation you see in app.js.

###Running the sample

#### 1. Download the files

Download the application files (html, js, and css) from the 'public' folder into any folder on your workstation.

#### 2. Update the user credentials

This sample uses hard-coded user name and password set in the app.js file. Update the name and password values in that file.

To avoid putting credentials in the source you could change the application to provide browser inputs for username and password. Also, as noted above, future Watson Content Hub releases will have support for "delivery" APIs that can be available without login.

####3. Create an "Article" content type with some content items

This application requires that you have an "Article" content type available and one or more content items using that type.

Follow the instructions at the [sample-article-content](https://github.com/ibm-wch/sample-article-content) repository, to download and push the sample article type and associated authoring artifacts, for your content hub tenant.

#### 4. Enable CORS support for your tenant

For this scenario you will need to enable CORS support for your tenant as mentioned above. To control the CORS enablement for Watson Content Hub, go to Hub set up -> General settings -> Security tab. After adding your domain (or "*" for any domain), be sure to click the Save button at the top right of the screen.


#### 5. Load index.html in a browser

You can do this right from the file system in Firefox, Chrome, or Safari browsers. Alternatively you can make the files available on any web server and open index.html in a browser using your web server URL.

If all goes well you should see a carousel looking something like this (depending on what you entered for text and on the images you selected):

![Alt text](/docs/article-sample-screenshot.jpg?raw=true "Sample screenshot")

###Resources

API Explorer reference documentation: https://developer.ibm.com/api/view/id-618

Watson Content Hub developer center: https://developer.ibm.com/wch/

Watson Content Hub forum: https://developer.ibm.com/answers/smartspace/wch/

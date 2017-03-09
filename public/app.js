/*
 * Copyright 2016  IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */
"use strict";

// Base URL for APIs - replace {Host} and {Tenant ID} using the values available 
// from the "i" information icon at the top left of the WCH screen 
const baseTenantUrl = "https://{Host}/api/{Tenant ID}";
const serverBaseUrl = "https://{Host}";

// Services used for this sample
const searchService = "/delivery/v1/search";

// search parameters for retrieving all content items of content type "Article"
const searchParams = "q=*:*&fl=id,document&wt=json&fq=type%3A%22Article%22&fq=classification:(content)&sort=lastModified%20desc";

function showContent() {
    var searchURL = baseTenantUrl + searchService + "?" + searchParams;
    var reqOptions = {
        xhrFields: { withCredentials: true },
        dataType: "json",
        url: searchURL,
    };
    $.ajax(reqOptions).done(function(json) {
        // generate HTML for carousel indicators and items from the search result list
        var indicators = []; // carousel indicators
        var innerItems = []; // the carousel items
        $(json.documents).each(function(index, item) {
            // the entire content item is available in the "document" field as a JSON string, so we'll parse it.
            var docJson = $.parseJSON(item.document);
            // console.log('docJson: ', JSON.stringify(docJson));
            var elements = docJson.elements;
            // for the first indicator and the first item, set the "active" class 
            var activeClass = indicators.length == 0 ? ' class="active"' : '';
            var activeItemClass = indicators.length == 0 ? ' class="item active"' : ' class="item"';
            // Get several element values for display
            var imageResource = serverBaseUrl + "/" + elements.image.url;
            if (imageResource) {
                var title = (elements.title === undefined) ? "" : elements.title.value;
                var summary = (elements.summary === undefined) ? "" : elements.summary.value;
                var author = (elements.author === undefined) ? "" : elements.author.value;
                var publishDate = (elements.publishDate === undefined) ? "" : elements.publishDate.value;
                // generate the HTML for this content item
                indicators.push('<li data-target="#articleCarousel" data-slide-to="0"' + activeClass + '></li>');
                innerItems.push('' + '<div ' + activeItemClass + '>' + '<img class="carousel-image" ' 
                    + 'src="' + imageResource + '" ' + 'width="460" height="345">' + '<div class="carousel-caption">' + '<h1>' + title + '</h1>' + '<p>' + summary + '</p>' + '<h4>' + author + '</h5>' + '</div>' + '</div>'

                );
            }
        });

        // update the HTML elements for indicators and items
        $("#articleCarouselIndicators").html(indicators);
        $("#articleCarouselInner").html(innerItems);
    });
}
$(document).ready(function() {
    showContent();
});
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

// Base URLs and endpoints
const wchLoginApiGateway  = "https://my.digitalexperience.ibm.com/api/";
const wchLoginURL = wchLoginApiGateway + "login/v1/basicauth";
const searchService = "authoring/v1/search";

// Content Hub blueid username and password - replace these or add code to get these from inputs
const username = "[username]";
const password = "[password]";

// search parameters for retrieving all content items of content type "Article"
const searchParams = "q=*:*&wt=json&fq=type%3A%22Article%22&fq=classification:(content)&sort=lastModified%20desc";

function wchLogin() {
    var requestOptions = {
        xhrFields: { withCredentials: true },
        url: wchLoginURL,
        headers: { "Authorization": "Basic " + btoa(username + ":" + password) }
    };
    $.ajax(requestOptions).done(function(data, textStatus, request) {
        var baseTenantUrl = request.getResponseHeader('x-ibm-dx-tenant-base-url'); // use this to get tenant from the basicauth call
        // console.log('baseTenantUrl: ', baseTenantUrl);
        showContent(baseTenantUrl);
    }).fail(function(request, textStatus, err) {
        alert("Content Hub Login returned an error: " + err);
    });
}

function showContent(baseTenantUrl) {
    var searchURL = baseTenantUrl + '/' + searchService + "?" + searchParams;
    var reqOptions = {
        xhrFields: { withCredentials: true },
        dataType: "json",
        url: searchURL,
    };
    $.ajax(reqOptions).done(function(json) {
        // generate HTML for carousel indicators and items from the search result list
        var indicators = []; // carousel indicators
        var contentItems = []; // the carousel items
        $(json.documents).each(function(index, item) {
            // the entire content item is available in the "document" field as a JSON string, so we'll parse it.
            var docJson = $.parseJSON(item.document);
            // console.log('docJson: ', JSON.stringify(docJson));
            var elements = docJson.elements;
            // for the first indicator and the first item, set the "active" class
            var activeClass = indicators.length == 0 ? "active" : '';
            var activeItemClass = indicators.length == 0 ? "item active" : "item";
            // Get several element values for display
            var imageResource = (elements.image.asset === undefined) ? "" : elements.image.asset.resourceUri ;
            var title = (elements.title === undefined) ? "" : elements.title.value ;
            var summary = (elements.summary === undefined) ? "" : elements.summary.value ;
            var author = (elements.author === undefined) ? "" : elements.author.value ;
            var publishDate = (elements.publishDate === undefined) ? "" : elements.publishDate.value ;
            // generate the context for the handlebars template for this content item
            indicators.push( { "activeClass": activeClass} );
            contentItems.push( {
                "activeItemClass": activeItemClass,
                "resourceURI": baseTenantUrl + imageResource,
                "title": title,
                "summary": summary,
                "author":  author,
                "publishDate": publishDate
            } );
        });

        // update HTML for indicators and items
        var indicatorsScript = $("#indicatorsTemplate").html();
        var indicatorsTemplate = Handlebars.compile(indicatorsScript);
        var compiledIndicatorsHTML = indicatorsTemplate({indicators});
        $("#articleCarouselIndicators").append(compiledIndicatorsHTML);

        var innerDivScript = $("#innerDivTemplate").html();
        var innerDivTemplate = Handlebars.compile(innerDivScript);
        var compiledHTML = innerDivTemplate({contentItems});
        $("#articleCarouselInner").append(compiledHTML);
    });
}
$(document).ready(function() {
    wchLogin();
});

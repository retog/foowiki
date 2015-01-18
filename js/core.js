 function getDataForURL(doneCallback, getPageURL) {
     $.ajax({
         url: getPageURL,
         accept: {
             xml: 'application/xml;charset=UTF-8',
             sparql: 'sparql-results+xml;charset=UTF-8'
         },
         headers: { // belt and braces
             'Accept': 'sparql-results+xml;charset=UTF-8'
             //   'Accept-Charset': 'UTF-8' unsafe
         }

     }).done(function (xml) {
         var pageURI = queryString["uri"];
         pageURI = encodeURI(pageURI);
         doneCallback(xml, pageURI);
     });
 }



 function sparqlXMLtoJSON(xml, bindingNames) {
     

     var xmlString = (new XMLSerializer()).serializeToString(xml);

     // workaround for wrong interpretation of charset
     xmlString = xmlString.replace(/[^\u0000-\u007F]/g, '');
     // maybe force to ISO-8859-1, also known as Latin-1 instead?

     var $xml = $(xmlString);
   //  var entry = {
   //      "uri": "page.html?uri=" + pageURI
   //  };

     var results = $xml.find("result");

     if (results.length == 0) {
         return false;
     }

     var jsonResults = [];

     results.each(function () {
         var map = {};
         for (var i = 0; i < bindingNames.length; i++) {
             var name = bindingNames[i];
             console.log("NAME=" + name);
             $(this).find("binding[name='" + name + "']").each(function () {
               //  entry[name] = $(this).text().trim();
                // console.log("entry[name]=" + entry[name]);
                 map[name] = $(this).text().trim();
             });
         }
         jsonResults.push(map);
     });
     return jsonResults;
 }

/*
 function xmlToEntry(xml, pageURI) {

     //  console.log("XML = " + xml);

     var xmlString = (new XMLSerializer()).serializeToString(xml);

     // workaround for wrong interpretation of charset
     xmlString = xmlString.replace(/[^\u0000-\u007F]/g, '');
     // maybe force to ISO-8859-1, also known as Latin-1 instead?

     var $xml = $(xmlString);
   var entry = {
        "uri": "page.html?uri=" + pageURI
  };

     var results = $xml.find("result");

     if (results.length == 0) {
         return false;
     }

     results.each(function () {

         $(this).find("binding[name='date']").each(function () {
             entry.date = $(this).text().trim();
         });
         $(this).find("binding[name='title']").each(function () {
             entry.title = $(this).text().trim();
         });
         $(this).find("binding[name='content']").each(function () {
             entry.content = $(this).text().trim();
         });
         $(this).find("binding[name='nick']").each(function () {
             entry.nick = $(this).text().trim();
         });
         $(this).find("binding[name='format']").each(function () {
             entry.format = $(this).text().trim();
         });
     });

     return entry;
 }
 */

/*
 function xmlToEntryArray(xml) {
     var xmlString = (new XMLSerializer()).serializeToString(xml);

     // workaround for wrong interpretation of charset
     xmlString = xmlString.replace(/[^\u0000-\u007F]/g, '');
     // maybe force to ISO-8859-1, also known as Latin-1 instead?

     var $xml = $(xmlString);
     var entryArray = [];

     $xml.find("result").each(function () {
         var entry = {};

         $(this).find("binding[name='uri']").each(function () {
             entry.uri = $(this).text().trim();
         });
         $(this).find("binding[name='date']").each(function () {
             entry.date = $(this).text().trim();
         });
         $(this).find("binding[name='title']").each(function () {
             entry.title = $(this).text().trim();
         });
         //	$(this).find("binding[name='content']").each(function() {
         //		content = $(this).text().trim();
         //	});
         $(this).find("binding[name='nick']").each(function () {
             entry.nick = $(this).text().trim();
         });
         entryArray.push(entry);
         //     rows += formatPageRow(uri, date, title, nick); // content, 
     });
     return entryArray;
 }
 */
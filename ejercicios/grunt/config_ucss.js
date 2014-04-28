/*
Este config file se ejecuta por terminal usando :
  $ ucss
estando en la ruta de este mismo archivo.
Mas informacion de ucss de Opera Software:
https://github.com/operasoftware/ucss
https://github.com/operasoftware/ucss/blob/master/examples/config_ucss.js
*/
module.exports = {
    "pages": { // (Required) Pages to check. Crawl or include is required.
        //"crawl": "http://localhost/", // (Optional, if "include" is given).
                                      // Starting point for crawler.
        /*"exclude": [ // (Optional) List of HTML files/URLs to check.
            "http://localhost/some_page_to_exclude ", // Exclude this specific
                                                      // page.
            "http://localhost/admin/*", // Exclude all admin pages.
            "http://localhost/products/*" // Exclude all product pages. No
                                          // need to check lots of similar
                                          // pages. Add a few selected ones in
                                          // the 'include' list below instad.
        ],
        */
        "include": [ // (Optional, if "crawl" is given) List of HTML 
                     // files/URLs to check.
            "index.html",
             // Add product from excluded
              // subfolder.
        ]
    },
                                               // to server.
    "css": [ // (Required) List of CSS files to check.
        "styles.css"
    ],
    "whitelist": [".foo", ".bar"], // (Optional) List of CSS rules to ignore,
                                   // e.g. ones added by JavaScript.
    "timeout": 4000, // (Optional) Timeout for HTTP requests. (default is 
                     // 4000ms).
    /*"auth": { // (Optional) Authentication information.
              // Please see docs for more info.
        "username": "foo",
        "password": "bar",
        "loginUrl": "http://localhost:8000/accounts/login/",
        "loginFunc": "djangoLogin"
    },
    */
    "output": { // (Optional) How to output information from uCSS
      /*
        "logger": function(res, originalUrl, loggedIn) {
            // (Optional) Function that is called for each URL that is visited.
            // Use null for if you want it to be silent.
            console.log("Visited: ", originalUrl);
        },
      */
      "logger":null,
        "result": function(result) {
         console.log(result);
         //console.log(result.selectors['.color1'].pos_css['styles.css'][0]);
         for (var s in result.selectors) {
                // Only unused rules:
                if (result.selectors[s].matches_html === 1) {
                    // Print position(s), given it's only one CSS file:
                    var pos_css = result.selectors[s].pos_css;
                    var key = Object.keys(pos_css)[0];
                    console.log(s + ": " + pos_css[key]);
                }
          }
      } // (Optional)

    }
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sp_pnp_js_1 = require("sp-pnp-js");
class SiteData {
    static init() {
        //get everything - verbose
        sp_pnp_js_1.default.setup({
            headers: {
                "Accept": "application/json; odata=verbose"
            }
        });
        //Developers guide
        //https://github.com/SharePoint/PnP-JS-Core/wiki/Developer-Guide
        // GET /_api/web
        sp_pnp_js_1.default.sp.web.get().then(r => {
            console.log("web object");
            //alert("web object returned");
            console.log(r);
            SiteData.addContent("Received web object");
        });
        // GET /_api/web/lists
        sp_pnp_js_1.default.sp.web.lists.get().then(r => {
            console.log("lists object");
            console.log(r);
            SiteData.addContent("Lists retrieved");
        });
        // GET /_api/web/lists/getByTitle('Tasks')
        sp_pnp_js_1.default.sp.web.lists.getByTitle("Site Pages").get().then(r => {
            console.log("Site Pages library");
            console.log(r);
            SiteData.addContent("Site pages library retrieved");
        });
        // GET /_api/web/lists/getByTitle('Tasks')/items
        sp_pnp_js_1.default.sp.web.lists.getByTitle("Site Pages").items.get().then(r => {
            console.log("Site Pages library items");
            console.log(r);
            SiteData.addContent("Site pages library items retrieved");
        });
        /*
        // GET /_api/web/lists/getByTitle('Site Pages')/items(1)
        pnp.sp.web.lists.getByTitle("Site Pages").items.getById(1).get().then(r => {
            
            console.log(r);
        });
        */
    }
    static addContent(html) {
        let element = document.getElementById("demo-pnp-example");
        element.innerHTML += "<p>" + html + "</p>\n";
    }
}
exports.SiteData = SiteData;

//# sourceMappingURL=siteData.js.map

// cssid.js v1.0 [MIT] Copyright (c) NriotHrreion 2020.

(function(root, factory) {
    if(typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if(typeof exports === "object") {
        // Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
    } else {
        // Browser globals (root is window)
		root.cssId = factory();
    }
}(this, function() {

    // Main function
    return function cssId(base64) {
        var g = true;
        base64 = atob(base64);
        
        var xhr = new XMLHttpRequest();
        xhr.open("get", base64);
        xhr.send(null);
        xhr.onload = function() {
            var fr = new FileReader();
            fr.readAsDataURL(new Blob([cssComp(this.responseText)]));
            fr.onload = function() {
                var url = this.result.replace("application/octet-stream","text/css");

                var elem = document.createElement("link");
                elem.href = url;
                elem.rel = "stylesheet";
                elem.type = "text/css";

                document.head.appendChild(elem);
            };
        };

        function cssComp(content) {
            content = content.replace(/\/\*{1,2}[\s\S]*?\*\//g, "");
            content = content.replace(/(\s*){/g, "{");
            content = content.replace(/{(\s*)/g, "{");
            content = content.replace(/}(\s*)/g, "}");
            content = content.replace(/(\s*)}/g, "}");
            content = content.replace(/:(\s*)/g, ":");
            content = content.replace(/,(\s*)/g, ",");
            content = content.replace(/(\n*)/g, "");
            content = content.replace(/    /g, "");
            content = content.replace(/   /g, "");
            content = content.replace(/  /g, "");
            return content;
        }

        return g;
    }

}));

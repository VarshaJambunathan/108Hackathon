function init() {
    $.getJSON("baselocation.json",function(data) {
        console.log(data[0].Locality_name);
    })
}
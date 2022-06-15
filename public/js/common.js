function addJS(url){
    var x = document.createElement('script');
    x.src = url;
    document.getElementsByTagName("head")[0].appendChild(x);
}


function addCSS(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

    

//addJS("https://lib.baomitu.com/vue/3.2.37/vue.global.min.js");
//addJS("https://lib.baomitu.com/axios/0.27.2/axios.min.js");

//addCSS("/assets/vendor/bootstrap/css/bootstrap.min.css");

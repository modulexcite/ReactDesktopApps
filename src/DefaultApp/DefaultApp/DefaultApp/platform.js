/* web */
document.documentElement.className += ' web';
window.nativeHost = {
    quit: function() {
        window.close();
    },
    showAbout: function() {
        alert('RedisReact - ServiceStack + ReactJS');
    },
    ready: function() {
        //
    },
    platform: 'web'
};

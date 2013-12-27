// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
            var installationInstructions = document.querySelector("#installation-instructions");
            if (installationInstructions) {
                installationInstructions.style.display = "none";
            }
        }
        else {
            var install = document.querySelector("#install"),
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
            install.className = "show-install";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                installApp.onsuccess = function(data) {
                    install.style.display = "none";
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log("Open Web Apps not supported");
}

// Hidden audio player
var audio = document.querySelector("#player-audio");

// "Play" button handler
var playBtn = document.querySelector("#play");
if (playBtn) {
    playBtn.onclick = function() {
        // Reset src before we set a new source to the audio element
        audio.removeAttribute('src');
        audio.load();
        // Add mozAudioChannelType to the player to allow music playing in the
        // background.
        audio.mozAudioChannelType = "content";
        audio.src = "music.ogg";
        audio.load();
        audio.play();
    }
}

// Reload content
var reload = document.querySelector("#reload");
if (reload) {
    reload.onclick = function () {
        location.reload(true);
    };
}

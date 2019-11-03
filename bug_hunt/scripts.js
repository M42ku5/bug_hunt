/* Nachfolgend sind alle EventListener aufgeführt */
window.addEventListener('load', callPlacingFuncts);
window.addEventListener('load', changeBgImg);
window.addEventListener('load', getChangelog); /* XMLHttpRequest */
document.getElementById('minuslayer').addEventListener('click', subtractAndShowCounter);
document.getElementById('closefullscreen').addEventListener('click', closeFullscreen);
document.getElementById('bug1').addEventListener('click', createStain1);
document.getElementById('bug1').addEventListener('click', changeObj1);
document.getElementById('bug1').addEventListener('click', changePositionOfBug1);
document.getElementById('bug1').addEventListener('click', addPointForBugHit);
document.getElementById('bug2').addEventListener('click', createStain2);
document.getElementById('bug2').addEventListener('click', subtractTwoPointsForBugHit);
document.getElementById('bug2').addEventListener('click', changeObj2);
document.getElementById('bug2').addEventListener('click', changePositionOfBug2);

/* Nachfolgend sind die Eventlistener vom Startscreen */
document.getElementById('m').addEventListener('click', assembleEmail); /* Funktionsaufruf für das Zusammenfügen der E-Mail-Adresse beim Aufruf */
document.getElementById('btn-easy').addEventListener('click', makeEasy);
document.getElementById('btn-normal').addEventListener('click', makeNormal);
document.getElementById('btn-weather-on').addEventListener('click', selectWetBgImg);
document.getElementById('btn-weather-off').addEventListener('click', changeBgImg);
document.getElementById('btn-location').addEventListener('click', getLocation);
document.getElementById('btn-citydata').addEventListener('click', selectCity);
document.getElementById('btn-more').addEventListener('click', showForecast);
document.getElementById('btn-start').addEventListener('click', countDown);
document.getElementById('btn-start').addEventListener('click', hideStartScreen);
document.getElementById('btn-start').addEventListener('click', openFullscreen);
document.getElementById('btn-start').addEventListener('click', animateCloseBtn);
document.getElementById('btn-changelog').addEventListener('click', toggleChangelog);

/* Nachfolgend ist der Eventlistener vom Finalscreen */
document.getElementById('btn-restart').addEventListener('click', function(){location.reload()});

/* Nachfolgend sind alle globalen Variablen aufgelistet */
var flag = true;
var timer = 30;
var posChangeTime = 1500;
var totalPointsCounter = 0;
var bugHitsCounter = 0;
var distLeft1;
var distTop1;
var distLeft2;
var distTop2;
var proxyForCors = 'https://cors-anywhere.herokuapp.com/';

/* Diese Funktion ist mit dem Countdown verknüpft und visualisiert durch einen Streifen am oberen Bildschirmrand die noch verbleibende Rundenzeit */
function changeTimeStripeLength() {
  var timestripelength = timer * (100 / 30);
  document.getElementById('timestripe').style.width = timestripelength + 'vw'; 
}

/* Diese Funktion zeigt mittig auf dem Bildschirm während der Spielrunde die aktuellen Trefferpunkte an */
function showHitpoints(pts) {
  var x = document.getElementById('pointsalert');
  x.style.display = 'block';
  x.innerHTML = pts;
  setTimeout(function(){x.style.display = 'none'}, 300);
}

/* Diese Funktion ändert jede Sekunde randomisiert die Farbe vom Zeitstreifen und wird durch die countDown-Funktion aufgerufen */
function randomizeColor() {
  var arrayCol = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ];

  var a = Math.floor((Math.random() * 16));
  var b = Math.floor((Math.random() * 16));
  var c = Math.floor((Math.random() * 16));
  var d = Math.floor((Math.random() * 16));
  var e = Math.floor((Math.random() * 16));
  var f = Math.floor((Math.random() * 16));

  document.getElementById('timestripe').style.backgroundColor = '#' + arrayCol[a] + arrayCol[b] + arrayCol[c] + arrayCol[d] + arrayCol[e] + arrayCol[f];
}

/* Eine Rekursive Funktion, die die Rundenzeit durch einen Countdown am oberen rechten Bildschirmrand steuert und anzeigt */
function countDown() {
  if (timer >= 0) {
  document.getElementById('countdown').innerHTML = timer + 's';
  timer--;
  changeTimeStripeLength();
  randomizeColor();
  setTimeout(countDown, 1000);
  };
}

/* Diese Funktion dient dazu, die Funktion zur Repositionierung der Insekten am Ende des Spiels zu stoppen */
function stop(){
  flag = false;
}

/* Diese Funktion repositioniert und verändert die Insekten-Zielobjekte */
function callPlacingFuncts() {
  if (flag){
  changePositionOfBug1();
  changePositionOfBug2();
  changeObj1();
  changeObj2();
  setTimeout(callPlacingFuncts, posChangeTime);
  }
}

/* Diese Funktion zeigt randomisiert bei jedem Neustart/Funktionsaufruf einen der (trockenen) Hintergründe an */
function changeBgImg() {
  var x = Math.floor(Math.random() * 8);
  document.getElementById('all').style.backgroundImage = 'url("img/bg/' + x + '.jpg")';
  document.getElementById('btn-weather-off').style.color = '#0f0';
  document.getElementById('btn-weather-on').style.color = '#fff';
}

/* Diese Funktion zeigt bei Aufruf einen der zwei Regenhintergründe an */
function selectWetBgImg() {
  var x = Math.floor(Math.random() * 2);
  document.getElementById('all').style.backgroundImage = 'url("img/bgw/' + x + '.jpg")';
  document.getElementById('btn-weather-on').style.color = '#0f0';
  document.getElementById('btn-weather-off').style.color = '#fff';
}

/* Diese Funktion zeigt bei Aufruf randomisiert eins von drei Insekten-Grafiken an */
function changeObj1() {
  var x = Math.floor(Math.random() * 12);
  var badinsect = document.getElementById('bug1');
  badinsect.style.backgroundImage = 'url("img/badbugs/' + x + '.png")';
}

/* Diese Funktion zeigt bei Aufruf den Marienkäfer an und kann mit weiteren Insektenbildern erweitert werden */
function changeObj2() {
  var x = Math.floor(Math.random() * 4);
  var goodinsect = document.getElementById('bug2');
  goodinsect.style.backgroundImage = 'url("img/goodbug/' + x + '.png")';
}

function hideStartScreen() {
  document.getElementById('startscreen').style.display = 'none';

    /* Diese Funktion bestimmt, was nach einer Runde von 30 Sekunden passiert */
    setTimeout(function(){
        stop();
        showFinalScore();
        storeFlyHits();
        changeEndImg();
        document.getElementById('finalscreen').style.display = 'block';
        showTotalFlyHits();
        trefferquote()
    }, 30000); /* Eine Spielrunde dauert 30 Sekunden */
}

function getChangelog() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  document.getElementById('changelogarea').innerHTML = this.responseText;
  }
};
xhr.open('GET', 'changelog.xml', true);
xhr.send();
}

function toggleChangelog() {
  var ca = document.getElementById('changelogarea');
  var cb = document.getElementById('btn-changelog');
  if (ca.style.display == 'block') {
      ca.style.display = 'none';
      cb.innerHTML = 'Zeige Änderungshistorie';
  } else {
      ca.style.display = 'block';
      cb.innerHTML = 'Verberge Änderungshistorie';
  }
}

/* Diese Funktion versetzt das Spiel beim Start in den Fullscreen-Modus */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
  elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
  elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
  elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
  elem.msRequestFullscreen();
  }
}

/* Knopf für das Beenden vom Fullscreen animieren (Fadeout und 'display none') */
function animateCloseBtn() {
  var x = document.getElementById('closefullscreen');
  x.style.animationName = 'fadeout';
  setTimeout(function(){x.style.display = 'none';}, 8000);
}

/* Diese Funktion ermöglicht via Mausklick das Verlassen vom Fullscreen-Modus */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  var x = document.getElementById('closefullscreen'); 
  x.style.display = 'none';
}

/* In dieser Funktion wird die Position der Fliege (das Treffen gibt jeweils einen Pluspunkt) randomisiert generiert */
function changePositionOfBug1() {
  distLeft1 = Math.floor(Math.random() * 81);
  distTop1 = Math.floor(Math.random() * 81);
  document.getElementById('bug1').style.left = distLeft1  + '%';
  document.getElementById('bug1').style.top = distTop1 + '%';
}

/* In dieser Funktion wird die Position des Marienkäfers (das Treffen gibt jeweils zwei Minuspunkte) randomisiert generiert */
function changePositionOfBug2() {
  distLeft2 = Math.floor(Math.random() * 81);
  distTop2 = Math.floor(Math.random() * 81);
  document.getElementById('bug2').style.left = distLeft2  + '%';
  document.getElementById('bug2').style.top = distTop2 + '%';
}

/* Diese Funktion erzeugt einen roten Blutfleck nach einem Treffer */
function createStain1() {
  var remain = document.createElement('DIV');
  remain.classList.add('stain1');
  remain.style.left = distLeft1  + '%';
  remain.style.top = distTop1 + '%';
  document.getElementById('all').appendChild(remain);
  showHitpoints('+1');
  document.getElementById('pointsalert').style.color = '#afa';
}

function addPointForBugHit() {
  bugHitsCounter++;
  document.getElementById('counter').innerHTML = ++totalPointsCounter;
}

/* Diese Funktion erzeugt einen grünen Blutfleck nach einem Treffer */
function createStain2() {
  var remain = document.createElement('DIV');
  remain.classList.add('stain2');
  remain.style.left = distLeft2  + '%';
  remain.style.top = distTop2 + '%';
  document.getElementById('all').appendChild(remain);
  showHitpoints('-2');
  document.getElementById('pointsalert').style.color = '#faa';
}

function subtractTwoPointsForBugHit() {
  totalPointsCounter = totalPointsCounter - 2;
  document.getElementById('counter').innerHTML = totalPointsCounter;
}

function storeFlyHits() {
  if (localStorage.totalbugs) {
    localStorage.totalbugs = Number(localStorage.totalbugs) + bugHitsCounter;
  } else {
    localStorage.totalbugs = bugHitsCounter;
  }
}

function showTotalFlyHits() {
  document.getElementById('result').innerHTML = bugHitsCounter + ' (' + localStorage.totalbugs + ' in all Deinen bisherigen Spielrunden zusammen)';
}

function subtractAndShowCounter() {
  document.getElementById('counter').innerHTML = --totalPointsCounter;

  showHitpoints('-1');
  document.getElementById('pointsalert').style.color = '#faa';
}

function showFinalScore() {
  document.getElementById('finalscore').innerHTML = totalPointsCounter;
}

function trefferquote() {
  var trefferquote = (totalPointsCounter / bugHitsCounter) * 100;
  if (trefferquote > 0) {
  document.getElementById('trefferquote').innerHTML = parseInt(trefferquote) + '%';
  } else {
    document.getElementById('trefferquote').innerHTML = '0%';
  }
}

function changeEndImg() {
  if (totalPointsCounter <= 0) {
    document.getElementById('endimg').src = 'img/blind.png';
    document.getElementById('endtext').innerHTML = 'Schade!';
    document.getElementById('motivation').innerHTML = 'Das kannst Du bestimmt besser!';
  }
}

/* in dieser Funktion wird HTML5 Geolocation verwendet (Prüfung auf Vorhandensein) - funktioniert aber nur lokal oder über HTTPS-Verbindungen */
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      setTimeout(function(){ document.getElementById('geo').style.display = 'block'; }, 3000);
    } else {
      document.getElementById('error').style.display = 'block';
      document.getElementById('error').innerHTML = 'Geolocation wird von Deinem Browser nicht unterstützt.';
    }
  }
  
/* falls Geolocation funktioniert, wird die Information an diese Funktion weitergeben und ausgeführt zur Ermittlung der Standort-Daten*/
function showPosition(position) {
    var positionLat = position.coords.latitude;
    var positionLong = position.coords.longitude;
    positionLatLong = positionLat + ',' + positionLong;
    document.getElementById('geo').innerHTML = '<span style="color:#afa;">Dein aktueller Standort <span id="nameoflocation"></span> konnte ermittelt werden und wird für die Tageswetterbestimmung verwendet:</span><br><a href="http://maps.google.com/?q=' + positionLatLong + '" target="_blank">Standort auf Google Maps überprüfen</a>';
    requestWeatherInfo(positionLatLong);
    convertLatLongIntoCityName(positionLatLong);
}

/* Diese Funktion steht zur Verfügung, wenn die automatische Geolocation nicht verwendet werden kann */
function selectCity() {
  var positionLatLongList = [
    '52.5250839,13.369',
    '53.083,8.8134',
    '51.5172511,7.4595',
    '51.0405029,13.7314191',
    '51.4296413,6.775',
    '51.2198279,6.7935',
    '50.9725082,11.0377',
    '51.4515,7.0135',
    '50.106529,8.662',
    '53.5529243,10.006',
    '52.3765186,9.741',
    '54.3152,10.13179',
    '50.9413,6.95817',
    '51.3447598,12.3812',
    '52.1306891,11.6266',
    '50.0013533,8.2587127',
    '51.4309658,6.886',
    '48.1402669,11.5578093',
    '49.446,11.0814',
    '52.3915582,13.0668',
    '49.2406424,6.99',
    '53.6343876,11.4075',
    '48.7835,9.1815',
    '50.0709448,8.243'
  ];
  var i = document.getElementById('locationselector').value;
    
  /* Auswahl im LocalStorage speichern - Information geht beim Schließen vom Tab nicht verloren */
    localStorage.positionLatLong = i;

  var positionLatLong = positionLatLongList[i];
  console.log(positionLatLong);
  requestWeatherInfo(positionLatLong);
  if (i !='') {
  document.getElementById('cstatus').style.display = 'block';
  document.getElementById('cerror').style.display = 'none';
  } else {
  document.getElementById('cerror').style.display = 'block';
  document.getElementById('cerror').innerHTML = 'Es wurde keine Stadt ausgewählt. Bitte eine Stadt auswählen.';
  }
}

function showForecast() {
  var x = document.getElementById('forecast');
  var btn = document.getElementById('btn-more');
  if (x.style.display == 'block') {
    x.style.display = 'none';
    btn.innerHTML = 'mehr Wetterdaten';
  } else {
    x.style.display = 'block';
    btn.innerHTML = 'mehr Wetterdaten verbergen';
  }
}

function requestWeatherInfo(posLaLo) {
  var xhr = new XMLHttpRequest();
  var myID = '8b57c54ba3389040f466c72a01465720/';
  xhr.open('GET', proxyForCors + 'https://api.darksky.net/forecast/' + myID + posLaLo + '?lang=de', true);
  xhr.send();

xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {  
    var myObj = JSON.parse(this.responseText);
    var cStatusEn = myObj.daily.data[0].precipType;
    var StatusDe = '';
    console.log(myObj);

    function wStatus(statusInput) {
    if (statusInput == 'rain') {
      StatusDe = 'Regen';
      selectWetBgImg();
      return StatusDe + ' <i class="fas fa-cloud-rain"></i>';
    } else if (!statusInput) {
      StatusDe = 'keinen Regen';
      changeBgImg();
      return StatusDe;
    } else {
      StatusDe = statusInput;
      return StatusDe;
    }
  }
  
    document.getElementById('cstatusinner').innerHTML =  wStatus(cStatusEn);
    document.getElementById('cstatus').style.display = 'block';
    var ctempInF = myObj.currently.temperature;

    function convertFtoC(input) {
    var tempInC = (input - 32) * 5 / 9;
    var tempInCRounded = Math.round(tempInC);
    return tempInCRounded;
    }
  
    var cStatusEn = myObj.daily.data[0].precipType;
    var tomorrowStatusEn = myObj.daily.data[1].precipType;
    var ctimeval = myObj.currently.time * 1000;
  
      function convertDatefromMs(timestamp) {
        var input = new Date(timestamp);
        var day = input.getDate();
        
        if (day < 10 ) {
        day = '0' + day;
        }
        
        var month = input.getMonth() + 1;
        if (month < 10 ) {
        month = '0' + month;
        }
        
        var year = input.getFullYear();
        var dateoutput = day + '.' + month + '.' + year;
        return dateoutput;
      }
  
      function convertTimefromMs(timestamp) {
        var input = new Date(timestamp);
        var minute = input.getMinutes();
        
        if (minute < 10 ) {
        minute = '0' + minute;
        }
        
        var hour = input.getHours();
        
        if (hour < 10 ) {
        hour = '0' + hour;
        }
        
        var timeoutput = hour + ':' + minute;
        return timeoutput;
      }
  
      var todayMinTempInF = myObj.daily.data[0].temperatureMin;
      var todayMaxTempInF = myObj.daily.data[0].temperatureMax;
      var todaysummary = myObj.daily.data[0].summary;
  
      var tomorrowTimeval = myObj.daily.data[1].time * 1000;
      var tomorrowMinTempInF = myObj.daily.data[1].temperatureMin;
      var tomorrowMaxTempInF = myObj.daily.data[1].temperatureMax;
      var tomorrowsummary = myObj.daily.data[1].summary;
  
      document.getElementById('ctime').innerHTML = convertTimefromMs(ctimeval) +' Uhr, '+ convertDatefromMs(ctimeval);
      document.getElementById('ctemp').innerHTML = 'Aktuelle Temperatur: ' + convertFtoC(ctempInF) + ' °C';
      document.getElementById('cstatus2').innerHTML = 'Aktueller Wetterstatus: ' + wStatus(cStatusEn);
      document.getElementById('mintemp0').innerHTML = 'Heutiges Temperatur-Minimum: '+ convertFtoC(todayMinTempInF) + ' °C';
      document.getElementById('maxtemp0').innerHTML = 'Heutiges Temperatur-Maximum: '+ convertFtoC(todayMaxTempInF) + ' °C';
      document.getElementById('todaysummary').innerHTML = 'Zusammenfassung: ' + todaysummary;
  
      document.getElementById('tomorrowtime').innerHTML = 'Wetter morgen: ' + convertDatefromMs(tomorrowTimeval);
      document.getElementById('mintemp1').innerHTML = 'Temperatur-Minimum morgen: '+ convertFtoC(tomorrowMinTempInF) + ' °C';
      document.getElementById('maxtemp1').innerHTML = 'Temperatur-Maximum morgen: '+ convertFtoC(tomorrowMaxTempInF) + ' °C';
      document.getElementById('tomorrowstatus').innerHTML = 'Wetterstatus morgen: ' + wStatus(tomorrowStatusEn);
      document.getElementById('tomorrowsummary').innerHTML = 'Zusammenfassung: ' + tomorrowsummary;  
      
      document.getElementById('urltodatasource').innerHTML = '<a href="https://darksky.net/forecast/' + posLaLo + '/ca12/de" target="_blank">Weitere Wetterdaten auf darksky.net</a>';
  
  }
};

}

/* Eine weitere Wetter-Api wird abgefragt, um die Positionsdaten in einen Standortnamen umzuwandeln */
function convertLatLongIntoCityName(posLaLo) {
  var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var output = JSON.parse(this.responseText);
    var cityOfUser = output[0].title;
    var urlid = output[0].woeid;
    if (cityOfUser == 'Cologne') {
      cityOfUser = 'Köln';
    }
    document.getElementById('nameoflocation').innerHTML = '<a href="https://www.metaweather.com/' + urlid + '" target="_blank">' + cityOfUser + '</a>';
  }
};
xhr.open('GET', proxyForCors + 'https://www.metaweather.com/api/location/search/?lattlong=' + posLaLo, true);
xhr.send();
}

/* Diese Funktion fügt die E-Mail-Adresse erst auf der Webseite nach Funktionsaufruf zusammen  - soll das automatische crawlen der E-Mail-Adresse durch Bots erschweren */
function assembleEmail(){
  var a = ['m','a','i','l','t','o',':','m','a','r','k','u','s','-','s','c','h','m','i','e','d','e','r','@','g','m','x','.','n','e','t']
  var z = '';
  for (var i = 0; i < a.length; i++) {
  z += a[i];
  }
  document.getElementById('m').href = z;
}

/* diese Funktion macht das Spiel einfacher indem der Marienkäfer als Ablenkung und Punkteabzugsquelle entfernt wird. Außerdem wird mit der Funktion das Styling vom Schwierigkeitsgrad-Auswahlknopf beeinflusst */
function makeEasy() {
  document.getElementById('bug2').style.display = 'none';
  document.getElementById('btn-easy').innerHTML = 'leicht aktiviert';
  document.getElementById('btn-normal').innerHTML = 'normal';
  document.getElementById('btn-easy').style.color = '#0f0';
  document.getElementById('btn-normal').style.color = '#fff';
  posChangeTime = 4000;
}

/* Diese Funktion mach den Marienkäfer wieder sichtbar, falls er durch die Auswahl der Schwierigkeitsstufe Leicht deaktiviert wurde. Außerdem wird das Styling des Auswahlknopfes beeinflusst */
function makeNormal() {
  document.getElementById('bug2').style.display = 'block';
  document.getElementById('btn-easy').innerHTML = 'leicht';
  document.getElementById('btn-normal').innerHTML = 'normal aktiviert';
  document.getElementById('btn-normal').style.color = '#0f0';
  document.getElementById('btn-easy').style.color = '#fff';
  posChangeTime = 1500;
}

function initPage() {
  
  var i = localStorage.positionLatLong;

  if(i != undefined) {
    document.getElementById('locationselector').value = i;
  }

  selectCity();

}
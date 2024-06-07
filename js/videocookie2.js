let videoID = location.search.split('i=')[1];

const playerInstance = jwplayer();

let cookieDays = 7;

let haveSeek = false;

let seekData = 0;



function setCookie(cname, cvalue) {

  var d = new Date();

  d.setTime(d.getTime() + (cookieDays*24*60*60*1000));

  var expires = "expires="+ d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}



function getCookie(cname) {

  var name = cname + "=";

  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(';');

  for(var i = 0; i <ca.length; i++) {

    var c = ca[i];

    while (c.charAt(0) == ' ') {

      c = c.substring(1);

    }

    if (c.indexOf(name) == 0) {

      return c.substring(name.length, c.length);

    }

  }

  return "";

}
function myTime(time) {
  var hr = ~~(time / 3600);
  var min = ~~((time % 3600) / 60);
  var sec = time % 60;
  var sec_min = "";
  if (hr > 0) {
     sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
  }
  sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
  sec_min += "" + sec;
  return sec_min+ " min";
}


window.onload = function(){

  let cookieData = getCookie(videoID)



  if(cookieData != ""){
    
      Swal.fire({

        title: "Deseja continuar o video de onde você parou?",
        width: 350,
        showCancelButton: true,
        
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Não',
        confirmButtonText: 'Sim',
        
       }).then((finished) => {

         if (finished.value) {
           
           haveSeek = true;
           jwplayer().play()

           seekData = cookieData;

           console.log(cookieData)

         }
         else{
          console.log(finished.value)
        }

       });    

   }



}





playerInstance.once('play', function(e) {

  if(haveSeek){

    jwplayer().seek(seekData)

    console.log(seekData)

  }

});



playerInstance.on('time', function(e) {

  setCookie(videoID,Math.floor(e.position))

});
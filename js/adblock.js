$(document).ready(function(){
    detectarBloqueador();
});

async function detectarBloqueador(){
    const bloqueadorActivo = await checkAdBlocker();
    if( bloqueadorActivo ){
        //alert("Adblocker detectado, desactiva o agrega nuestro sitio a excepciones para continuar :)");
        $("#aviso_blocker").css("display", "block");
    }
}

async function checkAdBlocker() {

    let bloqueador;

    async function tryRequest() {
        try {
           return fetch(
               new Request("../pagead2.googlesyndication.com/pagead/js/f.txt", {
                  method: 'HEAD',
                  mode: 'no-cors'
                }))
                .then(function(response) {
                  bloqueador = false;
                  return bloqueador;
                }).catch(function(e) {
                  bloqueador = true;
                  return bloqueador;
            });
        } catch (error) {
              console.log(error);
              bloqueador = true;
              return bloqueador;
        }
    }

    return bloqueador !== undefined ? bloqueador : await tryRequest();
}
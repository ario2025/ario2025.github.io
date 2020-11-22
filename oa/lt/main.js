
$(document).ready(function(){
    $("#conjuntoA").mask("99 99 99 99 99 99 99 99 99 99 99 99 99 99 99");
    $("#conjuntoB").mask("99 99 99 99 99 99 99 99 99 99 99 99 99 99 99");

    $("#conjuntoA").val( Cookies.get("conjuntoA") );

    if( $("#conjuntoA").val() == "" ){  $("#conjuntoA").val("01 02 03 04 05 06 07 08 09 10 11 12 13 14 15"); }
    $("#conjuntoB").val( Cookies.get("conjuntoB") );

    defineFocus();

    verificar();

  });

  var Cookies = {};
  Cookies.set = function(chave,valor) {
    var d = new Date();
    exdays = 10000;
    if(valor==""){exdays = -10000};
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = chave + "=" + valor + "; expires="+ expires + "; path=/";
  };
  Cookies.get = function(cname) {
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


  var verificar=function(element){
    if ( element!=undefined ) {
      Cookies.set(  $(element).attr("id"),  $(element).val()  );
    };

    defineFocus();
    $("#lenA").html(qteNumeros($("#conjuntoA").val()));
    $("#lenB").html(qteNumeros($("#conjuntoB").val()));
    var meunum = $("#conjuntoA").val().replace(/_/g,"");
    var conjuntoB = $("#conjuntoB").val().replace(/_/g,"");
    var numA = meunum.split(" ");
    var numB = conjuntoB.split(" ");
    numA.sort();
    numB.sort();
    var contemAmbos = [];
    for (var i=0;i<numA.length;i++){
      for (var x=0;x<numB.length;x++){
        if( numA[i] == numB[x] && numA[i] != "" ) {
          contemAmbos.push(numA[i]);
        };
      };
    };

    var final = "";
    final += "Conjunto A: " + numA.toString() + ", tamanho: " + qteNumeros(numA.toString()) + "\n";
    final += "Conjunto B: " + numB.toString() + ", tamanho: " + qteNumeros(numB.toString()) + "\n";
    final += "Contém em A e B: " + contemAmbos.toString() + ", tamanho: " + qteNumeros(contemAmbos.toString()) + "\n";

    var resultado = $("#resultado");
    resultado.val( final );

  };

  var qteNumeros=function(elemento) {
    return parseInt(elemento.replace(/_/g,"").replace(/,/g,"").replace(/ /g,"").length / 2);
  };   

  var defineFocus=function() {
    if(qteNumeros( $("#conjuntoA").val() ) == 15){
      $("#conjuntoB")[0].focus();
    }else{
      $("#conjuntoA")[0].focus();
    };
  };


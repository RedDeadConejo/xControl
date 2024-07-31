<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <script>
    function submitForm() {
      if (document.forms["rrhhForm"]["dni"].value == ""  ||document.forms["rrhhForm"]["gestor"].value == "" || document.forms["rrhhForm"]["comentarios"].value == "" || document.forms["rrhhForm"]["fechaIni"].value == document.forms["rrhhForm"]["fechaFin"].value){

      }
      else{
      google.script.run.SendToCode(document.getElementById("rrhhForm"));

      if (document.forms["rrhhForm"]["repetirCheck"].value != "Repetir")
      google.script.host.close();
      }
    }
    function repetirForm() {
      if (document.forms["rrhhForm"]["dni"].value == "" ||document.forms["rrhhForm"]["gestor"].value == "" || document.forms["rrhhForm"]["comentarios"].value == "" || document.forms["rrhhForm"]["fechaIni"].value == document.forms["rrhhForm"]["fechaFin"].value){

      }
      else{
      google.script.run.SendToCode(document.getElementById("rrhhForm"));
      }
    }
  </script>
</head>
<body>
  <div>
  <div id="form">
  <form id="rrhhForm">
    <!-- <label for="name">Nombre Completo</label><br>
    <input type="text" id="name" name="name"><br><br> -->

    <label for="dni">DNI</label><br>
    <input type="text" id="dni" name="dni"><br>

    <!-- <label for="ciudad">Ciudad</label><br> -->
    <!-- <input type="text" id="ciudad" name="ciudad" min="3"><br><br> -->

    <!--<select name="ciudad" id="ciudad">
    <option value="empty"></option>
    <option value="ABC">Albacete</option>
    <option value="ALC">Alicante</option>
    <option value="BJZ">Badajoz</option>
    <option value="BCN">Barcelona</option>
    <option value="RGS">Burgos</option>
    <option value="CCG">Caceres</option>
    <option value="QIJ">Gijon</option>
    <option value="LCG">La Coruña</option>
    <option value="LPA">Las Palmas GC</option>
    <option value="RJL">Logroño</option>
    <option value="MAD">Madrid</option>
    <option value="MLN">Melilla</option>
    <option value="PLC">Palencia</option>
    <option value="PNA">Pamplona</option>
    <option value="PSC">Plasencia</option>
    <option value="SLM">Salamanca</option>
    <option value="EAS">San Sebastian</option>
    <option value="SDR">Santander</option>
    <option value="SGV">Segovia</option>
    <option value="SVQ">Sevilla</option>
    <option value="TRG">Tarragona</option>
    <option value="TFN">Tenerife</option>
    <option value="TLD">Toledo</option>
    <option value="VLL">Valladolid</option>
    <option value="VLC">Valencia</option>
    <option value="ZAZ">Zaragoza</option>
    <option value="QWT"></option>
    </select><br>-->

    <br><label for="mail">¿Enviar Gmail?</label><br>
    <!--<input type="text" id="empleador" name="empleador" min="3"><br><br>-->
    <select name="mail" id="mail">
    <option value="No Enviar">No Enviar</option>
    <option value="vacaciones">Vacaciones</option>
    <option value="festivo">Permiso</option>
    <option value="asuntos">Asuntos</option>
    </select><br><br>

    <div id="diasS" style="display: none;">
    <label for="diasSolicitados">Dias Solicitados</label><br>
    <textarea type="text" id="diasSolicitados" name="diasSolicitados" rows="4" cols="25"></textarea><br><br>
    </div>

    <div id="festivosU" style="display: none;">
    <label for="festivosUsados">Festivos Usados</label><br>
    <textarea type="text" id="festivosUsados" name="festivosUsados" rows="4" cols="25"></textarea><br><br>
    </div>

    <script>
document.getElementById('mail').addEventListener('change', function() {
  var valorSeleccionado = this.value;
  var miTextbox1 = document.getElementById('diasS');
  var miTextbox2 = document.getElementById('festivosU');
  
  if (valorSeleccionado === 'festivo') {
    miTextbox1.style.display = 'block';
    miTextbox2.style.display = 'block';
  } else {
    miTextbox1.style.display = 'none';
    miTextbox2.style.display = 'none';
  }
});
</script>

    <label for="gestor">Gestor</label><br>
    <!--<input type="text" id="gestor" name="gestor" min="3"><br><br>-->
    <select name="gestor" id="gestor">
    <option value="Gestor 1">Gestor 1</option>
    <option value="Gestor 2">Gestor 2</option>
    <option value="Gestor 3">Gestor 3</option>
    </select><br>

    <br><label for="fechaIni">Fecha Inicio</label><br>
    <input type="Date" id="fechaIni" name="fechaIni" min="3"><br><br>

    <label for="fechaFin">Fecha Final</label><br>
    <input type="Date" id="fechaFin" name="fechaFin" min="3"><br><br>

    <label for="comentarios">Observaciones</label><br>
    <textarea type="text" id="comentarios" name="comentarios" rows="4" cols="25"></textarea><br><br>
    
    <input type="checkbox" id="repetirCheck" name="repetirCheck" value="Repetir">
    <label for="repetirCheck"> Repetir Formulario </label><br><br>

    <input type="button" style="color:red;" value="Cancelar" onclick="google.script.host.close();">
    <input type="button" style="color:green;" value="Enviar" onclick="submitForm();">
  </form>
  </div>
  </div>
</body>
</html>

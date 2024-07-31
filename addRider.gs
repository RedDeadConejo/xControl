<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <script>
    function submitForm() {
       if (document.forms["riderForm"]["dni"].value == "" || document.forms["riderForm"]["kendraID"].value == "" || document.forms["riderForm"]["name"].value == ""
        || document.forms["riderForm"]["surname"].value == "" || document.forms["riderForm"]["ciudad"].value == "" || document.forms["riderForm"]["horas"].value == ""
        || document.forms["riderForm"]["vehiculo"].value == "")
       {

       }
      else {
      google.script.run.AddRiderData(document.getElementById("riderForm"));
      google.script.host.close();
      }
    }
  </script>
</head>
<body>
  <div>
  <div id="form">
  <form id="riderForm">
    <label for="dni">DNI</label><br>
    <input type="text" id="dni" name="dni"><br><br>

    <label for="kendraID">Kendra ID</label><br>
    <input type="text" id="kendraID" name="kendraID"><br><br>

    <label for="name">Nombre</label><br>
    <input type="text" id="name" name="name"><br><br>

    <label for="surname">Apellidos</label><br>
    <input type="text" id="surname" name="surname"><br><br>
    
        
    <label for="ciudad">Ciudad</label><br>
    <select name="ciudad" id="ciudad">
    <option value="empty"></option>
    <option value="Albacete">Albacete</option>
    <option value="Badajoz">Badajoz</option>
    <option value="Barcelona">Barcelona</option>
    <option value="Burgos">Burgos</option>
    <option value="Caceres">Caceres</option>
    <option value="Gijon">Gijon</option>
    <option value="La Coruña">La Coruña</option>
    <option value="Lanzarote">Lanzarote</option>
    <option value="La Palma">La Palma</option>
    <option value="Las Palmas">Las Palmas</option>
    <option value="Logroño">Logroño</option>
    <option value="Madrid">Madrid</option>
    <option value="Manresa">Manresa</option>
    <option value="Melilla">Melilla</option>
    <option value="Oviedo">Oviedo</option>
    <option value="Palencia">Palencia</option>
    <option value="Pamplona">Pamplona</option>
    <option value="Plasencia">Plasencia</option>
    <option value="Ponferrada">Ponferrada</option>
    <option value="Salamanca">Salamanca</option>
    <option value="San Sebastian">San Sebastian</option>
    <option value="Santander">Santander</option>
    <option value="Segovia">Segovia</option>
    <option value="Sevilla">Sevilla</option>
    <option value="Tarragona">Tarragona</option>
    <option value="Talavera de la Reina">Talavera de la Reina</option>
    <option value="Tenerife">Tenerife</option>
    <option value="Toledo">Toledo</option>
    <option value="Tortosa">Tortosa</option>
    <option value="Tudela">Tudela</option>
    <option value="Valencia">Valencia</option>
    <option value="Valladolid">Valladolid</option>
    <option value="Vitoria">Vitoria</option>
    <option value="Zaragoza">Zaragoza</option>
    </select><br>

    <br><label for="horas">Horas</label><br>
    <select name="horas" id="horas">
    <option value="empty"></option>
    <option value="15">15</option>
    <option value="19">19</option>
    <option value="30">30</option>
    <option value="38">38</option>
    </select><br>

    <br><label for="estado">Estado</label><br>
    <select name="estado" id="estado">
    <option value="empty"></option>
    <option value="Disponible">Disponible</option>
    <option value="Despedido">Despedido</option>
    <option value="Vacaciones">Vacaciones</option>
    <option value="Baja">Baja</option>
    <option value="Otros">Otros</option>
    </select><br>

    <br><label for="vehiculo">Vehiculo</label><br>
    <select name="vehiculo" id="vehiculo">
    <option value="empty"></option>
    <option value="Moto">Moto</option>
    <option value="Bici">Bici</option>
    <option value="Vehiculo Eletrico">Vehiculo Eletrico</option>
    </select><br>

    <br><input type="button" style="color:red;" value="Cancelar" onclick="google.script.host.close();">
    <input type="button" style="color:green;" value="Enviar" onclick="submitForm();">
  </form>
  </div>
  </div>
</body>
</html>

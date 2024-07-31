function SendToSheet(_Dni, _Empleador, _Gestor, _FechaIni, _FechaFin, _Comentarios, _Mail, _DiasS, _FestivoS, _RepetirCheck){

//Crea un html vacio con unas dimensiones especificas.
var htmlOutput = HtmlService
.createHtmlOutput('')
.setWidth(250)
.setHeight(1);

//Si no esta activa la casilla 'Repetir', se activa el Panel.
if (_RepetirCheck != "Repetir")
SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Procesando Datos...")
else {
  SpreadsheetApp.getUi().alert("Informacion Enviada: Espera unos segundos antes de mandar mas formularios!");
}

//VARIABLES
 var settingID = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A2").getValue();
 var settingName = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A4").getValue();
 var riderSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_Dni);

 var spr = SpreadsheetApp.openById(settingID).getSheetByName(settingName);
 var data = spr.getRange('C:C').getValues(); //DNI
 var data2 = spr.getRange('B:B').getValues(); //Nombre
 var data3 = spr.getRange('F:F').getValues(); //Gestor

//Comprueba si en el cuadro queda filas libres para poder meter escribir, compronado si estan vacias las casillas del final en DNI, Nombre y Gestor.
  if(spr.getRange('C' + spr.getRange('C:C').getLastRow()).isBlank() && spr.getRange('B' + spr.getRange('B:B').getLastRow()).isBlank() && spr.getRange('F' + spr.getRange('F:F').getLastRow()).isBlank()){

//Inica que tiene que empezar a buscar desde la casilla 3 ya que las anteriores son irrelevantes.
    for (var i = 2; i < data.length; i++)
    {
      //Comprueba si al casilla selecciona esta vacia, si es asi, manda los datos para que sean escritos.
      if (data[i].toString() < 1 && data2[i].toString() < 1 && data3[i].toString() < 1){
        DataSend(riderSheet.getRange("C6").getValue() + " " + riderSheet.getRange("C7").getValue(), _Dni, riderSheet.getRange("C11").getValue(), _Empleador,_Gestor, _FechaIni +='T00:00:00.000Z', _FechaFin +='T00:00:00.000Z', _Comentarios, (i+1), spr, _Mail, _DiasS, _FestivoS, _RepetirCheck);
        break;
      }
    }
  }
  //Si no quedan casillas libres, insenta una nueva fila al final de todo y envia los tados para que sean escritos.
  else {
    spr.insertRowsAfter(spr.getRange('C:C').getLastRow(), 1)
    DataSend(_NombreCompleto, _Dni, _Ciudad, _Empleador,_Gestor, _FechaIni +='T00:00:00.000Z', _FechaFin +='T00:00:00.000Z', _Comentarios, spr.getRange('C:C').getLastRow(), spr, _Mail, _DiasS, _FestivoS, _Status, _RepetirCheck);
  }

}

//Se encarga de escribir la informacion proporciona en la hoja y fila indicados.
function DataSend(_NombreCompleto, _Dni, _Ciudad, _Empleador, _Gestor, _FechaIni, _FechaFin, _Comentarios, _Range , _Spr, _Mail, _DiasS, _FestivoS, _RepetirCheck){

      //Transforma los datos recividos en formato Date.
      var fechaIni = new Date(_FechaIni);
      var fechaFin = new Date(_FechaFin);

        //Reinicia las horas a 0, ya que no se necesitan.
        fechaIni.setHours(0,0,0);
        fechaFin.setHours(0,0,0);

        //Escribe la informacion en la Celda.
        _Spr.getRange('A' + _Range).setValue(Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy"));
        _Spr.getRange('A' + _Range).setHorizontalAlignment('right');
        _Spr.getRange('B' + _Range).setValue(_NombreCompleto);
        _Spr.getRange('C' + _Range).setValue(_Dni);
        _Spr.getRange('D' + _Range).setValue(_Ciudad);
        _Spr.getRange('E' + _Range).setValue(_Empleador);
        _Spr.getRange('F' + _Range).setValue(_Gestor);
        _Spr.getRange('G' + _Range).setValue(fechaIni);
        _Spr.getRange('H' + _Range).setValue(fechaFin);
        //_Spr.getRange('I' + _Range).setValue(Math.floor((fechaFin-fechaIni)/(24*3600*1000)));
        _Spr.getRange('K' + _Range).setValue(_Comentarios);

        //Ejecuta el proceso de enviar el Gmail Correspondiente.
        SendGmail(_Mail, _NombreCompleto, _Dni, _DiasS, _FechaIni, _FechaFin, _FestivoS);


        //Si la casilla repetir esta desactivada, muestra en pantalla un mensaje de completado.
        if (_RepetirCheck != "Repetir")
        SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile("SendAnotherRRHH.html").setWidth(220).setHeight(100), 'Furmulario Enviado!');
}


//Se encarga de mandar los mensajes predefinidos a recursos humanos cuando se ejecuta.
function SendGmail(_Mail, _NombreCompleto, _Dni, _DiasS, _FechaIni, _FechaFin, _FestivoS){
  var addressee = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A6").getValue();

  var permisoSms = "Permiso Retribuido - Festivo solicitado por <b>" + _NombreCompleto + "</b> <b>(" + _Dni + ")</b> para los dias <b>" + _DiasS + "</b> <br><br>Festivos Correspondientes a los dias <b> " + _FestivoS + "</b> <br><br><h6>Automated by xControlWeb</h6>";

  var vacacionesSms = "Vacaciones " + new Date().getFullYear() + " asignadas a <b>" + _NombreCompleto + "</b> <b>(" + _Dni + ")</b> para las fechas correspondientes entre el <b>" + Utilities.formatDate(new Date(_FechaIni), "GMT", "dd/MM/yyyy") + " y " + Utilities.formatDate(new Date(_FechaFin), "GMT", "dd/MM/yyyy") + "</b> <br><br><h6>Automated by xControlWeb</h6>";

  var asuntosSms = "Día de asuntos propios solicitados por <b>" + _NombreCompleto + "</b> <b>(" + _Dni + ")</b> para el día <b>" + _FechaIni + "</b> <br><br><h6>Automated by xControlWeb</h6>";

        switch(_Mail){
          default:
            break;
          case "festivo":
            MailApp.sendEmail({
            to: addressee,
            subject: `Permiso Retribuido - ${_NombreCompleto}`,
            htmlBody: permisoSms
            });
            break;

          case "vacaciones":
            MailApp.sendEmail({
            to: addressee,
            subject: `Vacaciones ${new Date().getFullYear()} ${_NombreCompleto}`,
            htmlBody: vacacionesSms
            });
            break;

          case "asuntos":
            //MailApp.sendEmail(addressee, `Asuntos Propios ${new Date().getFullYear()} ${_NombreCompleto}`, body);
            MailApp.sendEmail({
            to: addressee,
            subject: `Asuntos Propios ${new Date().getFullYear()} ${_NombreCompleto}`,
            htmlBody: asuntosSms
            });
            break;
        }
}

function GetRiderData(_Dni){

  var settingID = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A2").getValue();
  var settingName = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A4").getValue();
  var spr = SpreadsheetApp.openById(settingID).getSheetByName(settingName);

  var ui = SpreadsheetApp.getUi();

  var data = spr.getRange("C:C").getValues();

  for(var i = 0; i < data.length; i++){

    if (data[i] !=null && data[i].toString().toLowerCase() == _Dni.toLowerCase()){

      ui.showModalDialog()
    }
  }
}

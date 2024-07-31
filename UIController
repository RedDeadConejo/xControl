function AddRiderUI(){
 var htmlOutput = HtmlService.createHtmlOutputFromFile("AddRider.html").setWidth(250).setHeight(490);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Añadir Rider');
}

function AddRiderData(form){

  var ui = SpreadsheetApp.getUi();

  if(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(form.dni) == null){
          CreateSheet(form.name, form.surname, form.dni, form.kendraID, form.estado, form.horas,form.vehiculo, form.ciudad);

          var as = spreadsheet.setActiveSheet("Main");
          as.deleteRows(10);

        ui.showModalDialog(HtmlService.createHtmlOutputFromFile("SendAnotherRider.html").setWidth(150).setHeight(100), 'Raider Añadido: ' + form.name + " " + form.surname);
      }
      else {
        ui.showModalDialog(HtmlService.createHtmlOutputFromFile("SendAnotherRider.html").setWidth(150).setHeight(100), 'Este Rider Ya Esta Regristado!');
      }
}

function DelRiderUI(){

  var ui = SpreadsheetApp.getUi();
  var raiderDNI = ui.prompt('DNI Raider').getResponseText();

  if (raiderDNI.length > 0){

        /*var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));
        var row = sheet.getRange('B:B').getValues();
        for(var i = 0; i < row.length;i++){

          if(row[i].toString().toLowerCase() == raiderDNI.toLowerCase()){
          sheet.deleteRow(i +1);
          SpreadsheetApp.getActiveSpreadsheet().deleteSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(raiderDNI));
          ui.alert('Rider Eliminado!');
          }
        } */
    DelRider(raiderDNI);

  }
  else {
    ui.alert('No has introducido ningun dato!');
  }
}

function DisableButton() {
  var html = `
  <center><img src="https://i.imgur.com/4E5ykqn.png" width="250" height="280" /></center>
  `
  var htmlOutput = HtmlService
      .createHtmlOutput(html)
      .setWidth(350)
      .setHeight(300);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Temporalmente Desactivado');
}

function OpenRRHHUI(){
  var htmlOutput = HtmlService.createHtmlOutputFromFile("UIRRHH.html").setWidth(270).setHeight(570);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Formulario RRHH');
}

function SendToCode(form){

  //Comprueba que exista algun rider regristado con el dni introducido, si exitem regrista, si no, abre alerta.
  if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(form.dni) != null)

  SendToSheet(form.dni, "Delorean", form.gestor, form.fechaIni, form.fechaFin, form.comentarios, form.mail, form.diasSolicitados, form.festivosUsados, form.repetirCheck);

  else{
    SpreadsheetApp.getUi().alert("Rider no regristado en excel o DNI incorrecto!");
  }
}

function OpenRRHHSheet(){
 var settingID = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A2").getValue();
 var settingName = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A4").getValue();
 var spr = SpreadsheetApp.openById(settingID).getSheetByName(settingName);

openUrl("https://docs.google.com/spreadsheets/d/" + SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("A2").getValue() + "/edit#gid=" + spr.getSheetId());
}

function OpenKendraOnSheet(){
  openUrl("Employer Website URL" + SpreadsheetApp.getActiveSheet().getRange("C12").getValue());
}

//
function openUrl( url ){
  var html = HtmlService.createHtmlOutput('<html><script>'
  +'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
  +'var a = document.createElement("a"); a.href="'+url+'"; a.target="_blank";'
  +'if(document.createEvent){'
  +'  var event=document.createEvent("MouseEvents");'
  +'  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'                          
  +'  event.initEvent("click",true,true); a.dispatchEvent(event);'
  +'}else{ a.click() }'
  +'close();'
  +'</script>'
  // Offer URL as clickable link in case above code fails.
  +'<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically. <a href="'+url+'" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
  +'<script>google.script.host.setHeight(40);google.script.host.setWidth(410)</script>'
  +'</html>')
  .setWidth( 90 ).setHeight( 1 );
  SpreadsheetApp.getUi().showModalDialog( html, "Abriendo ..." );
}


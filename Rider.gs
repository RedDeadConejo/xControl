function CreateSheet(_rName, _rApellido, _rDNI, _rKendraID, _rEstado, _rContrato,_rVehiculo, _rCiudad) {

    CrearCelda();

  // get active spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      raiderName = _rName, //Introducir Nombre
      kendraID = _rKendraID, //Kendra ID
      raiderApellido = _rApellido, //Introducir Apellido
      raiderDNI = _rDNI, //Introducir DNI
      raiderEstado = _rEstado, //Introducir Estado
      raiderContrato = _rContrato, //Introducir Hora
      raiderVehiculo = _rVehiculo, //Introducir Vehiculo
      riderCiudad = _rCiudad; //Intrducir Ciudad

  //Establece las dos Hojas Principales.
  var main = ss.getSheetByName('Main');
  var templateSheet = ss.getSheetByName('Plantilla Rider');

  var valueShort = '= ' + "'" + raiderDNI + "'";

  //Crea la hoja del rider
  ss.setActiveSheet(templateSheet);
  var sheet = ss.duplicateActiveSheet();
  
  var celdaNumero = 9;

  //+++++++++++++++ Configuracion Hoja Repartidor +++++++++++++++
  
  //Nombre de la pagina
  sheet.setName(raiderDNI);

  //Raider DNI
  sheet.getRange('C5').activate().setValue(raiderDNI);

  //Rider Kendra ID
  sheet.getRange('C12').activate().setValue(kendraID);

  //Raider Name
  sheet.getRange('C6').activate().setValue(raiderName);

  //Raider Apellido
  sheet.getRange('C7').activate().setValue(raiderApellido);

  //Raider Vehiculo
  sheet.getRange('C8').activate().setValue(raiderVehiculo);

  //Raider Estado
  sheet.getRange('C9').activate().setValue(raiderEstado);

  //Raider Contrato
  sheet.getRange('C10').activate().setValue(raiderContrato);

  //Raider Ciudad
  sheet.getRange('C11').activate().setValue(riderCiudad);


 //+++++++++++++++ Configuracion Hoja Principal +++++++++++++++

  //Celda DNI
  main.getRange('B' + celdaNumero).activate().setValue(valueShort + ' !C5');

  //Celda Kendra ID
  main.getRange('C' + celdaNumero).activate().setValue(valueShort + ' !C12');

  //Celda Nombre + Apellido
  main.getRange('D' + celdaNumero).activate().setValue(valueShort + ' !C6 ' + '&' + '" "'+ "&" + "'" + raiderDNI + "'" + '!C7');

  //Celda Ciudad
  main.getRange('G' + celdaNumero).activate().setValue(valueShort + "!C11");

  //Celda Horas
  main.getRange('H' + celdaNumero).activate().setValue(valueShort + ' !C10');

  //Celda Estado
  main.getRange('I' + celdaNumero).activate().setValue(valueShort + ' !C9');

  //Celda Vehiculo
  main.getRange('J' + celdaNumero).activate().setValue(valueShort + ' !C8');

  //Celda CheckBox
  main.getRange('K' + celdaNumero).activate().setValue(valueShort + ' !E27');

  //Celda Boton
  var celdaBoton = main.getRange('L' + celdaNumero).activate();

  //Establece el texto horizontal en el medio y cambia el color del fonde a verde.
  celdaBoton.setHorizontalAlignment('center').setBackground('#93c47d');

  //Añade el texto especifico.
  celdaBoton.setValue("Ver");

  //Cambia la alineacion vertical en medio, pone el texto en negrita, el tamaño en 14
  celdaBoton.setVerticalAlignment('middle').setFontWeight('bold').setFontSize(14);

  var builder = celdaBoton.getRichTextValue().copy().setLinkUrl(`#gid=${ss.getSheetByName(sheet.getName()).getSheetId()}`);

  celdaBoton.setRichTextValue(builder.build());

  //Hide Sheet
  //ss.getSheetByName(sheet.getName()).hideSheet();
}

function CrearCelda() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('8:8').activate();
  spreadsheet.getActiveSheet().insertRowsAfter(spreadsheet.getRange('8:8').getLastRow(), 1);
  spreadsheet.getActiveRange().offset(spreadsheet.getActiveRange().getNumRows(), 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  spreadsheet.getRange('D9:F9').activate().mergeAcross();
  spreadsheet.getRange('B9:k9').activate().setBackground(null).setFontWeight('Normal').setFontSize(12);
  spreadsheet.getActiveRangeList().setBorder(true, true, true, true, true, true, '#8a93a1', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
};

function BuscarRider(){
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));
  var ridersData = ss.getRange('D:D').getValues();

  var input = ui.prompt("Introduce el Dni del Rider");

  if (input.getResponseText().length > 0)
  {
    if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(input.getResponseText()) != null){
      SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(input.getResponseText()));
    }
    else {
      for(var i = 8; i < ridersData.length; i++){
        if (ridersData[i].toString().toLowerCase().indexOf(input.getResponseText().toLowerCase()) != -1){
          ss.showRows((i+1));
        }
        else {
          ss.hideRow(ss.getRange("D" + (i+1)));
        }
      }
    }
  }
  else {
    ui.alert("No has introducido ningun dato!")
  }
}

function DelRider(dni){
        var ui = SpreadsheetApp.getUi();
        var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));
        var response = ui.alert('Aleta Confirmacion', '¿Seguro que quieres Elimnar a ' + dni + "?", ui.ButtonSet.YES_NO);
        var row = sheet.getRange('B:B').getValues()

      if (SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dni) != null){

        if (response == ui.Button.YES){
          for(var i = 0; i < row.length;i++){
          
            if(row[i].toString().toLowerCase() == dni.toLowerCase()){
              sheet.deleteRow(i +1);
              SpreadsheetApp.getActiveSpreadsheet().deleteSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dni));
              ui.alert('Rider Eliminado!');
            }
          }
        }  
      }
  else {
      ui.alert('Rider no encontrado! ' + dni);
    }
}

function HideRiderInTableWithCity(){
  var ui = SpreadsheetApp.getUi();

  var input = ui.prompt("Introduce la Ciudad (Dejar vacio para reiniciar)");
  
  var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));

  var row = sheet.getRange('G:G').getValues();

  if(input.getResponseText().length > 0)
  {
    for(var i = 8; i < row.length; i++){

      if(row[i] != input.getResponseText()){
        sheet.hideRow(sheet.getRange("F" + (i+1)));
      }
    }
  }
  else {
    for(var i = 8; i < row.length; i++){
      sheet.showRows((i+1));
    }
  } 
}

function HideRiderInTableWithHours(){
  var ui = SpreadsheetApp.getUi();

  var input = ui.prompt("Introduce la horas (Dejar vacio para reiniciar)");
  
  var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));

  var row = sheet.getRange('H:H').getValues();

  if(input.getResponseText().length > 0)
  {
    for(var i = 8; i < row.length; i++){

      if(row[i] != input.getResponseText()){
        sheet.hideRow(sheet.getRange("G" + (i+1)));
      }
    }
  }
  else {
    for(var i = 8; i < row.length; i++){
      sheet.showRows((i+1));
    }
  } 
}

function HideRiderInTableWithStatus(){
  var ui = SpreadsheetApp.getUi();

  var input = ui.prompt("Introduce el Estado (Dejar vacio para reiniciar)");
  
  var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));

  var row = sheet.getRange('H:H').getValues();

  if(input.getResponseText().length > 0)
  {
    for(var i = 8; i < row.length; i++){

      if(row[i] != input.getResponseText()){
        sheet.hideRow(sheet.getRange("H" + (i+1)));
      }
    }
  }
  else {
    for(var i = 8; i < row.length; i++){
      sheet.showRows((i+1));
    }
  } 
}

function HideRiderInTableWithVehicle(){
  var ui = SpreadsheetApp.getUi();

  var input = ui.prompt("Introduce el Vehiculo (Dejar vacio para reiniciar)");
  
  var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));

  var row = sheet.getRange('I:I').getValues();

  if(input.getResponseText().length > 0)
  {
    for(var i = 8; i < row.length; i++){

      if(row[i] != input.getResponseText()){
        sheet.hideRow(sheet.getRange("I" + (i+1)));
      }
    }
  }
  else {
    for(var i = 8; i < row.length; i++){
      sheet.showRows((i+1));
    }
  } 
}

function ResetEmployerTable(){
  var sheet = SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Main"));
  var row = sheet.getRange('G:G').getValues();

  for(var i = 8; i < row.length; i++){
      sheet.showRows((i+1));
  }
}

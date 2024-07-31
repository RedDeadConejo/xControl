function CrearHorario() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.insertRowsAfter(28,10);
  
  spreadsheet.getRange('C30').activate();
  spreadsheet.getRange('C19:E27').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  var dt = new Date(spreadsheet.getRange('E30').getValue());

  if (dt.getDate() + 1 < dt.getDate()){

     var month = dt.getMonth() + 1;

    dt.setDate(dt.getDate() + 1);
    dt.setMonth(month);
  }
  else {
    dt.setDate(dt.getDate() + 1);

    spreadsheet.getRange('D19').activate().setValue(dt);
  }
}

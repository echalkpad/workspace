Set objExcel = CreateObject("Excel.Application")
Set objWorkbook = objExcel.Workbooks.Open _
    ("e:\source.xlsx")
Set objWorksheet = objWorkbook.Worksheets(1)

Set objExcel_1 = CreateObject("Excel.Application")
Set objWorkbook_1 = objExcel_1.Workbooks.Open _
    ("e:\destination.xlsx")
Set objWorksheet_1 = objWorkbook_1.Worksheets(1)
objExcel_1.Visible = True
intRow = 1

Do Until objExcel.Cells(intRow,1).Value = ""
    Wscript.Echo "CN: " & objExcel.Cells(intRow, 1).Value
    objExcel_1.Cells(intRow, 2).Value = objExcel.Cells(intRow, 1).Value
    intRow = intRow + 1
Loop

objExcel.Quit
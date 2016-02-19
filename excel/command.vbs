Dim strFile

strFile = SelectFile( )

If strFile = "" Then 
    WScript.Echo "No file selected."
    WScript.Quit 1
Else
    WScript.Echo """" & strFile & """"
End If


Function SelectFile( )
    ' File Browser via HTA
    ' Author:   Rudi Degrande, modifications by Denis St-Pierre and Rob van der Woude
    ' Features: Works in Windows Vista and up (Should also work in XP).
    '           Fairly fast.
    '           All native code/controls (No 3rd party DLL/ XP DLL).
    ' Caveats:  Cannot define default starting folder.
    '           Uses last folder used with MSHTA.EXE stored in Binary in [HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32].
    '           Dialog title says "Choose file to upload".
    ' Source:   https://social.technet.microsoft.com/Forums/scriptcenter/en-US/a3b358e8-15ae-4ba3-bca5-ec349df65ef6/windows7-vbscript-open-file-dialog-box-fakepath?forum=ITCG

    Dim objExec, strMSHTA, wshShell

    SelectFile = ""

    ' For use in HTAs as well as "plain" VBScript:
    strMSHTA = "mshta.exe ""about:" & "<" & "input type=file id=FILE>" _
             & "<" & "script>FILE.click();new ActiveXObject('Scripting.FileSystemObject')" _
             & ".GetStandardStream(1).WriteLine(FILE.value);close();resizeTo(0,0);" & "<" & "/script>"""
    ' For use in "plain" VBScript only:
    ' strMSHTA = "mshta.exe ""about:<input type=file id=FILE>" _
    '          & "<script>FILE.click();new ActiveXObject('Scripting.FileSystemObject')" _
    '          & ".GetStandardStream(1).WriteLine(FILE.value);close();resizeTo(0,0);</script>"""

    Set wshShell = CreateObject( "WScript.Shell" )
    Set objExec = wshShell.Exec( strMSHTA )

    SelectFile = objExec.StdOut.ReadLine( )

    Set objExec = Nothing
    Set wshShell = Nothing
End Function

set fso = CreateObject("Scripting.FileSystemObject")
CurrentDirectory = fso.GetAbsolutePathName(".")
NewPath = fso.BuildPath(CurrentDirectory, "data.xlsx")
FormulaPath = fso.BuildPath(CurrentDirectory, "Formula.xlsx")
Set stdout = fso.GetStandardStream (1)

Set objExcel = CreateObject("Excel.Application")

Set objData = CreateObject("Excel.Application")
Set objDataWB = objData.Workbooks.Open(strFile)
Set objDataST = objData.Worksheets("Sheet1")
Set objFormula = CreateObject("Excel.Application")
set objFormulaWB = objData.Workbooks.Open(FormulaPath)
Set objFormulaST = objData.Worksheets("Sheet1")


stdout.WriteLine objDataST.cells(2,5).value
stdout.WriteLine objDataST.cells(2,2).value

modelYear = objDataST.cells(2,1).value & " " & objDataST.cells(2,2).value
delmonth = Split(objDataST.cells(2,5).value,".")


if (delmonth(0) = "01" or delmonth(0) = "1") then
	strmonth = "Jan"
	nxtmonth = "Feb"
elseif (delmonth(0) = "02" or delmonth(0) = "2") then
	strmonth = "Feb"
	nxtmonth = "Mar"
elseif (delmonth(0) = "03" or delmonth(0) = "3") then
	strmonth = "Mar"
	nxtmonth = "Apr"
elseif (delmonth(0) = "04" or delmonth(0) = "4") then
	strmonth = "Apr"
	nxtmonth = "May"
elseif (delmonth(0) = "05" or delmonth(0) = "5") then
	strmonth = "May"
	nxtmonth = "Jun"
elseif (delmonth(0) = "06" or delmonth(0) = "6") then
	strmonth = "Jun"
	nxtmonth = "Jul"
elseif (delmonth(0) = "07" or delmonth(0) = "7") then
	strmonth = "Jul"
	nxtmonth = "Sep"
elseif (delmonth(0) = "08" or delmonth(0) = "8") then
	strmonth = "Sep"
	nxtmonth = "Aug"
elseif (delmonth(0) = "09" or delmonth(0) = "9") then
	strmonth = "Aug"
	nxtmonth = "Oct"
elseif (delmonth(0) = "10" or delmonth(0) = "10") then
	strmonth = "Oct"
	nxtmonth = "Nov"
elseif (delmonth(0) = "11" or delmonth(0) = "11") then
	strmonth = "Nov"
	nxtmonth = "Dec"
elseif (delmonth(0) = "12" or delmonth(0) = "12") then
	strmonth = "Dec"
	nxtmonth = "Jan"
end if

'stdout.WriteLine strmonth


objExcel.DisplayAlerts = False

set objWorkBook = objExcel.Workbooks.Add
objWorkBook.Application.CutCopyMode = False
Set objWorkSheet= objWorkBook.Worksheets("Sheet1")
' Set Sheet Name
objWorkSheet.name = modelYear

' Set Sheet Header
objWorksheet.cells(1,1).value = modelYear
objWorksheet.cells(2,1).value = "N"
objWorksheet.cells(2,2).value = strmonth
objWorksheet.cells(3,1).value = "N+1"
objWorksheet.cells(3,2).value = nxtmonth
objWorksheet.cells(4,1).value = "Year"
objWorksheet.cells(4,2).value = "'" & objDataST.cells(2,2).value

objFormulaST.range("A5:AL5").Copy
objWorksheet.range("A5:AL5").Select
objWorksheet.Paste
objWorksheet.Activate

objFormulaST.range("A7:AL7").Copy
objWorksheet.range("A7:AL7").Select
objWorksheet.Paste
objWorksheet.Activate

objFormulaST.range("A8:AL8").Copy
objWorksheet.range("A8:AL8").Select
objWorksheet.Paste
objWorksheet.Activate

' Skip Header
i = 2
carType = 0
CurrentType = ""

while objDataST.cells(i,1).value <> ""
	

	if CurrentType <> objDataST.cells(i,3) then
		CurrentType = objDataST.cells(i,3).value
		stdout.WriteLine CurrentType
		carType = carType + 1
	end if
i = i + 1 

Wend

stdout.WriteLine i
stdout.WriteLine carType

objFormulaST.range("A9:AK9").Copy
objWorksheet.range("A9:AK9").Select
objWorksheet.Paste
objWorksheet.Activate
objWorksheet.Range("A9:AK9").Autofill objWorksheet.Range("A9:AK"&i+7),0

redim carModel(carType,4)

i = 2
carType = 0
CurrentType = ""
x = 1
stdout.WriteLine "Start Data Preparation Phase."
while objDataST.cells(i,1).value <> ""


	if CurrentType <> objDataST.cells(i,3) then
		if i <> 2 then
			carModel(x,1) = i
			stdout.WriteLine "carModel " & x & " :: " & i
			x = x + 1
		end if
		CurrentType = objDataST.cells(i,3).value
		stdout.WriteLine CurrentType
		carType = carType + 1
	end if
i = i + 1 

Wend
carModel(x,1) = i
stdout.WriteLine "carModel " & x & " :: " & i

stdout.WriteLine i
stdout.WriteLine carType

stdout.WriteLine "Start filling Data Object."
startpoint = 9
for z = 1 to carType
	for zz = 0 to carModel(z,1)-3
		stdout.Write "."
		objWorksheet.cells(9+zz,1).value = objDataST.cells(2+zz,3)
		objWorksheet.cells(9+zz,2).value = objDataST.cells(2+zz,4)
		objWorksheet.cells(9+zz,3).value = objDataST.cells(2+zz,6)
		objWorksheet.cells(9+zz,10).value = objDataST.cells(2+zz,8)
		objWorksheet.cells(9+zz,11).value = objDataST.cells(2+zz,9)
		objWorksheet.cells(9+zz,12).value = objDataST.cells(2+zz,10)
		objWorksheet.cells(9+zz,13).value = objDataST.cells(2+zz,11)
		objWorksheet.range("H"&9+zz).formula = "=SUM(D"&9+zz&":G"&9+zz&")"
		objWorksheet.range("N"&9+zz).formula = "=SUM(J"&9+zz&":M"&9+zz&")"
		objWorksheet.range("P"&9+zz).formula = "=(H"&9+zz&"-C"&9+zz&"-N"&9+zz&")"
		objWorksheet.range("S"&9+zz).formula = "=(Q"&9+zz&"+P"&9+zz&")"
		objWorksheet.range("X"&9+zz).formula = "=SUM(U"&9+zz&":W"&9+zz&")"
		objWorksheet.range("Z"&9+zz).formula = "=(X"&9+zz&"+S"&9+zz&")"
	next 
next
for z = 1 to carType
	if z = 1 then
		stdout.WriteLine ""
		stdout.WriteLine "startpoint :: " & startpoint
		stdout.Write "."
		objWorksheet.Range("A"&(carModel(z,1)-2+startpoint)).EntireRow.Insert
		objFormulaST.range("A9:AL9").Copy
		objWorksheet.range("A"&(carModel(z,1)-2+startpoint)&":AL"&(carModel(z,1)-2+startpoint)).Select
		objWorksheet.Paste
		objWorksheet.Activate

		objWorksheet.cells((carModel(z,1)-2+startpoint),1).value = objWorksheet.cells((carModel(z,1)-2+startpoint-1),1)
		objWorksheet.cells((carModel(z,1)-2+startpoint),2).value = "Total"
		objWorksheet.cells((carModel(z,1)-2+startpoint),3).formula = "=SUM(C"&startpoint&":C"&(carModel(z,1)-2+startpoint-1)&")"
		objWorksheet.cells((carModel(z,1)-2+startpoint),3).select
		objWorksheet.Range("C"&(carModel(z,1)-2+startpoint)).Autofill objWorksheet.Range("C"&(carModel(z,1)-2+startpoint)&":AK"&(carModel(z,1)-2+startpoint)),4
		objWorksheet.Range("AB"&(carModel(z,1)-2+startpoint)).value = ""
		objWorksheet.Range("AG"&(carModel(z,1)-2+startpoint)).value = ""
		startpoint = carModel(z,1)-2+startpoint+(1-z)+1

	else 
		stdout.WriteLine ""
		stdout.WriteLine "startpoint :: " & startpoint
		stdout.Write "."
		objWorksheet.Range("A"&(carModel(z,1)-carModel(z-1,1)+startpoint)).EntireRow.Insert
		objWorksheet.cells((carModel(z,1)-carModel(z-1,1)+startpoint),1).value = objWorksheet.cells((carModel(z,1)-carModel(z-1,1)+startpoint-1),1).value
		objWorksheet.cells((carModel(z,1)-carModel(z-1,1)+startpoint),2).value = "Total"
		objWorksheet.cells((carModel(z,1)-carModel(z-1,1)+startpoint),3).formula = "=SUM(C"&startpoint&":C"&(carModel(z,1)-carModel(z-1,1)+startpoint-1)&")"
		objWorksheet.cells((carModel(z,1)-carModel(z-1,1)+startpoint),3).select
		'objWorksheet.Range("C14").Autofill objWorksheet.Range("C14:AK14"), 0 
		objWorksheet.Range("C"&(carModel(z,1)-carModel(z-1,1)+startpoint)).Autofill objWorksheet.Range("C"&(carModel(z,1)-carModel(z-1,1)+startpoint)&":AK"&(carModel(z,1)-carModel(z-1,1)+startpoint)),4

		objWorksheet.Range("AB"&(carModel(z,1)-carModel(z-1,1)+startpoint)).value = ""
		objWorksheet.Range("AG"&(carModel(z,1)-carModel(z-1,1)+startpoint)).value = ""
 		startpoint = carModel(z,1)-carModel(z-1,1)+startpoint + 1
	end if
next
stdout.WriteLine ""
stdout.WriteLine "Endpoint :: " & startpoint
stdout.WriteLine ""
stdout.WriteLine "Start Calculate Total."
xlContinuous = 1
xlEdgeLeft = 7
xlEdgeRight = 10
xlEdgeTop = 8
xlEdgeBottom = 9
ix = carType - 3
for i = 9 to (startpoint+ix)
	stdout.Write "."
	if objWorksheet.cells(i,2).value = "Total" then
		stdout.WriteLine ""
		stdout.WriteLine "Total :: " & i

		objWorksheet.Range("A"&i+1).EntireRow.Insert -4121
		'objWorksheet.Range("A"&i+1).Autofill objWorksheet.Range("A"&i+1&":AK"&i+1),0
		objFormulaST.range("A32:AK32").Copy
		objWorksheet.range("A"&i+1&":AK"&i+1).Select
		objWorksheet.Paste
		objWorksheet.Activate


	else
		

	end if

next
stdout.WriteLine ""
stdout.WriteLine "Start filling Pattern"
objWorksheet.Range("AB8").Autofill objWorksheet.Range("AB8:AB"&i+10),0
objWorksheet.Range("AG8").Autofill objWorksheet.Range("AG8:AG"&i+10),0


formulastart = 9
stdout.WriteLine ""
stdout.WriteLine "Start filling Formula"
for z = 1 to carType
if z=1 then
	stdout.WriteLine ""
	stdout.WriteLine "Formula startpoint :: " & formulastart
	for yy = 0 to carModel(z,1)-2-1
		stdout.Write "."
		objWorksheet.range("I"&formulastart+yy).formula = "=H"&formulastart+yy&Chr(47)&"$H$"&formulastart-2+carModel(z,1)
		objWorksheet.range("R"&formulastart+yy).formula = "=Q"&formulastart+yy&Chr(47)&"$Q$"&formulastart-2+carModel(z,1)
		objWorksheet.range("O"&formulastart+yy).formula = "=N"&formulastart+yy&Chr(47)&"$N$"&formulastart-2+carModel(z,1)
		objWorksheet.range("T"&formulastart+yy).formula = "=S"&formulastart+yy&Chr(47)&"$S$"&formulastart-2+carModel(z,1)
		objWorksheet.range("Y"&formulastart+yy).formula = "=X"&formulastart+yy&Chr(47)&"$X$"&formulastart-2+carModel(z,1)
		objWorksheet.range("AA"&formulastart+yy).formula = "=Z"&formulastart+yy&Chr(47)&"$Z$"&formulastart-2+carModel(z,1)
		objWorksheet.range("AC"&formulastart+yy).formula = "=Round($AC$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AD"&formulastart+yy).formula = "=Round($AD$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AE"&formulastart+yy).formula = "=Round($AE$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AF"&formulastart+yy).formula = "=Round($AF$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AH"&formulastart+yy).formula = "=Round($AH$"&formulastart-1&"*AA"&formulastart+yy&",0)"
		objWorksheet.range("AI"&formulastart+yy).formula = "=Round($AI$"&formulastart-1&"*AA"&formulastart+yy&",0)"
		objWorksheet.range("AJ"&formulastart+yy).formula = "=Round($AJ$"&formulastart-1&"*AA"&formulastart+yy&",0)"
		objWorksheet.range("AK"&formulastart+yy).formula = "=Round($AK$"&formulastart-1&"*AA"&formulastart+yy&",0)"
	next
	formulastart = formulastart+carModel(z,1)-2+2
else
	stdout.WriteLine ""
	stdout.WriteLine "Formula startpoint :: " & formulastart
	for yy = 0 to carModel(z,1)-carModel(z-1,1)-1
		stdout.Write "."
		objWorksheet.range("I"&formulastart+yy).formula = "=H"&formulastart+yy&Chr(47)&"$H$"&formulastart+carModel(z,1)-carModel(z-1,1)
		objWorksheet.range("R"&formulastart+yy).formula = "=Q"&formulastart+yy&Chr(47)&"$Q$"&formulastart+carModel(z,1)-carModel(z-1,1)
		objWorksheet.range("O"&formulastart+yy).formula = "=N"&formulastart+yy&Chr(47)&"$N$"&formulastart+carModel(z,1)-carModel(z-1,1)
		objWorksheet.range("T"&formulastart+yy).formula = "=S"&formulastart+yy&Chr(47)&"$S$"&formulastart+carModel(z,1)-carModel(z-1,1)
		objWorksheet.range("Y"&formulastart+yy).formula = "=X"&formulastart+yy&Chr(47)&"$X$"&formulastart+carModel(z,1)-carModel(z-1,1)
		objWorksheet.range("AA"&formulastart+yy).formula = "=Z"&formulastart+yy&Chr(47)&"$Z$"&formulastart+carModel(z,1)-carModel(z-1,1)
		objWorksheet.range("AC"&formulastart+yy).formula = "=Round($AC$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AD"&formulastart+yy).formula = "=Round($AD$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AE"&formulastart+yy).formula = "=Round($AE$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AF"&formulastart+yy).formula = "=Round($AF$"&formulastart-1&"*O"&formulastart+yy&",0)"
		objWorksheet.range("AH"&formulastart+yy).formula = "=Round($AH$"&formulastart-1&"*AA"&formulastart+yy&",0)"
		objWorksheet.range("AI"&formulastart+yy).formula = "=Round($AI$"&formulastart-1&"*AA"&formulastart+yy&",0)"
		objWorksheet.range("AJ"&formulastart+yy).formula = "=Round($AJ$"&formulastart-1&"*AA"&formulastart+yy&",0)"
		objWorksheet.range("AK"&formulastart+yy).formula = "=Round($AK$"&formulastart-1&"*AA"&formulastart+yy&",0)"
	
	next
	formulastart = formulastart+carModel(z,1)-carModel(z-1,1)+2
end if
next
objExcel.Application.Visible = True
sortpoint = 9
stdout.WriteLine "Start Softing Process"
for q=1 to carType
	stdout.WriteLine ""
	stdout.WriteLine "SortPoint :: "&sortpoint
	if q=1 then
		stdout.WriteLine ""
		stdout.WriteLine "Range "&q&":: " & ("B"&sortpoint&":AK"&sortpoint+carModel(q,1)-3)
		Set objRange = objWorksheet.Range("B"&sortpoint&":AK"&sortpoint+carModel(q,1)-3)
		stdout.Write "."
	  	WScript.Sleep 2000 
	  	  
	 
	  	Set objRange2 = objWorksheet.Cells(sortpoint, 2) 
	  	objRange.Sort objRange2, 1, , , , , , 1 

	 	sortpoint = sortpoint+carModel(q,1)
 	else
 		stdout.WriteLine ""
 		stdout.WriteLine "Range "&q&":: "&  ("B"&sortpoint&":AK"&sortpoint+carModel(q,1)-carModel(q-1,1)-1)
 		Set objRange = objWorksheet.Range("B"&sortpoint&":AK"&sortpoint+carModel(q,1)-carModel(q-1,1)-1)
 		stdout.Write "."
	  	WScript.Sleep 2000 
	  	
	  	Set objRange2 = objWorksheet.Range("B"&sortpoint)
	  	objRange.Sort objRange2, 1, , , , , , 1 

	 	sortpoint = sortpoint+carModel(q,1)-carModel(q-1,1)+2
 	end if
	 
		 
next


stdout.WriteLine ""
stdout.WriteLine "Start Clean up Process"

for i = 9 to (startpoint+carType)
	stdout.Write "."
	if objWorksheet.Range("A"&i).value = "SMT" then
		objWorksheet.Range("A"&i).entirerow.delete
	end if
next
stdout.WriteLine ""
stdout.WriteLine "Open Excel application"



stdout.WriteLine "Close required Object"

objFormulaWB.Close
objFormula.Application.Quit
set objFormulaST = Nothing
set objFormulaWB = Nothing
set objFormula = Nothing



objData.ActiveWorkbook.Close
objData.Application.Quit
set objDataST = Nothing
set objDataWB = Nothing
set objData = Nothing

stdout.WriteLine "Done"
' ******************************************************************************
' Project Belapokhori-Nexus: Parametric Structural Assembly Generator
' Component: Kinematic Ghatiyantra Multi-Pot Wheel Assembly Module
' Environment Target: SolidWorks Native API Automation Engine
' ******************************************************************************

Dim swApp As Object
Dim swModel As Object
Dim swSketchMgr As Object
Dim swModelDocExt As Object
Dim boolStatus As Boolean

Sub main()

    ' 1. Establish structural interface loop to running system workspace
    Set swApp = Application.SldWorks
    Set swModel = swApp.ActiveDoc
    
    If swModel Is Nothing Then
        MsgBox "Please boot into a valid Active Part space configuration before executing this logic script.", vbCritical, "SolidWorks Link Interrupted"
        Exit Sub
    End If
    
    Set swSketchMgr = swModel.SketchManager
    Set swModelDocExt = swModel.Extension
    swModel.ClearSelection2 True
    
    ' 2. Focus baseline sketch frame logic onto Front Plane coordinates
    boolStatus = swModelDocExt.SelectByID2("Front Plane", "PLANE", 0, 0, 0, False, 0, Nothing, 0)
    swSketchMgr.InsertSketch True
    
    ' 3. SYSTEM CONSTANTS DECLARATION (Parametric Configuration Variables)
    Dim PI As Double
    PI = 4 * Atn(1)
    
    Dim WheelRadius As Double
    WheelRadius = 0.360 ' Calibrated 360mm parameter scale vector limits
    
    Dim TotalPots As Integer
    TotalPots = 12
    
    Dim PotRadius As Double
    PotRadius = 0.030 ' 30mm water catchment volume perimeter limits
    
    ' 4. Draw Forged Axle Center Point References
    ' Parameters mapping: Center X, Y, Z, Perimeter Boundary X, Y, Z
    Dim skAxleCircle As Object
    Set skAxleCircle = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.025, 0#, 0#) ' Central axle shaft
    
    Dim skHubInterface As Object
    Set skHubInterface = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.08, 0#, 0#)  ' Main torque distribution hub
    
    ' 5. Loop for Parametric Spoke and Pot Array Generation
    Dim index As Integer
    Dim theta As Double
    Dim xTerminal As Double
    Dim yTerminal As Double
    
    For index = 0 To (TotalPots - 1)
        theta = (index / TotalPots) * 2 * PI
        
        ' Compute distinct absolute node termination targets
        xTerminal = WheelRadius * Cos(theta)
        yTerminal = WheelRadius * Sin(theta)
        
        ' Draw mechanical connecting spokes lines
        Dim skSpokeLine As Object
        Set skSpokeLine = swSketchMgr.CreateLine(0#, 0#, 0#, xTerminal, yTerminal, 0#)
        
        ' Attach the monolithic catchment bucket primitives to the outer array links
        Dim skPotCircle As Object
        Set skPotCircle = swSketchMgr.CreateCircle(xTerminal, yTerminal, 0#, (xTerminal + PotRadius), yTerminal, 0#)
    Next index
    
    ' 6. Commit geometry matrices and trigger 3D rendering updates
    swSketchMgr.InsertSketch True
    swModel.ForceRebuild3 True
    
    MsgBox "Parametric Ghatiyantra configuration sketch generated successfully.", vbInformation, "System Complete"

End Sub

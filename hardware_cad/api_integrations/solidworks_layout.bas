' ******************************************************************************
' Project Belapokhori-Nexus: Parametric Assembly Structural Configurator
' Component: High-Speed Alternator & Gearbox Housing Interface Layout
' Target Environment: SolidWorks Standalone API Macro System
' ******************************************************************************

Dim swApp As Object
Dim swModel As Object
Dim swSketchMgr As Object
Dim swModelDocExt As Object
Dim alignmentStatus As Boolean

Sub main()

    ' Bind direct layout interface loop to active running instance of SolidWorks
    Set swApp = Application.SldWorks
    Set swModel = swApp.ActiveDoc
    
    ' Safeguard tracking check to prevent execution outside an active part workspace
    If swModel Is Nothing Then
        MsgBox "Active SolidWorks part document model framework not discovered. Open target part file.", vbCritical, "API Link Aborted"
        Exit Sub
    End If
    
    Set swSketchMgr = swModel.SketchManager
    Set swModelDocExt = swModel.Extension
    
    ' Clear active selection layers stack to avoid alignment overlaps
    swModel.ClearSelection2 True
    
    ' 1. Focus active execution grid layout directly onto the Front Plane baseline
    alignmentStatus = swModelDocExt.SelectByID2("Front Plane", "PLANE", 0, 0, 0, False, 0, Nothing, 0)
    
    ' Open active sketch context mode inside the feature manager design tree
    swSketchMgr.InsertSketch True
    
    ' 2. Sketch structural boundary line for 50mm power shaft core (0.025m radius)
    Dim skShaftCore As Object
    Set skShaftCore = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.025, 0#, 0#)
    
    ' 3. Sketch structural box parameters for Step-Up Gear Casing (220mm square matrix)
    swSketchMgr.CreateCenterRectangle 0#, 0#, 0#, 0.11, 0.11, 0#
    
    ' 4. Sketch alignment circle for High-Speed Alternator Stator Mount (240mm limit)
    Dim skAlternatorMount As Object
    Set skAlternatorMount = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.12, 0#, 0#)
    
    ' Close active sketch context to write geometry parameters to modeling list
    swSketchMgr.InsertSketch True
    
    ' Force master parametric update loop pass across 3D rendering pipeline
    swModel.ForceRebuild3 True

End Sub

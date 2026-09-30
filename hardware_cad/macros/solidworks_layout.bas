' ******************************************************************************
' Project Belapokhori-Nexus: Parametric Assembly Alignment Blueprint Engine
' Component: High-Speed Alternator & Gearbox Casing Construction Layer
' Environment Target: SolidWorks Standalone API Macro System
' ******************************************************************************

Dim swApp As Object
Dim swModel As Object
Dim swSketchMgr As Object
Dim swModelDocExt As Object
Dim alignmentStatus As Boolean

Sub main()

    ' Bind to active running instance of SolidWorks application
    Set swApp = Application.SldWorks
    Set swModel = swApp.ActiveDoc
    
    ' Safeguard against executing macro outside an open model container context
    If swModel Is Nothing Then
        MsgBox "Active SolidWorks part workspace context not discovered. Open target part file.", vbCritical, "API Link Interrupted"
        Exit Sub
    End If
    
    Set swSketchMgr = swModel.SketchManager
    Set swModelDocExt = swModel.Extension
    
    ' Wash the active selection stack clean to reset geometry pipeline limits
    swModel.ClearSelection2 True
    
    ' 1. Focus active execution matrix directly onto the Front Plane baseline
    alignmentStatus = swModelDocExt.SelectByID2("Front Plane", "PLANE", 0, 0, 0, False, 0, Nothing, 0)
    
    ' Open active sketch context mode inside the feature manager tree
    swSketchMgr.InsertSketch True
    
    ' 2. Layout structural perimeter boundary for the 50mm power shaft core (0.025m radius)
    Dim skShaftCore As Object
    Set skShaftCore = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.025, 0#, 0#)
    
    ' 3. Layout bounding reference matrix for the Step-Up Gear Casing (220mm square configuration)
    swSketchMgr.CreateCenterRectangle 0#, 0#, 0#, 0.11, 0.11, 0#
    
    ' 4. Layout parameter spacing for the High-Speed Electromagnetic Alternator Stator (240mm limit)
    Dim skAlternatorMount As Object
    Set skAlternatorMount = swSketchMgr.CreateCircle(0#, 0#, 0#, 0.12, 0#, 0#)
    
    ' Close sketch context to commit parametric vector arrays to the physical modeling list
    swSketchMgr.InsertSketch True
    
    ' Force master parametric update pass across the 3D rendering pipeline
    swModel.ForceRebuild3 True

End Sub

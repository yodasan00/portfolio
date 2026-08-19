Add-Type -Path "d:\portfolio\scripts\ProcessUpdatedWalkUpAndIdle.cs" -ReferencedAssemblies System.Drawing

$baseUpload = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded"
$outDir = "d:\portfolio\src\assets\images\game"

$upSrc = "$baseUpload\media_1787179152669.png"
$idleSrc = "$baseUpload\media_1787179298065.png"

Write-Host "Compiling updated Walk Up..."
[Portfolio.WalkUpAndIdleProcessor]::BuildWalkUpSheet($upSrc, "$outDir\walkUpAnim-Sheet.png", 105, 115)

Write-Host "Compiling updated Idle..."
[Portfolio.WalkUpAndIdleProcessor]::BuildIdleSheet($idleSrc, "$outDir\idleAnim-Sheet.png", 105, 115)

Write-Host "WalkUp and Idle updated successfully!"

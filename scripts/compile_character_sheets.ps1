Add-Type -Path "d:\portfolio\scripts\SpriteSheetBuilder.cs" -ReferencedAssemblies System.Drawing

$baseUpload = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded"
$outDir = "d:\portfolio\src\assets\images\game"

$upSrc = "$baseUpload\media_1787178640084.png"
$downSrc = "$baseUpload\media_1787178657049.jpg"
$leftSrc = "$baseUpload\media_1787178669791.jpg"
$rightSrc = "$baseUpload\media_1787178678786.jpg"

Write-Host "Compiling Walk Up..."
[Portfolio.SpriteSheetBuilder]::BuildSheet($upSrc, "$outDir\walkUpAnim-Sheet.png", 105, 115)

Write-Host "Compiling Walk Down..."
[Portfolio.SpriteSheetBuilder]::BuildSheet($downSrc, "$outDir\walkDownAnim-Sheet.png", 105, 115)

Write-Host "Compiling Walk Left..."
[Portfolio.SpriteSheetBuilder]::BuildSheet($leftSrc, "$outDir\walkLeftAnim-Sheet.png", 105, 115)

Write-Host "Compiling Walk Right..."
[Portfolio.SpriteSheetBuilder]::BuildSheet($rightSrc, "$outDir\walkRightAnim-Sheet.png", 105, 115)

Write-Host "Compiling Idle..."
[Portfolio.SpriteSheetBuilder]::BuildSheet($downSrc, "$outDir\idleAnim-Sheet.png", 105, 115)

# Clean up outdated webp sheets
$webps = @(
    "$outDir\walkUpAnim-Sheet.webp",
    "$outDir\walkDownAnim-Sheet.webp",
    "$outDir\walkLeftAnim-Sheet.webp",
    "$outDir\walkRightAnim-Sheet.webp",
    "$outDir\idleAnim-Sheet.webp"
)
foreach ($w in $webps) {
    if (Test-Path $w) {
        Remove-Item -Path $w -Force
        Write-Host "Removed $w"
    }
}

Write-Host "All sprite sheets successfully compiled and installed!"

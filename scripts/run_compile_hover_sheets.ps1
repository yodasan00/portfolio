Add-Type -Path "d:\portfolio\scripts\CompileMenuHoverSheets.cs" -ReferencedAssemblies System.Drawing

$inputImg = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787179332148.png"
$outDir = "d:\portfolio\src\assets\images\game"

[Portfolio.MenuHoverSheetCompiler]::Process($inputImg, $outDir)

# Ensure no stale webp files
$webps = @(
    "$outDir\mew2-Sheet.webp",
    "$outDir\paper2-Sheet.webp",
    "$outDir\computer2-Sheet.webp",
    "$outDir\videoGame2-Sheet.webp"
)
foreach ($w in $webps) {
    if (Test-Path $w) {
        Remove-Item -Path $w -Force
        Write-Host "Removed $w"
    }
}

Write-Host "Animated hover sprite sheets compiled successfully!"

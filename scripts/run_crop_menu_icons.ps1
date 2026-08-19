Add-Type -Path "d:\portfolio\scripts\CropMenuIcons.cs" -ReferencedAssemblies System.Drawing

$inputImg = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787179080332.png"
$outDir = "d:\portfolio\src\assets\images\game"

[Portfolio.MenuIconsCropper]::Process($inputImg, $outDir)

# Delete obsolete webp versions
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

Write-Host "Menu icons processed and installed successfully!"

Add-Type -AssemblyName System.Drawing

$src = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787179774786.jpg"
$destPng = "d:\portfolio\src\assets\icons\me-with-cat.png"

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$bmp.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$webp = "d:\portfolio\src\assets\icons\me-with-cat.webp"
if (Test-Path $webp) {
    Remove-Item -Path $webp -Force
    Write-Host "Removed stale $webp"
}

Write-Host "Updated PC view avatar image at $destPng successfully!"

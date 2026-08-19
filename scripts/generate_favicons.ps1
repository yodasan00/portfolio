Add-Type -AssemblyName System.Drawing

$src = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787179774786.jpg"
$orig = [System.Drawing.Bitmap]::FromFile($src)

function Resize-Image($source, $width, $height, $destPath) {
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
    $g.DrawImage($source, 0, 0, $width, $height)
    $g.Dispose()
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated $destPath ($width x $height)"
}

$favDir = "d:\portfolio\public\favicon_io"
Resize-Image $orig 16 16 "$favDir\favicon-16x16.png"
Resize-Image $orig 32 32 "$favDir\favicon-32x32.png"
Resize-Image $orig 180 180 "$favDir\apple-touch-icon.png"
Resize-Image $orig 192 192 "$favDir\android-chrome-192x192.png"
Resize-Image $orig 192 192 "$favDir\favicon-192x192.png"
Resize-Image $orig 512 512 "$favDir\android-chrome-512x512.png"

# Save favicon.ico
$icoBmp = New-Object System.Drawing.Bitmap(32, 32)
$gIco = [System.Drawing.Graphics]::FromImage($icoBmp)
$gIco.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$gIco.DrawImage($orig, 0, 0, 32, 32)
$gIco.Dispose()
$hIcon = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = [System.IO.File]::OpenWrite("$favDir\favicon.ico")
$icon.Save($fs)
$fs.Close()
$icoBmp.Dispose()

$orig.Dispose()
Write-Host "All favicons generated successfully!"

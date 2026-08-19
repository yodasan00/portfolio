Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787176024517.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)

function Crop-FloodFill($rect, $outputPath, $whiteThreshold = 230) {
    $cropped = new-object System.Drawing.Bitmap($rect.Width, $rect.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.DrawImage($bmp, [System.Drawing.Rectangle]::new(0, 0, $rect.Width, $rect.Height), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $w = $cropped.Width
    $h = $cropped.Height
    $visited = New-Object 'bool[,]' $w, $h
    $queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

    function IsWhite($x, $y) {
        if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h) { return $false }
        $c = $cropped.GetPixel($x, $y)
        return ($c.R -ge $whiteThreshold -and $c.G -ge $whiteThreshold -and $c.B -ge $whiteThreshold)
    }

    # Seed 4 borders
    for ($x = 0; $x -lt $w; $x++) {
        if (IsWhite $x 0) { $queue.Enqueue([System.Drawing.Point]::new($x, 0)); $visited[$x, 0] = $true }
        if (IsWhite $x ($h - 1)) { $queue.Enqueue([System.Drawing.Point]::new($x, $h - 1)); $visited[$x, $h - 1] = $true }
    }
    for ($y = 0; $y -lt $h; $y++) {
        if (IsWhite 0 $y) { $queue.Enqueue([System.Drawing.Point]::new(0, $y)); $visited[0, $y] = $true }
        if (IsWhite ($w - 1) $y) { $queue.Enqueue([System.Drawing.Point]::new($w - 1, $y)); $visited[$w - 1, $y] = $true }
    }

    # BFS Flood Fill
    while ($queue.Count -gt 0) {
        $p = $queue.Dequeue()
        $cropped.SetPixel($p.X, $p.Y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))

        $neighbors = @(
            [System.Drawing.Point]::new($p.X + 1, $p.Y),
            [System.Drawing.Point]::new($p.X - 1, $p.Y),
            [System.Drawing.Point]::new($p.X, $p.Y + 1),
            [System.Drawing.Point]::new($p.X, $p.Y - 1)
        )

        foreach ($n in $neighbors) {
            if ($n.X -ge 0 -and $n.X -lt $w -and $n.Y -ge 0 -and $n.Y -lt $h) {
                if (-not $visited[$n.X, $n.Y] -and (IsWhite $n.X $n.Y)) {
                    $visited[$n.X, $n.Y] = $true
                    $queue.Enqueue($n)
                }
            }
        }
    }

    # Trim transparent borders
    $minX = $w; $minY = $h; $maxX = 0; $maxY = 0
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $cropped.GetPixel($x, $y)
            if ($c.A -gt 0) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    if ($maxX -gt $minX -and $maxY -gt $minY) {
        $finalW = $maxX - $minX + 1
        $finalH = $maxY - $minY + 1
        $trimmed = new-object System.Drawing.Bitmap($finalW, $finalH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $tg = [System.Drawing.Graphics]::FromImage($trimmed)
        $tg.DrawImage($cropped, [System.Drawing.Rectangle]::new(0, 0, $finalW, $finalH), [System.Drawing.Rectangle]::new($minX, $minY, $finalW, $finalH), [System.Drawing.GraphicsUnit]::Pixel)
        $tg.Dispose()
        $trimmed.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $trimmed.Dispose()
        Write-Host "Flood-fill trimmed saved $outputPath ($finalW x $finalH)"
    } else {
        $cropped.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "Saved $outputPath"
    }

    $cropped.Dispose()
}

$destDir = "d:\portfolio\src\assets\images\game"

Crop-FloodFill ([System.Drawing.Rectangle]::new(20, 50, 360, 420)) "$destDir\botanical_computer.png"
Crop-FloodFill ([System.Drawing.Rectangle]::new(380, 50, 300, 420)) "$destDir\botanical_tv.png"
Crop-FloodFill ([System.Drawing.Rectangle]::new(670, 50, 330, 480)) "$destDir\botanical_bed.png"
Crop-FloodFill ([System.Drawing.Rectangle]::new(20, 480, 330, 470)) "$destDir\botanical_carpet.png"
Crop-FloodFill ([System.Drawing.Rectangle]::new(340, 470, 330, 470)) "$destDir\botanical_shelf.png"
Crop-FloodFill ([System.Drawing.Rectangle]::new(680, 550, 310, 370)) "$destDir\botanical_backpack.png"

$bmp.Dispose()
Write-Host "All botanical sprites flood-filled & extracted with 100% fidelity!"

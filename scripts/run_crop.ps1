Add-Type -Path "d:\portfolio\scripts\CropHelper.cs" -ReferencedAssemblies System.Drawing

$src = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787176024517.jpg"
$dest = "d:\portfolio\src\assets\images\game"

# 1. Computer Desk
[Portfolio.SpriteCropper]::CropAndFloodFill($src, 20, 50, 360, 420, "$dest\botanical_computer.png", 230)

# 2. TV Console
[Portfolio.SpriteCropper]::CropAndFloodFill($src, 380, 50, 300, 420, "$dest\botanical_tv.png", 230)

# 3. Bed
[Portfolio.SpriteCropper]::CropAndFloodFill($src, 670, 50, 330, 480, "$dest\botanical_bed.png", 230)

# 4. Rug
[Portfolio.SpriteCropper]::CropAndFloodFill($src, 20, 480, 330, 470, "$dest\botanical_carpet.png", 230)

# 5. Plant Shelf
[Portfolio.SpriteCropper]::CropAndFloodFill($src, 340, 470, 330, 470, "$dest\botanical_shelf.png", 230)

# 6. Backpack
[Portfolio.SpriteCropper]::CropAndFloodFill($src, 680, 550, 310, 370, "$dest\botanical_backpack.png", 230)

Write-Host "All botanical sprites extracted with perfect transparent backgrounds!"

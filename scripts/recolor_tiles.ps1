Add-Type -Path "d:\portfolio\scripts\RecolorTiles.cs" -ReferencedAssemblies System.Drawing

[Portfolio.TileRecolorer]::ProcessFiles("d:\portfolio\src\assets\images\game")

Write-Host "Tile recoloring complete!"

$gamesDir = "d:\portfolio\src\content\games"

# Clear existing game files
Get-ChildItem -Path $gamesDir -Filter "*.md" | Remove-Item -Force

# Create 4 empty slots
for ($i = 1; $i -le 4; $i++) {
    $content = @"
---
title: Empty Slot $i
size: —
color: transparent
type: empty
---
"@
    $content | Out-File -FilePath "$gamesDir\slot_$i-en.md" -Encoding utf8
    $content | Out-File -FilePath "$gamesDir\slot_$i-ptBR.md" -Encoding utf8
    $content | Out-File -FilePath "$gamesDir\slot_$i-es.md" -Encoding utf8
}

Write-Host "Created 4 empty slots in $gamesDir successfully!"

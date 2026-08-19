Add-Type -Path "d:\portfolio\scripts\ProcessAvatar.cs" -ReferencedAssemblies System.Drawing

$inputJpg = "C:\Users\yaadg\.gemini\antigravity-ide\brain\8e6c93f4-241a-48ce-ab58-5959a9f508df\.user_uploaded\media_1787177076690.jpg"
$outAvatar = "d:\portfolio\src\assets\images\game\yaado_avatar.png"
$outHudMe = "d:\portfolio\src\assets\images\game\hud-me1.png"
$outIconMe = "d:\portfolio\src\assets\icons\me-with-cat.png"

[Portfolio.AvatarProcessor]::MakeTransparentAndSave($inputJpg, $outAvatar)

# Copy to hud-me1 and me-with-cat
Copy-Item -Path $outAvatar -Destination $outHudMe -Force
Copy-Item -Path $outAvatar -Destination $outIconMe -Force

# Remove outdated webps so bundler uses the fresh transparent png
$webps = @(
    "d:\portfolio\src\assets\images\game\hud-me1.webp",
    "d:\portfolio\src\assets\icons\me-with-cat.webp"
)
foreach ($w in $webps) {
    if (Test-Path $w) {
        Remove-Item -Path $w -Force
        Write-Host "Removed $w"
    }
}

Write-Host "Avatar processing finished successfully!"

$dir = "d:\portfolio\src\content\projects"

# Remove old placeholders
$oldFiles = @(
    "42Projects-en.md", "42Projects-es.md", "42Projects-ptBR.md",
    "CSS4fun-en.md", "CSS4fun-es.md", "CSS4fun-ptBR.md",
    "InstitutionalClarke-en.md", "InstitutionalClarke-es.md", "InstitutionalClarke-ptBR.md",
    "SueTheReal-en.md", "SueTheReal-es.md", "SueTheReal-ptBR.md"
)
foreach ($f in $oldFiles) {
    $p = "$dir\$f"
    if (Test-Path $p) {
        Remove-Item -Path $p -Force
        Write-Host "Removed $f"
    }
}

Write-Host "Old projects cleaned up!"

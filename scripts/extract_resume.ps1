Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = "d:\portfolio\yaad_resume.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Parse XML paragraphs
[xml]$xml = $content
$paragraphs = $xml.SelectNodes("//w:p", $ns)

# Extract paragraphs text
$textList = @()
foreach ($p in $xml.document.body.p) {
    $pText = ""
    if ($p.r) {
        foreach ($r in $p.r) {
            if ($r.t) {
                if ($r.t -is [string]) {
                    $pText += $r.t
                } else {
                    $pText += $r.t.'#text'
                }
            }
        }
    }
    if ($pText.Trim().Length -gt 0) {
        $textList += $pText.Trim()
    }
}

$textList | Out-File -FilePath "d:\portfolio\extracted_resume.txt" -Encoding utf8
Write-Host "Extracted $( $textList.Count ) lines to extracted_resume.txt!"

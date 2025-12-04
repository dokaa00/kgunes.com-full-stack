param([string]$directory)

# Function to check if a command exists
function Test-CommandExists {
    param ($command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Stop'
    try {
        if (Get-Command $command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
    finally {
        $ErrorActionPreference = $oldPreference
    }
    return $false
}

# Check for ffmpeg
if (-not (Test-CommandExists ffmpeg)) {
    Write-Host "FFmpeg not found. Please install FFmpeg to use this script."
    exit 1
}

Get-ChildItem -Path $directory -Recurse -Include *.png, *.jpg, *.jpeg | ForEach-Object {
    $inputFile = $_.FullName
    $outputFile = [System.IO.Path]::ChangeExtension($inputFile, ".webp")
    
    Write-Host "Converting $inputFile to $outputFile..."
    
    # Use ffmpeg to convert to webp with quality 80
    ffmpeg -i "$inputFile" -c:v libwebp -q:v 80 "$outputFile" -y -loglevel error
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully converted: $_.Name"
    } else {
        Write-Host "Failed to convert: $_.Name"
    }
}

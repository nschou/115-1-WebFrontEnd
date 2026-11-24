# check-env.ps1 — 開發環境自我檢查
# 用法：在專案資料夾執行  pwsh -File 90_技術與架構/00_開發環境/check-env.ps1
# 或： powershell -ExecutionPolicy Bypass -File .\check-env.ps1

$ErrorActionPreference = "Continue"
$results = @()

function Add-Result($name, $ok, $detail, $required) {
  $script:results += [pscustomobject]@{ 項目=$name; 結果=$(if($ok){"OK"}else{"NG"}); 必要=$required; 說明=$detail }
}

function Get-Version {
  param($cmd, [string[]]$argList)
  try {
    $out = & $cmd @argList 2>&1
    if ($LASTEXITCODE -eq 0 -and $out) { return ($out | Select-Object -First 1).ToString().Trim() }
    return $null
  } catch { return $null }
}

# 1. Bun
$bun = Get-Version "bun" "--version"
Add-Result "Bun" ([bool]$bun) $bun "必要"

# 2. Node
$node = Get-Version "node" "--version"
Add-Result "Node.js" ([bool]$node) $node "必要"

# 3. Git
$git = Get-Version "git" "--version"
Add-Result "Git" ([bool]$git) $git "建議"

# 4. 專案檔
$pkg = Test-Path "package.json"
Add-Result "package.json" $pkg $(if($pkg){"found"}else{"missing"}) "必要"

$next = (Test-Path "next.config.js") -or (Test-Path "next.config.mjs") -or (Test-Path "next.config.ts")
Add-Result "Next.js 設定" $next $(if($next){"found"}else{"missing"}) "必要"

$tw = $false
if ($pkg) {
  $json = Get-Content "package.json" -Raw | ConvertFrom-Json
  $tw = [bool]($json.dependencies.tailwindcss -or $json.devDependencies.tailwindcss)
}
Add-Result "Tailwind CSS" $tw $(if($tw){"in package.json"}else{"missing"}) "必要"

$prisma = Test-Path "prisma/schema.prisma"
Add-Result "Prisma schema" $prisma $(if($prisma){"found"}else{"missing"}) "選做"

$envFile = (Test-Path ".env") -or (Test-Path ".env.local")
Add-Result ".env" $envFile $(if($envFile){"found"}else{"missing"}) "選做"

# 5. 建置檢查
if ($pkg) {
  $tsc = Test-Path "tsconfig.json"
  Add-Result "TypeScript 設定" $tsc $(if($tsc){"found"}else{"missing"}) "建議"
}

$results | Format-Table -AutoSize | Out-String | Write-Host

$failed = $results | Where-Object { $_.必要 -eq "必要" -and $_.結果 -eq "NG" }
if ($failed.Count -gt 0) {
  Write-Host "結果：有 $($failed.Count) 個必要項目未完成。" -ForegroundColor Red
  exit 1
}
Write-Host "結果：必要項目全部通過。" -ForegroundColor Green
exit 0

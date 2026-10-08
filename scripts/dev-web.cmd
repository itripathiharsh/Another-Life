@echo off
REM LegacyLife local web frontend (Stage 5). Double-click to run.
REM Needs the API running first (dev-api.cmd). Keeps everything on drive D.
set TMP=D:/Another life/legacylife/.cache/tmp
set TEMP=D:/Another life/legacylife/.cache/tmp
set NEXT_TELEMETRY_DISABLED=1
set NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
set PORT=3000
cd /d D:\Another life\legacylife\apps\web
"D:\dev\Node\npm.cmd" run dev

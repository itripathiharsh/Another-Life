@echo off
REM LegacyLife local API server (Stage 4 backend). Double-click to run.
REM Keeps everything on drive D per repo rule (CLAUDE.md Rule 1).
set TMP=D:/Another life/legacylife/.cache/tmp
set TEMP=D:/Another life/legacylife/.cache/tmp
set PORT=3001
cd /d D:\Another life\legacylife
"D:\dev\Node\npm.cmd" run api --cache "D:\Another life\legacylife\.cache\npm"

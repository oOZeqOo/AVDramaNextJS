@ECHO OFF
@REM Variables
SET command=%1

@REM Decide what to do from this Windows Equivalent of a makefile

if %command%==start GOTO :START @REM make start
if %command%==rename GOTO :RENAME @REM make rename
if %command%==check-mistakes GOTO :CHECK @REM make check-mistakes
if %command%==check-images GOTO :COMPARE_IMAGES @REM make check-images

GOTO :END

:START
    START "START" CMD /K "npm run dev"
    timeout /t 5 && start chrome http://localhost:3000/
    GOTO :END

:RENAME
    python scripts/rename_files.py
    GOTO :END

:CHECK
    python scripts/find_mistakes.py
    GOTO :END

:COMPARE_IMAGES
    python scripts/compare_images.py
    GOTO :END

:END

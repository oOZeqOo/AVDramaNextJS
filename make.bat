@ECHO OFF
@REM Variables
SET command=%1

@REM Decide what to do from this Windows Equivalent of a makefile

if %command%==start GOTO :START @REM make start
if %command%==rename GOTO :RENAME @REM make rename
if %command%==update GOTO :UPDATE @REM make update
if %command%==add-pics GOTO :ADD_PICS @REM make add-pics
if %command%==check GOTO :CHECK @REM make check
if %command%==check-mistakes GOTO :CHECK_MISTAKES @REM make check-mistakes
if %command%==check-images GOTO :COMPARE_IMAGES @REM make check-images
if %command%==commit GOTO :COMMIT @REM make commit
if %command%==push GOTO :PUSH @REM make push

GOTO :END

:START
    START "START" CMD /K "npm run dev"
    timeout /t 5 && start chrome http://localhost:3000/
    GOTO :END

:RENAME
    python scripts/rename_files.py
    GOTO :END

:UPDATE
    git add ./public/
    git commit -am "CLI Update"
    git push
    GOTO :END

:ADD_PICS
    git add ./public/
    git commit -m "added new pics"
    GOTO :END

:CHECK
    ECHO Do:
    ECHO  - make check-mistakes
    ECHO  - make check-images
    GOTO :END

:CHECK_MISTAKES
    python scripts/find_mistakes.py
    GOTO :END

:COMPARE_IMAGES
    python scripts/compare_images.py
    GOTO :END

:COMMIT
    git commit -am 'Update'
    GOTO :END

:PUSH
    git push
    GOTO :END

:END

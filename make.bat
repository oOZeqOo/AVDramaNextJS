@ECHO OFF
@REM Variables
SET command=%1

@REM Decide what to do from this Windows Equivalent of a makefile
if %command%==start GOTO :START
GOTO :END

:START
    START "START" CMD /K "timeout /t 5 && start chrome http://localhost:3000/"
    npm run dev
    GOTO :END

:END

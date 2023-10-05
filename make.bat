@ECHO OFF
@REM Variables
SET command=%1

@REM Decide what to do from this Windows Equivalent of a makefile
if %command%==all GOTO :ALL
GOTO :END

:ALL
    START "START" CMD /K "npm run dev"
    timeout /t 5 && start chrome http://localhost:3000/
    GOTO :END

:END

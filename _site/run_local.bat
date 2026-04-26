@echo off
echo ==========================================
echo   Codexfabrica Personal Website - Local Preview
echo ==========================================
echo.
echo Checking for Ruby and Bundler...
where ruby >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Ruby is not installed or not in PATH.
    echo Please install Ruby and Jekyll to preview this site.
    pause
    exit /b
)

echo Installing dependencies (if needed)...
call bundle install

echo.
echo Starting Jekyll server at http://localhost:4000
echo.
echo [TIP] Press Ctrl+C to stop the server.
echo.
call bundle exec jekyll serve --open-url --livereload
pause

del build.zip
call yarn build
cd build
call zip -r ..\build.zip *
cd ..
#!/bin/bash

echo "------------------------------------"
echo "Installing Backend Dependices..."
echo "------------------------------------"

cd backend

for dir in */; do 
    # look for package.json
    packageFile=(`find ./$dir -maxdepth 1 -name "package.json"`)

    echo ${packageFile}

    # found a nodeJs project
    if [ ${#packageFile[0]} -gt 0 ]; then
        echo "Found a NodeJS project at $packageFile"
        
        sleep 1
        
        echo "Running npm install to install the dependencies"

        sleep 1

        cd $dir 

        # exec npm install
        npm install
            
        cd ..
        
        echo ""
    fi
done

echo "------------------------------------"
echo "Installing Frontend Dependices..."
echo "------------------------------------"
sleep 1

cd ..
cd frontend

# exec npm install
npm install
    
cd ..

exec bash
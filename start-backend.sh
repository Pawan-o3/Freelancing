#!/bin/bash

# Create MongoDB data directory if it doesn't exist
mkdir -p /tmp/mongodb_data

# Start MongoDB in the background
mongod --dbpath /tmp/mongodb_data --bind_ip localhost --port 27017 --fork --logpath /tmp/mongodb.log

# Wait for MongoDB to start
sleep 2

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null; then
    echo "MongoDB started successfully"
else
    echo "Failed to start MongoDB"
    exit 1
fi

# Start the Node.js backend server
cd server
node index.js

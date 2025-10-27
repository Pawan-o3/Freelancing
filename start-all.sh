#!/bin/bash
set -e

# Create MongoDB data directory
mkdir -p /tmp/mongodb_data

# Start MongoDB
echo "Starting MongoDB..."
mongod --dbpath /tmp/mongodb_data --bind_ip localhost --port 27017 --logpath /tmp/mongodb.log &
MONGO_PID=$!

# Wait for MongoDB to start
sleep 5

# Check if MongoDB is running
if ! ps -p $MONGO_PID > /dev/null; then
    echo "MongoDB failed to start. Check /tmp/mongodb.log for details"
    cat /tmp/mongodb.log
    exit 1
fi

echo "MongoDB started successfully (PID: $MONGO_PID)"

# Start backend server
echo "Starting backend server..."
cd server
node index.js

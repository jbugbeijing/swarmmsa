#!/bin/bash

echo "********************************"
echo "*** Web-Client Microservice ****"
echo "********************************"

cd ${BOOKER_HOME}/web-client

if [ "$1" != "" ];
then
        PORT="-Djboss.socket.binding.port-offset=${1}"
fi

java ${PORT} -jar target/*-swarm.jar

#mvn wildfly-swarm:run

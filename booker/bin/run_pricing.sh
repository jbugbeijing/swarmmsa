#!/bin/bash

echo "*****************************"
echo "*** Pricing Microservice ****"
echo "*****************************"

cd ${BOOKER_HOME}/pricing
if [ "$1" != "" ];
then
        PORT="-Djboss.socket.binding.port-offset=${1}"
fi

java ${PORT} -jar target/*-swarm.jar

#mvn wildfly-swarm:run

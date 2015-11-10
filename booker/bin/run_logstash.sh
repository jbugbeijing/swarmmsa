#!/bin/bash

BOOKER_HOME=${HOME}/extra/logstash
cd ${HOME}/apps/logstash-1.5.4
bin/logstash agent -f ${BOOKER_HOME}/logstash-wildfly.conf

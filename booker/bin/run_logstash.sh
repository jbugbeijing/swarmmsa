#!/bin/bash

LOGSTASH_HOME=${BOOKER_HOME}/extra/logstash
cd ${BOOKER_HOME}/apps/logstash-1.5.4
bin/logstash agent -f ${LOGSTASH_HOME}/logstash-wildfly.conf

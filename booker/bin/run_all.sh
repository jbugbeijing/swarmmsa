if [ "x$BOOKER_HOME" = "x" ]; then
    echo "Please specify the booker home directory with 'export BOOKER_HOME=/path/to/booker'"
    exit 1
fi
gnome-terminal \
		 --working-directory ${BOOKER_HOME}/apps/keycloak-1.5.0.Final \
		-e ${BOOKER_HOME}/bin/run_keycloak.sh
sleep 10
gnome-terminal \
		--working-directory ${BOOKER_HOME}/apps/logstash-1.5.4 \
		-e ${BOOKER_HOME}/bin/run_logstash.sh
sleep 10
gnome-terminal \
		 --working-directory ${BOOKER_HOME}/web-client \
		-e ${BOOKER_HOME}/bin/run_webclient.sh
sleep 10
gnome-terminal \
		--working-directory ${BOOKER_HOME}/store \
		-e ${BOOKER_HOME}/bin/run_store.sh
sleep 5
gnome-terminal \
		--working-directory ${BOOKER_HOME}/pricing \
		-e ${BOOKER_HOME}/bin/run_pricing.sh
sleep 5
gnome-terminal \
		--working-directory ${BOOKER_HOME}/library \
		-e ${BOOKER_HOME}/bin/run_library.sh

gnome-terminal \
		--working-directory ${BOOKER_HOME}/apps/kibana-4.1.2-linux-x64 \
		-e ${BOOKER_HOME}/bin/run_kibana.sh


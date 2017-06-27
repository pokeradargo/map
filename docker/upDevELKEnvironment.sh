#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
source "${SCRIPT_DIR}/bashLib/commonLib.sh"

ensure_docker_network_existence "katana-ELK-network-dev"                                                            && \
                                                                                                                       \
e_color blue "Creating Elastic Search master "                                                                      && \
docker container run -d                                                                                                \
    --name adsmurai-elastic-search-master                                                                              \
    --network katana-ELK-network-dev                                                                                   \
    --network-alias elastic-search-master-dev.sandbox                                                                  \
    registry.adsmurai.com:17500/amp/dev/elastic-search                                                                 \
    /usr/share/elasticsearch/bin/elasticsearch                                                                         \
        -Enode.master=true                                                                                             \
        -Ecluster.name=adsmurai-logs                                                                                   \
        -Enode.name="Adsmurai logs master"                                                                             \
    &> ${DEBUG_OUTPUT_FILE} && e_success || e_error                                                                 && \
                                                                                                                       \
e_color blue "Creating Elastic Search node "                                                                        && \
docker container run -d                                                                                                \
    --name adsmurai-elastic-search-node                                                                                \
    --network katana-ELK-network-dev                                                                                   \
    --network-alias elastic-search-node-dev.sandbox                                                                    \
    registry.adsmurai.com:17500/amp/dev/elastic-search                                                                 \
    /usr/share/elasticsearch/bin/elasticsearch                                                                         \
        -Enode.master=false                                                                                            \
        -Ecluster.name=adsmurai-logs                                                                                   \
        -Ediscovery.zen.ping.unicast.hosts=elastic-search-master-dev.sandbox                                           \
    &> ${DEBUG_OUTPUT_FILE} && e_success || e_error                                                                 && \
                                                                                                                       \
e_color blue "Creating kibana "                                                                                     && \
docker container run -d                                                                                                \
    --name adsmurai-kibana                                                                                             \
    --network katana-ELK-network-dev                                                                                   \
    --network-alias kibana-dev.sandbox                                                                                 \
    -p 5601:5601                                                                                                       \
    --volume "${SCRIPT_DIR}/kibana/kibana.yml":/etc/kibana/kibana.yml                                                  \
    registry.adsmurai.com:17500/amp/dev/kibana                                                                         \
    &> ${DEBUG_OUTPUT_FILE} && e_success || e_error                                                                 && \
                                                                                                                       \
e_color blue "Creating logstash container "                                                                         && \
docker container run -d                                                                                                \
    --name adsmurai-logstash                                                                                           \
    --network katana-ELK-network-dev                                                                                   \
    --network-alias adsmurai-kibana-dev.sandbox                                                                        \
    --volume "${SCRIPT_DIR}/../..":/data                                                                               \
    --volume "${SCRIPT_DIR}/logstash":/etc/logstash/conf.d                                                             \
    --cpus 1                                                                                                           \
    registry.adsmurai.com:17500/amp/dev/logstash                                                                       \
    &> ${DEBUG_OUTPUT_FILE} && e_success || e_error                                                                    ;

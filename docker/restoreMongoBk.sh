#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
source "${SCRIPT_DIR}/bashLib/commonLib.sh"

MONGODB_CONTAINER=`docker ps | grep "${PRJ_NAME}-mongodb-dev"`

if [[ -z "${MONGODB_CONTAINER}" ]];
then
    e_error "Please execute ./docker/startDevEnvironment before executing this action";
    exit 1;
fi

docker exec                                                                                                            \
    -${TERMINAL_MODE}                                                                                                  \
    ${PRJ_NAME}-mongodb-dev                                                                                            \
    bash -c '( cd /mongo_extra_data'${REL_DIR}'; /mongo_extra_data/docker/mongo/restoreBackUp.sh "$@" )' -- "$@"                                                ;

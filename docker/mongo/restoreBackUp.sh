#!/usr/bin/env bash

red=$(tput setaf 1)
blue=$(tput setaf 38)
reset=$(tput sgr0)

MONGO_IP=$1
MONGO_PORT=$2
COMPLETE_PATH_TO_BK_FILE=$3

if [ -z ${MONGO_IP} ];
then
    printf "\n${red}Please the ip of the server of mongo ${reset}\n"
    printf "\nExample: ${blue} restoreBackUp.sh 0.0.0.0 27017 complete/path/to/file/and/name ${reset}\n"
    exit 1
fi

if [ -z ${MONGO_PORT} ];
then
    printf "\n${red}Please the port of the server of mongo ${reset}\n"
    printf "\nExample: ${blue} restoreBackUp.sh 0.0.0.0 27017 complete/path/to/file/and/name ${reset}\n"
    exit 1
fi

if [ -z ${COMPLETE_PATH_TO_BK_FILE} ];
then
    printf "\n${red}Please indicate the name path and name of file to import ${reset}\n"
    printf "\nExample: ${blue} restoreBackUp.sh complete/path/to/file/and/name ${reset}\n"
    exit 1
fi

if [ ! -f "${COMPLETE_PATH_TO_BK_FILE}" ]
then
    printf "\n${red}File ${reset}$COMPLETE_PATH_TO_BK_FILE ${red}not found${reset}\n"
    exit 1
fi

mongorestore --host ${MONGO_IP} --port ${MONGO_PORT} --gzip --archive="${COMPLETE_PATH_TO_BK_FILE}"
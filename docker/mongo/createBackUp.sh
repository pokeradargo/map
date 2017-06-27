#!/usr/bin/env bash

red=$(tput setaf 1)
blue=$(tput setaf 38)
reset=$(tput sgr0)

DATA_FILE=`date +"%y-%m-%d"`
DATA_DIR="./bk/"
DEFAULT_PATH_TO_BK_FILE=$DATA_DIR$DATA_FILE.gz
DEFAULT_DATA_BASE="adsmurai"

MONGO_IP=$1
MONGO_PORT=$2
DATABASE_NAME=$3
COMPLETE_PATH_TO_BK_FILE=$4

if [ -z ${MONGO_IP} ];
then
    printf "\n${red}Please the ip of the server of mongo ${reset}\n"
    printf "\nExample: ${blue} createBackUp.sh 0.0.0.0 27017 database_name ${reset}\n"
    exit 1
fi

if [ -z ${MONGO_PORT} ];
then
    printf "\n${red}Please the port of the server of mongo ${reset}\n"
    printf "\nExample: ${blue} createBackUp.sh 0.0.0.0 27017 database_name ${reset}\n"
    exit 1
fi

if [ -z ${DATABASE_NAME} ];
then
    DATABASE_NAME=$DEFAULT_DATA_BASE
fi

if [ -z ${COMPLETE_PATH_TO_BK_FILE} ];
then
    COMPLETE_PATH_TO_BK_FILE=$DEFAULT_PATH_TO_BK_FILE
fi

mongodump --db ${DATABASE_NAME} --host ${MONGO_IP} --port ${MONGO_PORT} --gzip --archive=${COMPLETE_PATH_TO_BK_FILE}
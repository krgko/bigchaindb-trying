#!/bin/bash
# Reference from https://bigchaindb.readthedocs.io/en/latest/installation/node-setup/all-in-one-bigchaindb.html

mkdir -p bigchaindb_docker/mongodb
mkdir -p bigchaindb_docker/tendermint

docker-compose up -d --force-recreate

docker ps | grep bigchaindb

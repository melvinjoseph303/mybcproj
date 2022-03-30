#!/bin/bash
cd $FABRIC_CFG_PATH
# cryptogen generate --config crypto-config.yaml --output keyfiles
configtxgen -profile OrdererGenesis -outputBlock genesis.block -channelID systemchannel

configtxgen -printOrg registrar-property-com > JoinRequest_registrar-property-com.json
configtxgen -printOrg user-property-com > JoinRequest_user-property-com.json

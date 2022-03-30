#!/bin/bash
# Script to create channel block 0 and then create channel
cp $FABRIC_CFG_PATH/core.yaml /vars/core.yaml
cd /vars
export FABRIC_CFG_PATH=/vars
configtxgen -profile OrgChannel \
  -outputCreateChannelTx propertychannel.tx -channelID propertychannel

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=192.168.42.79:7002
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/registrar.property.com/peers/peer1.registrar.property.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=registrar-property-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/registrar.property.com/users/Admin@registrar.property.com/msp
export ORDERER_ADDRESS=192.168.42.79:7007
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/property.com/orderers/orderer2.property.com/tls/ca.crt
peer channel create -c propertychannel -f propertychannel.tx -o $ORDERER_ADDRESS \
  --cafile $ORDERER_TLS_CA --tls

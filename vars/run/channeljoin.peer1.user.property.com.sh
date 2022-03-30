#!/bin/bash
# Script to join a peer to a channel
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=192.168.42.79:7003
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/user.property.com/peers/peer1.user.property.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=user-property-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/user.property.com/users/Admin@user.property.com/msp
export ORDERER_ADDRESS=192.168.42.79:7007
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/property.com/orderers/orderer2.property.com/tls/ca.crt
if [ ! -f "propertychannel.genesis.block" ]; then
  peer channel fetch oldest -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA \
  --tls -c propertychannel /vars/propertychannel.genesis.block
fi

peer channel join -b /vars/propertychannel.genesis.block \
  -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA --tls

#!/bin/bash



if [ "$1" == "citi" ] ; then
    npm config set registry http://artifactory.nam.nsroot.net:8081/artifactory/api/npm/citi-tlv-npm
    HTTPS_PROXY=http://webproxy.ssmb.com:8080
    HTTP_PROXY=http://webproxy.ssmb.com:8080
elif [ "$1" == "home" ] ; then
    npm config delete registry
    HTTPS_PROXY=
    HTTP_PROXY=
else
    echo "$0 citi|home"
fi
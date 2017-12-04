#!/bin/bash

# 设置 Tag, 默认为 latest
if [ $1 ]
then
    Tag=$1
else
    Tag="latest"
fi

echo "build ..."
docker build -t dockerhub.leapcloud.cn:5080/ext-sample/ext-sample-zaiqian:${Tag} ..
echo "push ..."
docker push dockerhub.leapcloud.cn:5080/ext-sample/ext-sample-zaiqian:${VERSION}
#!/usr/bin/bash
for file_name in `ls client`
do
  echo $file_name
done
read -p"done?(y/n)" choice
echo $choice

#!/bin/bash
cd tmp
`rm -rf *.log`
mv *.mp4 video.mp4
`ffmpeg -report -i video.mp4`
`more *.log  | grep Audio >> video.log`
`more *.log  | grep Video >> video.log`
`cp video.log ../video.log`
`rm -rf *.mp4`
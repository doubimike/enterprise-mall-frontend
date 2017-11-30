#!/bin/sh 
#
#使用方法
#mmall :deploy.sh mmfall_fe
#admin: deploy.sh admin_fe
#

GIT_HOME=/home/mike/enterprise-mall-frontend/developer/git-repository/
DEST_PATH=/home/mike/enterprise-mall-frontend/product

#cd  dir

if [ ! -n "$1"];
	then 
	echo -e "请输入要发布的项目"
	exit
fi

if [ $1 = "mmall-fe" ];
	then 
	echo -e "========Enter mmall-fe======="
	cd $GIT_HOME$1
elif [ $1 = "mmall-fe" ];
	then 
	echo -e "========Enter admin-fe======="
	cd $GIT_HOME$1
else 
	echo -e "输入的项目名没有找到"
	exit
fi

#clear git dist
echo -e "========clear git dist======="
rm -rf ./dist


#git 操作
echo -e "========git checkout master======="
git checkout master


echo -e "========git pull======="
git pull


#npm install 

echo -e "========npm install======="
npm install --registry=https://registry.npm.taobao.org



#npm run dist

echo -e "========npm run dist======="
npm run dist


if[ -d "./dist" ];
	then 
	# backup dest
	echo -e "==== dest backup ==="
	mv $DEST_PATH$1/dist $DEST_PATH/dist.bak

	# copy
	echo -e "==== dest copy ==="
	cp -R ./dist $DEST_PATH$1

	#echo result 
	echo -e "==== deploy success ==="
else 
	echo -e "==== deploy fail ==="
fi

# SSH into EC2
ssh -i "ec2-key-pair.pem" ec2-user@ec2-18-213-81-12.compute-1.amazonaws.com

# SWAP file
sudo dd if=/dev/zero of=/swapfile bs=128M count=32

# Update and install docker
sudo yum update
sudo yum install docker
sudo usermod -a -G docker ec2-user
id ec2-user

# Install docker-compose
sudo yum install python3-pip
pip3 install --user docker-compose

# Enable docker service at AMI boot time:
sudo systemctl enable docker.service
sudo systemctl start docker.service

# Install nginx
sudo amazon-linux-extras enable nginx1
sudo yum clean metadata
sudo yum -y install nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl restart nginx

# Copy content, stay at root of local
scp -r -i ./deployment/ec2/ec2-key-pair.pem ./ ec2-user@ec2-18-213-81-12.compute-1.amazonaws.com:/home/ec2-user/app
OR
# must stop docker first
sudo rm -rf /home/ec2-user/app/*
rsync -av --exclude=.git --exclude=node_modules --exclude=db -e "ssh -i ./deployment/ec2/ec2-key-pair.pem" ./ ec2-user@ec2-18-213-81-12.compute-1.amazonaws.com:/home/ec2-user/app

# Copy client/react only (local)
sudo rm -rf /home/ec2-user/client/*
sudo rm -rf /usr/share/nginx/html/*
rsync -av --exclude=.git --exclude=node_modules --exclude=db -e "ssh -i ./deployment/ec2/ec2-key-pair.pem" ./client/build/* ec2-user@ec2-18-213-81-12.compute-1.amazonaws.com:/home/ec2-user/client
sudo cp -r /home/ec2-user/client/* /usr/share/nginx/html

# Docker compose | Inside EC2
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120

docker-compose -f docker-compose.ec2.yaml build
docker-compose -f docker-compose.ec2.yaml up
docker-compose -f docker-compose.ec2.yaml down

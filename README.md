# TFG

**Containerize apps using minikube docker**

`eval $(minikube docker-env)`

Inside the folder with the Dockerfile run:
`docker build -t tag:version .`

Example:
`docker build -t webrtc-webserver:v1 .`

**Deploy webserver**

`kubectl run webrtc-webserver --image=webrtc-webserver:v1 --port=8080`

**Deploy signaling server**

`kubectl run signaling-server --image=signaling-server:v1 --port=8080`

**Create webserver service**

`kubectl create -f kubernetes/webserver-service.yaml`

**Create singaling server service**

`kubectl create -f kubernetes/sigserver-service.yaml`

**Update images**

Rebuild the image to update:
`docker build -t signaling-server:v2 .`

Set the new image to the deployment:
`kubectl set image deployment/signaling-server signaling-server=signaling-server:v2`

**Run simulation**
Create the job
`kubectl create -f monitorJob.yaml`

Wait for the job to finish and then access the containers logs
`kubect logs <pod> <container>`

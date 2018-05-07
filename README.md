# TFG

**kubect autocompletion**

`echo "source <(kubectl completion bash)" >> ~/.bashrc`

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

Enter into the minikube node shell:
`minikube ssh`

Check if there is the /mnt/data dir, if not create it

In second terminal:

Create persistent volume resource

`kubectl create -f kubernetes/persistentVolume.yaml`

Create persistent volume claim resource

`kubectl create -f kubernetes/persistentVolumeClaim.yaml`

Create CronJob, it will execute the simulation each minute,
and write log files into the cluster node, at /mnt/data
`kubectl create -f monitorCronJobPersistent.yaml`

Wait the desired minutes and in the first terminal check the files

Delete the CronJob to stop the simulation executions
`kubectl delete cronjob monitor`

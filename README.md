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

Check if there is the /data/experimet1 dir exists, if not create it
`sudo mkdir /data/experiment1`

Exit minikube shell: `exit`

Mount a local path pointing to minikube vm /data/experiment1

`mkdir results`

`minikube mount results:/data/experiment1`


In a second terminal:

Create persistent volume resource

`kubectl create -f kubernetes/persistentVolume.yaml`

Create persistent volume claim resource

`kubectl create -f kubernetes/persistentVolumeClaim.yaml`

Create CronJob, it will execute the simulation each minute,
and write log files into the pod's /tmp which points to the
node cluster /data/experiment folder, which points to our local
folder /results
`kubectl create -f monitorCronJobPersistent.yaml`

Wait the desired minutes, more minutes, more data.

Delete the CronJob to stop the simulation executions
`kubectl delete cronjob monitor`

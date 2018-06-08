# Point to the experiment folder
setwd("/home/kanji/Projects/TFG/experiment_1")


a <- read.table("raw/raw_minikube_mem.txt")
head(a)
print("--------------------------")


a$V1 <- as.numeric(a$V1)
a$V2 <- as.numeric(a$V2)

# head(a)
a <- data.frame(V1=a$V1,V2=a$V2)


## SEPARO LAS 't'

valor <- sort(unique(a$V2))
length(valor)
simulaciones <- list()

for(i in 1:length(valor)){
  simulaciones[[i]] <- a[a$V2 == valor[i],]
}

# simulaciones

# Mean
cpu_mean <- list()
for(i in 1:length(simulaciones)){
  cpu_mean[[i]] <- mean(simulaciones[[i]]$V1)
}
# cpu_mean

#Standard deviation
cpu_sd <- list()
for(i in 1:length(simulaciones)){
  cpu_sd[[i]] <- sd(simulaciones[[i]]$V1)
}
# cpu_sd


data_cpu <- data.frame(
  mean = c( unlist(cpu_mean)),
  sd = c( unlist(cpu_sd)),
  t = unique(a$V2)
)

head(data_cpu)
tail(data_cpu)
write.table(data_cpu, file="results/processed_data.txt", sep=" ",append=FALSE,row.names=FALSE)

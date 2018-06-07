#Point to the experiment folder
setwd("/home/kanji/Projects/TFG/experiments/1")


a <- read.table("raw/cpu_dump.txt")
head(a)
print("--------------------------")

#parsear el archivo raw
a$V1 <- gsub("[", "", a$V1, fixed = TRUE)
a$V2 <- gsub("]", "", a$V2, fixed = TRUE)
a$V1 <- gsub(",", "", a$V1, fixed = TRUE)


a$V1 <- as.numeric(a$V1)
a$V2 <- as.numeric(a$V2)
# head(a[,c(1,2)])

# Calcular la media de cpu1 y cpu2 para cada muestra
# para obtener el consumo total de cpu en ese momento
v1v2 <- apply(a[,c(1,2)],FUN=mean,MARGIN=1)
a <- data.frame(V1=v1v2,V3=a$V3)
head(a)


# table(a$V3)

## SEPARO LAS 't'

valor <- sort(unique(a$V3))
length(valor)
simulaciones <- list()

for(i in 1:length(valor)){
  simulaciones[[i]] <- a[a$V3 == valor[i],]
}

# simulaciones

# MEAN
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
  cpu1 = c( unlist(cpu_mean)),
  cpu1sd = c( unlist(cpu_sd)),
  time = unique(a$V3)
)


head(data_cpu)
write.table(data_cpu, file="results/data_cpuWsd.txt", sep=" ",append=FALSE,row.names=FALSE)

# plot(data_cpu$time, data_cpu$cpu1,
#      type = "l",
#      xaxt = "n",
#      ylab = "% Uso de cpu",
#      xlab = "Tiempo (s)",
#      lwd = 2,
#      col = "green")
#
# lines(data_cpu$time, data_cpu$cpu2,  lwd = 2, col = "green")
# axis(1, at = data_cpu$time, labels = data_cpu$time)
# legend(9,
#        60,
#        legend = c("cpu"),
#        col=c("green"),
#        lty=1:2,
#        cex=0.8,
#        lwd = 2,
#        bty = "n")

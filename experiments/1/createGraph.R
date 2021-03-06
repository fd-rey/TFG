# setwd("/home/kanji")

a <- read.table("/home/kanji/Projects/TFG/experiments/1/raw/cpu_dump.txt")
head(a)
print("--------------------------")

a$V1 <- gsub("[", "", a$V1, fixed = TRUE)
a$V2 <- gsub("]", "", a$V2, fixed = TRUE)
a$V1 <- gsub(",", "", a$V1, fixed = TRUE)

# head(a)

a$V1 <- as.numeric(a$V1)
a$V2 <- as.numeric(a$V2)
# head(a[,c(1,2)])
v1v2 <- apply(a[,c(1,2)],FUN=mean,MARGIN=1)
head(v1v2)

b <- data.frame(medias=v1v2,t=a$V3)
head(b)

# head(v1v2)

# head(a)

# table(a$V3)

## SEPARO LAS 't'

a_0 <- a[a$V3 == 0.0,]

a_05 <- a[a$V3 == 0.5,]
a_1 <- a[a$V3 == 1.0,]
a_15 <- a[a$V3 == 1.5,]
a_2 <- a[a$V3 == 2.0,]
a_25 <- a[a$V3 == 2.5,]
a_3 <- a[a$V3 == 3.0,]
a_35 <- a[a$V3 == 3.5,]
a_4 <- a[a$V3 == 4.0,]
a_45 <- a[a$V3 == 4.5,]
a_5 <- a[a$V3 == 5.0,]
a_55 <- a[a$V3 == 5.5,]
a_6 <- a[a$V3 == 6.0,]
a_65 <- a[a$V3 == 6.5,]
a_7 <- a[a$V3 == 7.0,]
a_75 <- a[a$V3 == 7.5,]
a_8 <- a[a$V3 == 8.0,]
a_85 <- a[a$V3 == 8.5,]
a_9 <- a[a$V3 == 9.0,]
a_95 <- a[a$V3 == 9.5,]
a_10 <- a[a$V3 == 10.0,]
a_105 <- a[a$V3 == 10.5,]
a_11 <- a[a$V3 == 11.0,]

# MEAN
mean_0_cpu1 <- mean(a_0$V1)
mean_0_cpu2 <- mean(a_0$V2)

mean_05_cpu1 <- mean(a_05$V1)
mean_05_cpu2 <- mean(a_05$V2)

mean_1_cpu1 <- mean(a_1$V1)
mean_1_cpu2 <- mean(a_1$V2)

mean_15_cpu1 <- mean(a_15$V1)
mean_15_cpu2 <- mean(a_15$V2)

mean_2_cpu1 <- mean(a_2$V1)
mean_2_cpu2 <- mean(a_2$V2)

mean_25_cpu1 <- mean(a_25$V1)
mean_25_cpu2 <- mean(a_25$V2)

mean_3_cpu1 <- mean(a_3$V1)
mean_3_cpu2 <- mean(a_3$V2)

mean_35_cpu1 <- mean(a_35$V1)
mean_35_cpu2 <- mean(a_35$V2)

mean_4_cpu1 <- mean(a_4$V1)
mean_4_cpu2 <- mean(a_4$V2)

mean_45_cpu1 <- mean(a_45$V1)
mean_45_cpu2 <- mean(a_45$V2)

mean_5_cpu1 <- mean(a_5$V1)
mean_5_cpu2 <- mean(a_5$V2)

mean_55_cpu1 <- mean(a_55$V1)
mean_55_cpu2 <- mean(a_55$V2)

mean_6_cpu1 <- mean(a_6$V1)
mean_6_cpu2 <- mean(a_6$V2)

mean_65_cpu1 <- mean(a_65$V1)
mean_65_cpu2 <- mean(a_65$V2)

mean_7_cpu1 <- mean(a_7$V1)
mean_7_cpu2 <- mean(a_7$V2)

mean_75_cpu1 <- mean(a_75$V1)
mean_75_cpu2 <- mean(a_75$V2)

mean_8_cpu1 <- mean(a_8$V1)
mean_8_cpu2 <- mean(a_8$V2)

mean_85_cpu1 <- mean(a_85$V1)
mean_85_cpu2 <- mean(a_85$V2)

mean_9_cpu1 <- mean(a_9$V1)
mean_9_cpu2 <- mean(a_9$V2)

mean_95_cpu1 <- mean(a_95$V1)
mean_95_cpu2 <- mean(a_95$V2)

mean_10_cpu1 <- mean(a_10$V1)
mean_10_cpu2 <- mean(a_10$V2)

mean_105_cpu1 <- mean(a_105$V1)
mean_105_cpu2 <- mean(a_105$V2)

mean_11_cpu1 <- mean(a_11$V1)
mean_11_cpu2 <- mean(a_11$V2)

#Standard deviation
sd_0_cpu1 <- sd(a_0$V1)
sd_0_cpu2 <- sd(a_0$V2)

sd_05_cpu1 <- sd(a_05$V1)
sd_05_cpu2 <- sd(a_05$V2)

sd_1_cpu1 <- sd(a_1$V1)
sd_1_cpu2 <- sd(a_1$V2)

sd_15_cpu1 <- sd(a_15$V1)
sd_15_cpu2 <- sd(a_15$V2)

sd_2_cpu1 <- sd(a_2$V1)
sd_2_cpu2 <- sd(a_2$V2)

sd_25_cpu1 <- sd(a_25$V1)
sd_25_cpu2 <- sd(a_25$V2)

sd_3_cpu1 <- sd(a_3$V1)
sd_3_cpu2 <- sd(a_3$V2)

sd_35_cpu1 <- sd(a_35$V1)
sd_35_cpu2 <- sd(a_35$V2)

sd_4_cpu1 <- sd(a_4$V1)
sd_4_cpu2 <- sd(a_4$V2)

sd_45_cpu1 <- sd(a_45$V1)
sd_45_cpu2 <- sd(a_45$V2)

sd_5_cpu1 <- sd(a_5$V1)
sd_5_cpu2 <- sd(a_5$V2)

sd_55_cpu1 <- sd(a_55$V1)
sd_55_cpu2 <- sd(a_55$V2)

sd_6_cpu1 <- sd(a_6$V1)
sd_6_cpu2 <- sd(a_6$V2)

sd_65_cpu1 <- sd(a_65$V1)
sd_65_cpu2 <- sd(a_65$V2)

sd_7_cpu1 <- sd(a_7$V1)
sd_7_cpu2 <- sd(a_7$V2)

sd_75_cpu1 <- sd(a_75$V1)
sd_75_cpu2 <- sd(a_75$V2)

sd_8_cpu1 <- sd(a_8$V1)
sd_8_cpu2 <- sd(a_8$V2)

sd_85_cpu1 <- sd(a_85$V1)
sd_85_cpu2 <- sd(a_85$V2)

sd_9_cpu1 <- sd(a_9$V1)
sd_9_cpu2 <- sd(a_9$V2)

sd_95_cpu1 <- sd(a_95$V1)
sd_95_cpu2 <- sd(a_95$V2)

sd_10_cpu1 <- sd(a_10$V1)
sd_10_cpu2 <- sd(a_10$V2)

sd_105_cpu1 <- sd(a_105$V1)
sd_105_cpu2 <- sd(a_105$V2)

sd_11_cpu1 <- sd(a_11$V1)
sd_11_cpu2 <- sd(a_11$V2)



data_cpu <- data.frame(
  cpu1 = c(
    mean_0_cpu1,
    mean_05_cpu1,
    mean_1_cpu1,
    mean_15_cpu1,
    mean_2_cpu1,
    mean_25_cpu1,
    mean_3_cpu1,
    mean_35_cpu1,
    mean_4_cpu1,
    mean_45_cpu1,
    mean_5_cpu1,
    mean_55_cpu1,
    mean_6_cpu1,
    mean_65_cpu1,
    mean_7_cpu1,
    mean_75_cpu1,
    mean_8_cpu1,
    mean_85_cpu1,
    mean_9_cpu1,
    mean_95_cpu1,
    mean_10_cpu1,
    mean_105_cpu1,
    mean_11_cpu1
    ),
  cpu2 = c(
    mean_0_cpu2,
    mean_05_cpu2,
    mean_1_cpu2,
    mean_15_cpu2,
    mean_2_cpu2,
    mean_25_cpu2,
    mean_3_cpu2,
    mean_35_cpu2,
    mean_4_cpu2,
    mean_45_cpu2,
    mean_5_cpu2,
    mean_55_cpu2,
    mean_6_cpu2,
    mean_65_cpu2,
    mean_7_cpu2,
    mean_75_cpu2,
    mean_8_cpu2,
    mean_85_cpu2,
    mean_9_cpu2,
    mean_95_cpu2,
    mean_10_cpu2,
    mean_105_cpu2,
    mean_11_cpu2
   ),
  cpu1sd = c(
    sd_0_cpu1,
    sd_05_cpu1,
    sd_1_cpu1,
    sd_15_cpu1,
    sd_2_cpu1,
    sd_25_cpu1,
    sd_3_cpu1,
    sd_35_cpu1,
    sd_4_cpu1,
    sd_45_cpu1,
    sd_5_cpu1,
    sd_55_cpu1,
    sd_6_cpu1,
    sd_65_cpu1,
    sd_7_cpu1,
    sd_75_cpu1,
    sd_8_cpu1,
    sd_85_cpu1,
    sd_9_cpu1,
    sd_95_cpu1,
    sd_10_cpu1,
    sd_105_cpu1,
    sd_11_cpu1
   ),
  cpu2sd = c(
    sd_0_cpu2,
    sd_05_cpu2,
    sd_1_cpu2,
    sd_15_cpu2,
    sd_2_cpu2,
    sd_25_cpu2,
    sd_3_cpu2,
    sd_35_cpu2,
    sd_4_cpu2,
    sd_45_cpu2,
    sd_5_cpu2,
    sd_55_cpu2,
    sd_6_cpu2,
    sd_65_cpu2,
    sd_7_cpu2,
    sd_75_cpu2,
    sd_8_cpu2,
    sd_85_cpu2,
    sd_9_cpu2,
    sd_95_cpu2,
    sd_10_cpu2,
    sd_105_cpu2,
    sd_11_cpu2
   ),
  time = unique(a$V3)
)

head(data_cpu)
write.table(data_cpu, file="data_cpuWsd.txt", sep=" ",append=FALSE,row.names=FALSE)

plot(data_cpu$time, data_cpu$cpu1,
     type = "l",
     xaxt = "n",
     ylab = "% Uso de cpu",
     xlab = "Tiempo (s)",
     lwd = 2,
     col = "blue")

lines(data_cpu$time, data_cpu$cpu2,  lwd = 2, col = "green")
axis(1, at = data_cpu$time, labels = data_cpu$time)
legend(9,
       60,
       legend = c("cpu1", "cpu2"),
       col=c("blue", "green"),
       lty=1:2,
       cex=0.8,
       lwd = 2,
       bty = "n")

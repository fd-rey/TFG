# # setwd("/home/kanji")
#
a <- read.table("/home/kanji/Projects/TFG/experiments/1/raw/mem_dump.txt")
head(a)
# print("--------------------------")
#
# # head(a)
#
a$V1 <- as.numeric(a$V1)
a$V2 <- as.numeric(a$V2)

#
# ## SEPARO LAS 't'
#
a_0 <- a[a$V2 == 0.0,]

a_05 <- a[a$V2 == 0.5,]
a_1 <- a[a$V2 == 1.0,]
a_15 <- a[a$V2 == 1.5,]
a_2 <- a[a$V2 == 2.0,]
a_25 <- a[a$V2 == 2.5,]
a_3 <- a[a$V2 == 3.0,]
a_35 <- a[a$V2 == 3.5,]
a_4 <- a[a$V2 == 4.0,]
a_45 <- a[a$V2 == 4.5,]
a_5 <- a[a$V2 == 5.0,]
a_55 <- a[a$V2 == 5.5,]
a_6 <- a[a$V2 == 6.0,]
a_65 <- a[a$V2 == 6.5,]
a_7 <- a[a$V2 == 7.0,]
a_75 <- a[a$V2 == 7.5,]
a_8 <- a[a$V2 == 8.0,]
a_85 <- a[a$V2 == 8.5,]
a_9 <- a[a$V2 == 9.0,]
a_95 <- a[a$V2 == 9.5,]
a_10 <- a[a$V2 == 10.0,]
a_105 <- a[a$V2 == 10.5,]
a_11 <- a[a$V2 == 11.0,]
#
# # MEAN
mean_0_ram <- mean(a_0$V1)

mean_05_ram <- mean(a_05$V1)

mean_1_ram <- mean(a_1$V1)

mean_15_ram <- mean(a_15$V1)

mean_2_ram <- mean(a_2$V1)

mean_25_ram <- mean(a_25$V1)

mean_3_ram <- mean(a_3$V1)

mean_35_ram <- mean(a_35$V1)

mean_4_ram <- mean(a_4$V1)

mean_45_ram <- mean(a_45$V1)

mean_5_ram <- mean(a_5$V1)

mean_55_ram <- mean(a_55$V1)

mean_6_ram <- mean(a_6$V1)

mean_65_ram <- mean(a_65$V1)

mean_7_ram <- mean(a_7$V1)

mean_75_ram <- mean(a_75$V1)

mean_8_ram <- mean(a_8$V1)

mean_85_ram <- mean(a_85$V1)

mean_9_ram <- mean(a_9$V1)

mean_95_ram <- mean(a_95$V1)

mean_10_ram <- mean(a_10$V1)

mean_105_ram <- mean(a_105$V1)

mean_11_ram <- mean(a_11$V1)

#Standard deviation
sd_0_ram <- sd(a_0$V1)

sd_05_ram <- sd(a_05$V1)

sd_1_ram <- sd(a_1$V1)

sd_15_ram <- sd(a_15$V1)

sd_2_ram <- sd(a_2$V1)

sd_25_ram <- sd(a_25$V1)

sd_3_ram <- sd(a_3$V1)

sd_35_ram <- sd(a_35$V1)

sd_4_ram <- sd(a_4$V1)

sd_45_ram <- sd(a_45$V1)

sd_5_ram <- sd(a_5$V1)

sd_55_ram <- sd(a_55$V1)

sd_6_ram <- sd(a_6$V1)

sd_65_ram <- sd(a_65$V1)

sd_7_ram <- sd(a_7$V1)

sd_75_ram <- sd(a_75$V1)

sd_8_ram <- sd(a_8$V1)

sd_85_ram <- sd(a_85$V1)

sd_9_ram <- sd(a_9$V1)

sd_95_ram <- sd(a_95$V1)

sd_10_ram <- sd(a_10$V1)

sd_105_ram <- sd(a_105$V1)

sd_11_ram <- sd(a_11$V1)



data_ram <- data.frame(
  ram = c(
    mean_0_ram,
    mean_05_ram,
    mean_1_ram,
    mean_15_ram,
    mean_2_ram,
    mean_25_ram,
    mean_3_ram,
    mean_35_ram,
    mean_4_ram,
    mean_45_ram,
    mean_5_ram,
    mean_55_ram,
    mean_6_ram,
    mean_65_ram,
    mean_7_ram,
    mean_75_ram,
    mean_8_ram,
    mean_85_ram,
    mean_9_ram,
    mean_95_ram,
    mean_10_ram,
    mean_105_ram,
    mean_11_ram
  ),
  ramsd = c(
    sd_0_ram,
    sd_05_ram,
    sd_1_ram,
    sd_15_ram,
    sd_2_ram,
    sd_25_ram,
    sd_3_ram,
    sd_35_ram,
    sd_4_ram,
    sd_45_ram,
    sd_5_ram,
    sd_55_ram,
    sd_6_ram,
    sd_65_ram,
    sd_7_ram,
    sd_75_ram,
    sd_8_ram,
    sd_85_ram,
    sd_9_ram,
    sd_95_ram,
    sd_10_ram,
    sd_105_ram,
    sd_11_ram
  ),
  time = unique(a$V2)
)

head(data_ram)
write.table(data_ram, file="data_ramWsd.txt", sep=" ",append=FALSE,row.names=FALSE)

plot(data_ram$time, data_ram$ram,
     type = "l",
     xaxt = "n",
     ylab = "% Uso de ram",
     xlab = "Tiempo (s)",
     lwd = 2,
     col = "green")

lines(data_ram$time, data_ram$ram2,  lwd = 2, col = "green")
axis(1, at = data_ram$time, labels = data_ram$time)
legend(9,
       60,
       legend = c("ram"),
       col=c("green"),
       lty=1:2,
       cex=0.8,
       lwd = 2,
       bty = "n")

import psutil

f = open("testfile.txt","w")
while True:
    data = psutil.cpu_percent(interval=0.5, percpu=True)
    print(data)
    f.write(str(data)+"\n")

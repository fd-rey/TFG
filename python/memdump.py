import psutil
import time

mem = psutil.virtual_memory()
totalInMibs = mem.total/float(1024*1024)
print "Total: %.2f MiB" % (totalInMibs)
print "Available: "+str(mem.available)

def printMem():
    mem = psutil.virtual_memory()
    print mem.percent

while True:
    printMem()
    time.sleep(0.5)

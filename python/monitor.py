import psutil
import time
import multiprocessing as mp
import datetime

def cpuDump(shouldStop):
    filename ="/tmp/cpu_dump.txt"
    f = open(filename,"a")
    now = time.time()
    f.write('### '+str(datetime.datetime.now()).split('.')[0]+"\n")
    print('running cpuDump')
    while True:
        if shouldStop.value == 1:
            break;

        data = psutil.cpu_percent(interval=0.5, percpu=True)
        f.write(str(data)+"\n")
        print(str(data)+"\n")
    f.close()


def memDump(shouldStop):
    f = open("/tmp/mem_dump.txt","a")
    f.write('### '+str(datetime.datetime.now()).split('.')[0]+"\n")
    mem = psutil.virtual_memory()
    totalInMibs = mem.total/float(1024*1024)
    f.write("Total memory: %.2f MiB\n" % (totalInMibs))
    print('running memDump')
    while True:
        if shouldStop.value == 1:
            break;
        data =  psutil.virtual_memory()
        f.write(str(data.percent)+"\n")
        print(str(data.percent))
        time.sleep(0.5)
    f.close()


if __name__ == '__main__':

    stop = mp.Value('i', 0) #shared variable
    cpuProcess = mp.Process(target=cpuDump,args=(stop,))
    cpuProcess.start()
    memProcess = mp.Process(target=memDump,args=(stop,))
    memProcess.start()

    # start simulation

    # end simulation
    time.sleep(5)
    print "sleepd"
    stop.value = 1
    cpuProcess.join()
    memProcess.join()

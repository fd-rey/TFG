import psutil
import time
import multiprocessing as mp
import datetime

def cpuDump(shouldStop):
    filename ="/tmp/cpu_dump.txt"
    f = open(filename,"a")
    now = time.time()
    f.write('# '+str(datetime.datetime.now()).split('.')[0]+"\n")
    print('running cpuDump')
    sample = 0.0
    while True:
        if shouldStop.value == 1:
            break;

        data = psutil.cpu_percent(interval=0.5, percpu=True)
        f.write(str(data)+" "+str(sample)+" \n")
        print(str(data)+" "+str(sample))
        sample += 0.5;
    f.close()


def memDump(shouldStop):
    f = open("/tmp/mem_dump.txt","a")
    f.write('# '+str(datetime.datetime.now()).split('.')[0]+"\n")
    mem = psutil.virtual_memory()
    totalInMibs = mem.total/float(1024*1024)
    f.write("# Total memory: %.2f MiB\n" % (totalInMibs))
    print('running memDump')
    sample = 0.0
    while True:
        if shouldStop.value == 1:
            break;
        data =  psutil.virtual_memory()
        f.write(str(data.percent)+" "+str(sample)+" \n")
        print(str(data.percent)+" "+str(sample))
        sample += 0.5;
        time.sleep(0.5)
    f.close()

def consumeResources():
    #create a large matrix
    M = 15000
    A = []
    for i in range (M):
        A.append([0 for x in range(M)])
        mem = psutil.virtual_memory()
        if mem.percent > 75:
            break
    print 'done'
    A = None

if __name__ == '__main__':

    stop = mp.Value('i', 0) #shared variable
    cpuProcess = mp.Process(target=cpuDump,args=(stop,))
    cpuProcess.start()
    memProcess = mp.Process(target=memDump,args=(stop,))
    memProcess.start()

    time.sleep(4)
    # start simulation
    print "begin simulation"
    consume1 =  mp.Process(target=consumeResources)
    consume1.start()
    consume1.join()
    print "end simulation"
    # end simulation
    time.sleep(4)
    stop.value = 1
    cpuProcess.join()
    memProcess.join()

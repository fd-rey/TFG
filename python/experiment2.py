import subprocess
import json

if __name__ == '__main__':
    filename ="/tmp/test.json"
    f = open(filename,"w")
    result = subprocess.check_output(['kubectl','get','pods','-o','json']).rstrip()
    f.write(result)
    f.close()
    #
    f = open(filename,"r")
    data = json.load(f)
    #print(data)
    print data['items'][0]['status']['conditions']

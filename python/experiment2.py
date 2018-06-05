import subprocess
import json

if __name__ == '__main__':
    filename ="/tmp/test.json"
    f = open(filename,"a")
    result = subprocess.check_output(['kubectl','get','pods','-o','json'])
    f.write(result)

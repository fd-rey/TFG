import plotly
from plotly.graph_objs import Scatter, Layout

x = []
y = []

with open('/tmp/mem_dump.txt',"r") as memDump:
    for line in memDump:
        yx = line.split(" ")
        if yx[0] == '#':
            continue
        else:
            x.append(yx[1])
            y.append(yx[0])

with open('/tmp/cpu_dump.txt',"r") as memDump:
    for line in memDump:
        yx = line.split(" ")
        if yx[0] == '#':
            continue
        else:
            x.append(yx[1])
            y.append(yx[0])



data = [
    Scatter(
        x=x,
        y=y,
        # error_y=dict(
        #     type='data',
        #     array=[1, 2, 3],
        #     visible=True
        # )
    )
]

plotly.offline.plot({
    "data": data,
    "layout": Layout(title="RAM usage")
})

# import plotly.plotly as py
# import plotly.graph_objs as go
#

#
# py.offline.iplot(data, filename='basic-error-bar')

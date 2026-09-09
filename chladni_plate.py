import math
def chladni(x: float, y: float, m: int=3, n: int=2) -> float:
    return math.cos(m*math.pi*x)*math.cos(n*math.pi*y)-math.cos(n*math.pi*x)*math.cos(m*math.pi*y)

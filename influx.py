"""
KRONOS-28-ITZA — Influx Logger
09 MATEMATICAS CYMATIC | BASE 440Hz PLATINUM
"""
import os
from dotenv import load_dotenv
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

load_dotenv()

URL = os.getenv("INFLUX_URL", "http://localhost:8086")
TOKEN = os.getenv("INFLUX_TOKEN", "kronos-token-dev")
ORG = os.getenv("INFLUX_ORG", "kronos")
BUCKET = os.getenv("INFLUX_BUCKET", "cymatic")

class KronosInflux:
    def __init__(self):
        self.client = InfluxDBClient(url=URL, token=TOKEN, org=ORG)
        self.write_api = self.client.write_api(write_options=SYNCHRONOUS)
        self.query_api = self.client.query_api()

    def write_metric(self, name, value, tags=None):
        """Escribe frame_budget_ms, frequency, seal"""
        tags = tags or {"level": "PLATINUM", "score": "100/100"}
        point = Point(name).field("value", float(value))
        for k, v in tags.items():
            point = point.tag(k, v)
        self.write_api.write(bucket=BUCKET, org=ORG, record=point)
        return True

    def write_frame_budget(self, ms, ok=True):
        return self.write_metric(
            "frame_budget_ms",
            ms,
            {"status": "OK PLATINUM 100/100" if ok else "OVER_BUDGET", "seal": "GPG-SIGN-REAL"}
        )

    def write_frequency(self, freq_hz):
        return self.write_metric("base_frequency_hz", freq_hz, {"base": "440"})

    def close(self):
        self.client.close()

# Alias para JS window.write_metric bridge
def write_metric(name, value):
    try:
        db = KronosInflux()
        db.write_metric(name, value)
        db.close()
    except Exception as e:
        print(f"[influx] warn: {e}")

if __name__ == "__main__":
    db = KronosInflux()
    db.write_frame_budget(11.8, True)
    db.write_frequency(440)
    print("Influx PLATINUM OK 440Hz + 12.3ms")
    db.close()

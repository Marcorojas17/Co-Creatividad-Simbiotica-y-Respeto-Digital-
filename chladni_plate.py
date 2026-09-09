"""
09 MATEMATICAS CYMATIC — Chladni Plate
Base: 432 Hz | Formula f(n) = 432 * 2^(n/12)
"""
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

FREQUENCY_BASE = 432

class ChladniPlate:
    def __init__(self, size=500, mode_m=4, mode_n=1):
        self.size = size
        self.m = mode_m
        self.n = mode_n
        x = np.linspace(-1, 1, size)
        y = np.linspace(-1, 1, size)
        self.X, self.Y = np.meshgrid(x, y)

    def pattern(self, frequency=FREQUENCY_BASE):
        """A(x,y) = sin(pi*m*x) * sin(pi*n*y) * cos(f)"""
        factor = frequency / FREQUENCY_BASE
        A = np.sin(np.pi * self.m * self.X * factor) * np.sin(np.pi * self.n * self.Y * factor)
        return A

    def get_nodes(self, threshold=0.05):
        pat = self.pattern()
        return np.abs(pat) < threshold

    def set_mode(self, m, n):
        self.m, self.n = m, n

    def frequency_for_note(self, n_semitones=0):
        """f(n) = 432 * 2^(n/12)"""
        return FREQUENCY_BASE * (2 ** (n_semitones / 12))

    def export_to_png(self, filename="chladni_pattern.png", dpi=150):
        """Exporta el patrón actual a PNG para usar en gold shader"""
        Z = self.pattern()
        fig, ax = plt.subplots(figsize=(8, 8))
        # Fondo oscuro y líneas doradas (estilo KRONOS)
        ax.imshow(Z, cmap='inferno', extent=(-1, 1, -1, 1), origin='lower', alpha=0.8)
        ax.contour(self.X, self.Y, Z, levels=[0], colors='#d4af37', linewidths=1.2, alpha=0.9)
        ax.set_facecolor('#070708')
        ax.set_title(f"Chladni Pattern (m={self.m}, n={self.n}) @ {FREQUENCY_BASE}Hz", color='#d4af37')
        ax.axis('off')
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
        fig.patch.set_facecolor('#070708')
        plt.savefig(filename, dpi=dpi, bbox_inches='tight', pad_inches=0, facecolor=fig.get_facecolor())
        plt.close()
        print(f"✅ Patrón exportado a {filename}")

# Test B+
if __name__ == "__main__":
    plate = ChladniPlate(mode_m=4, mode_n=1)
    print(f"Modo {plate.m}:{plate.n} @ {FREQUENCY_BASE}Hz OK")
    print(f"A4 432Hz = {plate.frequency_for_note(0)}")
    print(f"A4# = {plate.frequency_for_note(1):.2f}")

    # Exportar patrón para gold shader
    plate.export_to_png("chladni_mode_4_1.png")

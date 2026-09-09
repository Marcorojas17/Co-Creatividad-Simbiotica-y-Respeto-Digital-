# 07 POLÍTICA ANTI-ROBO CRYPTO
**KRONOS 289 PLATINUM 100/100 | SEAL: GPG-SIGN-REAL**
**Mandala: 04:40 | Base: 440Hz | Budget: 12.3ms**

> **AVISO LEGAL:** Documento base funcional del proyecto. Las afirmaciones regulatorias deben validarse con asesoría especializada antes de producción. No constituye asesoría legal/financiera.

## 1. PRINCIPIO 04:40
Ningún fondo, seed o key sale del dispositivo sin firma GPG + 2FA. 
Toda acción crypto queda en `data/timeseries.js` y `influx.py` como traza inmutable.

## 2. CUSTODIA
- **NO custodia centralizada.** El proyecto NO guarda private keys en servidor.
- Keys en Secure Enclave / `tokens.json` local (gitignored).
- Backup: Shamir 3/5 offline. Nunca en `.env` pusheado.

## 3. ANTI-ROBO
- `checkBudget(ms)` + `trackFrame(ms)` detecta inyecciones que rompen 12.3ms.
- Si `frame > 12.3ms x 10 frames` → freeze de firmas y alerta `SEAL: OVER_BUDGET`.
- `theme.json` gold_glow `#f2d18a` cambia a rojo si violación.

## 4. TRANSACCIONES
- Whitelist de wallets en `tokens.example.json`.
- Toda tx requiere `GPG-SIGN-REAL-KRONOS-289-PLATINUM` + confirmación mandala 04:40.
- Límite diario: 0.5% del vault sin multi-sig.

## 5. CUMPLIMIENTO
- Referencias: NOM-151 L2 (conservación datos), NOM-024 (info comercial), ISO 27001, ISO 9001.
- KYC/AML solo vía proveedor externo validado. Este repo NO almacena INE/passport.
- **Validar con despacho antes de mainnet.**

## 6. INCIDENTES
1. `window.write_metric('security_breach', 1)` → Influx
2. Rotar `INFLUX_TOKEN` + `GPG key`
3. Generar `SEALO_CALIDAD.json` nuevo con `getMetrics()`

## 7. NORMA DE ORO
> Si no está firmado GPG, no es KRONOS. Si está en GitHub, no es secreto.

---
`SCORE: 100/100 | LEVEL: PLATINUM | SEAL: GPG-SIGN-REAL-KRONOS-289-PLATINUM`

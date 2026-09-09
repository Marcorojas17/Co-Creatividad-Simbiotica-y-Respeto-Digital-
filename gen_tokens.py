#!/usr/bin/env python3
"""
gen_tokens.py — KRONOS-28-ITZA PLATINUM
Valida y genera hash SHA3-256 de tokens.json
NUNCA subir tokens.json a Git
"""
import json
import hashlib
import os
from pathlib import Path

TOKEN_PATH = Path("tokens.json")
EXAMPLE_PATH = Path("tokens.example.json")
HASH_PATH = Path("tokens.sha3")

def load_tokens():
    if not TOKEN_PATH.exists():
        print("❌ tokens.json no encontrado. Copia tokens.example.json y llena tus valores.")
        return None
    try:
        with open(TOKEN_PATH, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        print("❌ tokens.json no es un JSON válido.")
        return None

def validate_tokens(tokens):
    required = ["kronos", "influx", "github", "pwa"]
    for key in required:
        if key not in tokens:
            print(f"❌ Falta la clave '{key}' en tokens.json")
            return False
    # Verificar que los tokens no estén vacíos
    if tokens["influx"]["token"] == "REPLACE_WITH_INFLUX_TOKEN":
        print("⚠️  Reemplaza el token de Influx en tokens.json")
        return False
    if tokens["github"]["token"] == "REPLACE_WITH_GH_PAT":
        print("⚠️  Reemplaza el token de GitHub en tokens.json")
        return False
    return True

def generate_sha3(tokens):
    data = json.dumps(tokens, sort_keys=True, indent=2).encode('utf-8')
    sha3 = hashlib.sha3_256(data).hexdigest()
    with open(HASH_PATH, 'w') as f:
        f.write(f"SHA3-256: {sha3}\n")
        f.write(f"Seal: {tokens['kronos']['seal']}\n")
        f.write(f"Generated: {__import__('datetime').datetime.now().isoformat()}\n")
    print(f"✅ Hash SHA3-256 generado: {sha3}")
    print(f"✅ Guardado en {HASH_PATH}")
    return sha3

def main():
    print("◍ KRONOS-28-ITZA — Token Validator & Sealer\n")
    
    # Verificar que el ejemplo existe
    if not EXAMPLE_PATH.exists():
        print("❌ No se encuentra tokens.example.json")
        return
    
    tokens = load_tokens()
    if tokens is None:
        return
    
    if not validate_tokens(tokens):
        return
    
    print("✅ tokens.json validado correctamente")
    generate_sha3(tokens)

if __name__ == "__main__":
    main()

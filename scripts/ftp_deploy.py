import ftplib
import os
import sys

FTP_HOST = "ftp.larutadelsamurai.com"
FTP_USER = "samurai@larutadelsamurai.com"
FTP_PASS = "samurai2026"

print(f"Connecting to {FTP_HOST} as {FTP_USER}...")

# 1. Probar FTP estándar
try:
    ftp = ftplib.FTP(FTP_HOST, timeout=15)
    ftp.login(FTP_USER, FTP_PASS)
    print("Logged in successfully!")
    
    # Probar modo pasivo
    print("Testing Passive mode...")
    try:
        ftp.set_pasv(True)
        files = ftp.nlst()
        print(f"Passive mode works! Files: {files}")
    except Exception as e:
        print(f"Passive mode failed: {e}")
        print("Testing Active mode...")
        ftp.set_pasv(False)
        files = ftp.nlst()
        print(f"Active mode works! Files: {files}")

    ftp.quit()
except Exception as e:
    print(f"Standard FTP failed: {e}")

# 2. Probar FTPS (FTP over TLS)
print("\nTesting FTP_TLS...")
try:
    ftps = ftplib.FTP_TLS(FTP_HOST, timeout=15)
    ftps.login(FTP_USER, FTP_PASS)
    ftps.prot_p()
    print("FTPS Logged in successfully!")
    
    print("Testing FTPS Passive mode...")
    try:
        ftps.set_pasv(True)
        files = ftps.nlst()
        print(f"FTPS Passive mode works! Files: {files}")
    except Exception as e:
        print(f"FTPS Passive mode failed: {e}")
        print("Testing FTPS Active mode...")
        ftps.set_pasv(False)
        files = ftps.nlst()
        print(f"FTPS Active mode works! Files: {files}")

    ftps.quit()
except Exception as e:
    print(f"FTPS failed: {e}")

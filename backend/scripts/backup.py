# scripts/backup.py

import os
import subprocess
import datetime

def backup_database():
    backupDir = os.path.expanduser("~/Desktop/DB_Backups")
    dbName = "stock_management"  # <-- your actual DB name
    user = "postgres"
    password = "4444"
    host = "localhost"

    if not os.path.exists(backupDir):
        os.makedirs(backupDir)

    timeStamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    backupFile = os.path.join(backupDir, f"{dbName}_backup_{timeStamp}.sql")

    # Use pg_dump in PATH (adjust path if needed)
    dumpCommand = f'"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe" -U {user} -h {host} {dbName}'

    try:
        with open(backupFile, "w") as f:
            env = os.environ.copy()
            env["PGPASSWORD"] = password
            subprocess.run(dumpCommand, shell=True, check=True, env=env, stdout=f)
        print(f"Backup successful: {backupFile}")
    except subprocess.CalledProcessError as e:
        print(f"Backup failed: {e}")

if __name__ == "__main__":
    backup_database()


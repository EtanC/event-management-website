from backend.src.user import check_notifications
import schedule
import time

# to run: nohup python3 -m backend.src.schedule &
# should run in background

def check():
    check_notifications()

schedule.every().day.at('10:00').do(check)

while True:
    schedule.run_pending()
    time.sleep(60)
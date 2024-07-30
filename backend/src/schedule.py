from backend.src.user import check_notifications
import schedule
import time

# to run: nohup python3.12 -m backend.src.schedule &
# might be different depending on ur python version

# ps -ef | grep schedule
# find the pid and do kill [pid]

# should run in background

def check():
    print('Checking for notifications...', flush=True)
    check_notifications()

schedule.every().day.at('10:00').do(check)
# check that it works by running check every second
# schedule.every(1).seconds.do(check)

while True:
    schedule.run_pending()
    time.sleep(1)
FROM python:3.9

WORKDIR /app

COPY ./backend/requirements.txt ./backend/

RUN pip3 install -r ./backend/requirements.txt

COPY ./backend ./backend

COPY ./easychair_scraper ./easychair_scraper

EXPOSE 5000

CMD [ "python3", "-m", "backend.src.server" ]
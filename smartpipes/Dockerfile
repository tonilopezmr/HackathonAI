FROM python:3.10

ENV SMARTPIPES_PRODUCTION True
ENV PORT 5000

WORKDIR /app
COPY . . 

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn


EXPOSE 5000

CMD gunicorn --bind 0.0.0.0:${PORT} --workers 1 ai_service:sea

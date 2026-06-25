#!/bin/bash
echo "=== СБОРКА БЭКЕНДА СТАРТОВАЛА ==="
python3.9 -m pip install -r backend/requirements.txt
python3.9 backend/manage.py collectstatic --noinput --clear
python3.9 backend/manage.py migrate --noinput
echo "=== СБОРКА БЭКЕНДА ЗАВЕРШЕНА ==="
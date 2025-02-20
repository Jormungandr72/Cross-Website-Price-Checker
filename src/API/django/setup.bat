:: install required django modules
pip install django djangorestframework django-cors-headers

:: create Django project & application, backend is the name of the folder, change if u like
django-admin startproject backend

:: change dir into folder we just made
cd backend

:: here we create a django app called "api" to communicate with our react frontend
django-admin startapp api

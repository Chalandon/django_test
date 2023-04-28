**for development purpose only**

#### front
###### configuration
in `root` directory add the following variable in your `.env` file
```
REACT_APP_API_KEY='your access token'
```
###### install modules
`npm i`

###### run app
`npm start`

#### back
###### install modules
`pip install -r requirements.txt`

###### run server
`python3 ./back/test_hyvilo/manage.py runserver`

---
**note**
the default port for react is 3000, same as it is in django settings:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000"
]
```

---
#### issue
###### home.js:5 expected '!' error using with import
https://stackoverflow.com/questions/45443274/webpack-2-expected-error-using-with-import/45447398#45447398
in `.eslintrc` file
```
"rules": {
  "import/no-webpack-loader-syntax": "off"
}
```
###### home.js:63 map.on.load load before data be fetched
flag on map work if we replace `data` by `infos_company`
but this is not data from server

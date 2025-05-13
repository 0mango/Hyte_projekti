*** Settings ***
Library           SeleniumLibrary
Variables         env_test.py

*** Variables ***
${BROWSER}        chrome
${URL}            http://127.0.0.1:5500/fronted/Mun_nettisivu/teh3.html
    # Open browser and navigate to login page
    Open Browser    
    Input Text      id= name    ${TEST_USERNAME}
    Input Password  id= password    ${TEST_PASSWORD}
    Click Button    id= tallenna
    
    Close Browser
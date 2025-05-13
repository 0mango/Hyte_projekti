*** Settings ***
Library    SeleniumLibrary


*** Variables ***
${BROWSER}    chrome    
${URL}        https://www.selenium.dev/selenium/web/web-form.html

*** Test Cases ***
Lomakkeen täyttö
    
    Open Browser    ${URL}    ${BROWSER}
    Input Text    id=my-text-id    moi!
    Input Text    css=input[type="password"]    Salasan!
    Select From List By Label    name=my-select    Three
    Drag And Drop By Offset    name=my-range    100    50
    Select Checkbox    name=my-check
    Click Button    id=my-radio-2
    Input Text    name=my-date    2025-05-06
    Input Text    name= my-colors   0Red 90Green 68Blue
    Click Button    css=button[type="submit"]
    Close Browser
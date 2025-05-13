*** Settings ***
Library    SeleniumLibrary


*** Variables ***
${BROWSER}    chrome   
${URL}        http://127.0.0.1:5500/fronted/Mun_nettisivu/teh3.html

*** Test Cases ***
Lomakkeen täyttö
    
    Open Browser    ${URL}    ${BROWSER}
    Input Text    id=name    sumeya
    Input Text    id=password    Salasan!
    Click Button    id=tallenna
    Sleep       2s
    Handle Alert    accept
    Sleep       2s
    Click Button    id=lisää_teksti
    
    Close BROWSER
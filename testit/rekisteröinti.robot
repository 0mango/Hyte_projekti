*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}    chrome
${URL}        https://users.metropolia.fi/~sumeyaah/Mun_nettisivu/teh1.html   # Your local development URL
${USERNAME}   Testi henkilö
${PASSWORD}   testi.

*** Test Cases ***
tili luonti testi
    Open Browser    ${URL}    ${BROWSER}
    
    Input text         id= fname     ${USERNAME}
    Input text         id= pass     ${PASSWORD}
    Click Button       id= save
    Close BROWSER


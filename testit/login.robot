*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}    chrome
${URL}        https://users.metropolia.fi/~sumeyaah/Mun_nettisivu/teh3.html   
${USERNAME}   Testi henkilö
${PASSWORD}   testi

*** Test Cases ***

sisään kirjauntuminen.
    Open Browser    ${URL}    ${BROWSER}
    Input text         id= name     ${USERNAME}
    Input text         id= password      ${PASSWORD}
    Click Button       id= tallenna
    Close BROWSER
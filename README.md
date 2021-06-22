# Royce - Slot - Project

## How To Set Up Project
- Take pull or download project.

- Run **npm i** in Terminal to install all necessary packages.

- Then run command **npm run dev** to start webpack-server.

- Open browser and in url type "http://localhost:8080/"

## Project Includes
- Assets loading screen.

- Intro screen with continue button.

- Reel Area with 5x3 symbols and spin Button.

## Functionality Implemented
- Spinning of reels on spint Btn click (boring spinning of symbols).

- win/no-win functionality.

- Betline pay basis of number of symbols participating in win.

- win Amount display. 

- Resizing - to keep reel area and spin button poitions be relative to center.

## Some Test Case Scenario

- Handling with keyboard events is done.(listening from 0 to 6)

- pressing any key from 0 to 6 will save the desired outcome for next spin.

- Result alloted to keys (additional symbols win can also be there since whole reel grid is not being tampered for this)

   - 0  &nbsp;-> &nbsp;[0, 0, 0, 0, 0]
   - 1  &nbsp;-> &nbsp;[1, 1, 1, 1, 1]
   - 2  &nbsp;-> &nbsp;[2, 2, 2, 2, 2]
   - 3  &nbsp;-> &nbsp;[1, 0, 1, 0, 1]
   - 4  &nbsp;-> &nbsp;[2, 1, 2, 1, 2]
   - 5  &nbsp;-> &nbsp;[0, 1, 0, 1, 0]
   - 6  &nbsp;-> &nbsp;[1, 2, 1, 2, 1]


## Dev Stuff
- open console for same window
- Inside filter type **Response**
There you will see, all Game Results like
  -  Response: ReelGrid // reel grid of symbols in string
  - Response: OutcomeSetter // if you have pressed 0-6 
  - Response: all Win Data // if thre is any win in current spin
  - Response: All Win Amount // total win Amount of Current spin.

- Tech used-> PIXI.js, GSAP , Webpack, Typescript

    



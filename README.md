# Puzzle-Solver

## Description
This is a web app that solves Sudoku and Minesweeper puzzles. The Sudoku solver completely solves a Sudoku puzzle, if possible, when given the starting numbers. The Minesweeper solver helps a user identify cells with and without mines as the user progresses through the puzzle. 

### Sudoku

Sudoku is a logic game where the aim is to solve for the values that belong in every cell in the puzzle. The rules are that

1. The value in each cell must be between 1 and 9, inclusive.
2. The value in each cell must be unique in that cell’s row, column, and box (no repeats of numbers in a row, column, or box).

For a more detailed explanation of Sudoku, [read here] (https://en.wikipedia.org/wiki/Sudoku).

To use the sudoku solver, fill in the given values into the grid below and click solve. If it is possible to solve the puzzle, the solved values will appear in the grid below.

### Minesweeper
Minesweeper is a logic puzzle where the aim is to clear all cells that do not contain a "mine". Avoiding mines requires some luck, but also a fair bit of logic. This app does the logic part for the user.

There are three types of cells in Minesweeper.

1. **Flagged cells** are known to contain a mine
2. **Cleared cells** are known to not contain a mine. Some of the cleared cells have numbers have indicate the number of surrounding cells that contain mines
3. **Unknown cells** may or may not contain a mine

For a more detailed explanation, [read here] (https://en.wikipedia.org/wiki/Microsoft_Minesweeper).

To use the solver, click on a cell to clear it. If the cell contains a number, type in the number in the cell. If any cells can be cleared or flagged, they will do so automatically.

## Status

The web app currently contains two functional solvers for Sudoku and Minesweeper. For the Sudoku solver, I eventually would like to build a more efficient method to input numbers. Also, some more difficult Sudoku puzzles require some guessing, I would like to eventually improve the Sudoku solver to be able to solve those puzzles. I would also like to include more puzzles, like word searches and word scrambles.

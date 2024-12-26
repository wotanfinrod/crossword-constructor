export default class Crossword
{
    constructor()
    {
        this.grid = null;
        this.placedWords = null;
    }

    initializeGrid(rows, cols)
    {
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(''));
        this.placedWords = []; // Track placed words
    }

    generateCrossword(words) {
        console.log('words= ');
        console.log(words);
        if (words.length < 1) return false;

        // Place the first word in the center of the grid
        const firstWord = words[0];
        const startRow = Math.floor(this.grid.length / 2);
        const startCol = Math.floor((this.grid[0].length - firstWord.length) / 2);
        this.placeWord(firstWord, startRow, startCol, true);

        // Attempt to place the remaining words
        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            if (!this.placeWordWithIntersection(word)) {
                return false; // Failed to place a word
            }
        }

        return true;
    }

    placeWordWithIntersection(word) {
        console.log(`Placing word: ${word}`);
        for (const { word: placedWord, row, col, isHorizontal } of this.placedWords) {
            console.log(`Checking intersections with: ${placedWord}`);
            for (let i = 0; i < placedWord.length; i++) {
                const intersectingLetter = placedWord[i];
                const intersectIndex = word.indexOf(intersectingLetter);
    
                if (intersectIndex !== -1) {
                    const startRow = isHorizontal ? row - intersectIndex : row + i;
                    const startCol = isHorizontal ? col + i : col - intersectIndex;
                    console.log(
                        `Trying to place "${word}" at row: ${startRow}, col: ${startCol}, horizontal: ${!isHorizontal}`
                    );
                    const canPlace = this.canPlaceWord(word, startRow, startCol, !isHorizontal, intersectIndex);
    
                    if (canPlace) {
                        this.placeWord(word, startRow, startCol, !isHorizontal);
                        return true;
                    }
                }
            }
        }
        console.error(`Failed to place word: ${word}`);
        return false;
    }
    

    canPlaceWord(word, initialRow, initialCol, isHorizontal, overlapIndex)
    {
        if (isHorizontal)
        {
            if (initialCol < 0 || initialCol + word.length > this.grid[0].length) return false; // Out of bounds
        
            if //word is merging with another word in parallel axis.
            (
                this.grid[initialRow][initialCol - 1] !== '' ||
                this.grid[initialRow][initialCol + word.length] !== ''
            )   return false;
        }
        else
        {
            if (initialRow < 0 || initialRow + word.length > this.grid.length) return false; // Out of bounds

            if //word is merging with another word in parallel axis.
            (
                this.grid[initialRow - 1][initialCol] !== '' ||
                this.grid[initialRow + word.length][initialCol] !== ''
            )   return false;
        }
        
        for (let i = 0; i < word.length; i++)
        {
            const r = isHorizontal ? initialRow : initialRow + i;
            const c = isHorizontal ? initialCol + i : initialCol;

            if(!(this.grid[r][c] === word[i] || this.grid[r][c] == '')) return false; //Box is already occupied.
            
            if(i != overlapIndex)
            {
                if(isHorizontal && (this.grid[r-1][c] !== '' || this.grid[r+1][c] !== '')) return false;
                else if (!isHorizontal && (this.grid[r][c-1] !== '' || this.grid[r][c+1] !== '')) return false;
            }
        }
    
        return true; // Word placement is valid
    }
    
    
    placeWord(word, row, col, isHorizontal)
    {
        for (let i = 0; i < word.length; i++)
        {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
            this.grid[r][c] = word[i];
        }

        this.placedWords.push({ word, row, col, isHorizontal });
    }

}
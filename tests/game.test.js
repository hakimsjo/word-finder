// game.test.js - Enhetstester och flödestest för Ord-finnar

// För att köra: använd t.ex. Jest eller annan test-runner

const { createGrid, canPlace, shuffle, pickWords } = require('../game'); // Ingen ändring behövs här för JS-test

describe('Ord-finnar - Enhetstester', () => {
  test('shuffle returnerar array med samma element', () => {
    const arr = [1,2,3,4,5];
    const shuffled = shuffle([...arr]);
    expect(shuffled.sort()).toEqual(arr);
  });

  test('pickWords returnerar rätt antal ord', () => {
    global.WORDS = ["BIL", "BORD", "STOL", "HUND", "KATT"];
    const picked = pickWords(3);
    expect(picked.length).toBe(3);
    picked.forEach(word => expect(global.WORDS.includes(word)).toBe(true));
  });

  test('canPlace returnerar true för tomt rutnät', () => {
    const grid = Array.from({length: 10}, () => Array(10).fill(''));
    expect(canPlace(grid, "BIL", 0, 0, [0,1])).toBe(true);
  });

  test('canPlace returnerar false om utanför rutnät', () => {
    const grid = Array.from({length: 10}, () => Array(10).fill(''));
    expect(canPlace(grid, "BIL", 9, 9, [0,1])).toBe(false);
  });
});

// Flödestest: Simulera att klicka sig igenom spelet
// (Pseudotest, kräver testramverk för DOM, t.ex. Jest + jsdom eller Cypress)

describe('Ord-finnar - Spelflöde', () => {
  test('Hitta alla ord markerar gratulation', () => {
    // Setup DOM och spel (mocka renderGrid, renderWordList, checkWord, etc)
    // Simulera klick på bokstäver för alla ord
    // Kontrollera att "congrats"-elementet får klassen "visible"
    // Detta kräver ett DOM-testverktyg och är ett exempel på vad som ska testas
    expect(true).toBe(true); // Placeholder
  });
});

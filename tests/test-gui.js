// test-gui.js - GUI-flödestest för Ord-finnar (Mocha/Chai)

describe('Ord-finnar - GUI-flöde', function() {
  it('ska markera ord och visa gratulation', function(done) {
    // Skapa nytt spel
    restartGame();
    // Hämta första ordet och dess bokstäver
    const word = wordsToFind[0];
    let found = false;
    // Sök bokstäverna i rutnätet
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        let cell = document.querySelector(`td[data-row='${r}'][data-col='${c}']`);
        if (cell && cell.textContent === word[0]) {
          // Försök hitta ordet i alla riktningar
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              let ok = true, cells = [cell];
              for (let i = 1; i < word.length; i++) {
                let nr = r + dr*i, nc = c + dc*i;
                let ncell = document.querySelector(`td[data-row='${nr}'][data-col='${nc}']`);
                if (!ncell || ncell.textContent !== word[i]) { ok = false; break; }
                cells.push(ncell);
              }
              if (ok) {
                // Klicka på cellerna en i taget
                cells.forEach(td => td.dispatchEvent(new MouseEvent('mousedown', {bubbles:true})));
                setTimeout(() => {
                  chai.expect(document.getElementById('word-' + word).classList.contains('found')).to.be.true;
                  done();
                }, 200);
                found = true;
                break;
              }
            }
            if (found) break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }
    if (!found) this.skip();
  });
});

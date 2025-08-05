# Instruktioner för Ord-finnar spel (HTML5/JavaScript)

Detta dokument beskriver alla instruktioner och krav för att skapa ett ord-finnar spel med HTML5 och JavaScript, inspirerat av den bifogade bilden.

---

## Spelbeskrivning
Ord-finnar är ett spel där spelaren ska hitta dolda ord i ett rutnät av bokstäver. Orden kan vara placerade horisontellt, vertikalt eller diagonalt, både framåt och bakåt. Spelet har en timer, ordlista, och ett rutnät där spelaren markerar ord. Första itterationen ska vara på svenska.

## Funktionella krav
1. **Rutnät**: Visa ett rutnät (t.ex. 10x10) med bokstäver och dolda ord.
2. **Ordlista**: Visa en lista med ord som spelaren ska hitta, ovanför rutnätet.
3. **Markering**: Spelaren ska kunna markera bokstäver i rutnätet (med mus eller touch) för att välja ord.
4. **Kontroll**: Kontrollera om det markerade ordet finns i ordlistan och markera det som hittat.
5. **Feedback**: Ge visuell feedback när ett ord hittas (t.ex. färgändring på ordet och i rutnätet).
6. **Timer**: Visa en timer som räknar upp eller ner.
7. **Knappar**: Lägg till knappar för att starta om, pausa, ljud på/av och avsluta spelet.
8. **Responsiv design**: Spelet ska fungera på både dator och mobil.

## Tekniska krav
- Använd HTML5, CSS3 och JavaScript (ingen backend krävs).
- All logik ska köras i webbläsaren.
- Koden ska vara modulär och välstrukturerad.
- Använd ES6-syntax.

## Filstruktur (förslag)
- `index.html` – Huvudsidan för spelet
- `style.css` – Stilmall för spelet
- `game.js` – All spel-logik
- `words-sv.js` – Lista med svenska ord (kan vara en array)
- `assets/` – Bilder och ljud

## Grundläggande komponenter
- **HTML**:
  - Timer och kontrollknappar högst upp
  - Ordlista i en ruta ovanför rutnätet
  - Rutnät med bokstäver
- **CSS**:
  - Layout, färger, rundade hörn, skuggor
  - Responsivitet för mobil och desktop
  - Man ska kunna växla mellan ljust och mörkt läge.
- **JavaScript**:
  - Generera rutnät och placera ord
  - Hantera användarinteraktioner (markering, kontrollera ord)
  - Uppdatera UI vid funna ord
  - Timer och kontrollknappar
- **Databas**:
  - En databas med 500 svenska ord i filen words-sv.js. Orden ska vara på saker, platser och djur. (Denna måste finnas innan spelet kan starta.)

## Spelföde
1. Ladda sidan och generera rutnät + ordlista.
2. Spelaren markerar bokstäver för att välja ord.
3. Om ordet finns i listan: markera som hittat (både i listan och rutnätet).
4. När alla ord är hittade: visa gratulation.
5. Knappar för att starta om, pausa, ljud på/av, mörkt eller ljust läge och avsluta.

## Tester
- Skapa testfall för seplflödet som klickar sig igen spelet.
- Skapa enhetstester för de viktigaste funktionerna.

## Tips
- Använd event listeners för mus/touch.
- Dela upp koden i funktioner/klasser för bättre struktur.
- Testa spelet på olika enheter.
- Använd CSS för att skapa en snygg och tydlig design likt mallen.

## Utökningsidéer
- Flera svårighetsgrader
- Slumpmässiga ordlistor
- Animationer/ljud
- Poängsystem
- Fler språk

---

Följ dessa instruktioner för att skapa ett komplett ord-finnar spel i HTML5 och JavaScript, inspirerat av den bifogade bilden.

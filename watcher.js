const chokidar = require('chokidar');
const { exec } = require('child_process');

// Starte den Watcher
const watcher = chokidar.watch('.', { ignored: /node_modules/ });

watcher.on('change', (path) => {
  console.log(`${path} wurde geändert!`);

  // Git-Befehle ausführen
  exec('git add .', (err, stdout, stderr) => {
    if (err) {
      console.error(`Fehler beim Hinzufügen: ${stderr}`);
      return;
    }

    exec('git commit -m "Automatisches Commit"', (err, stdout, stderr) => {
      if (err) {
        console.error(`Fehler beim Committen: ${stderr}`);
        return;
      }

      exec('git push', (err, stdout, stderr) => {
        if (err) {
          console.error(`Fehler beim Pushen: ${stderr}`);
          return;
        }
        console.log('Änderungen wurden erfolgreich gepusht!');
      });
    });
  });
});

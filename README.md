# Formular zur Meldung von IT Sicherheitsvorfällen
Im Rahmen der Masterprojektarbeit von Sebastian Römer & Sebastian Hörstmann ist dieses Formular zur Meldung von IT Sicherheitsvorfällen entstanden.

Das Projekt wurde mit [Yeoman] (http://yeoman.io) erstellt und mit [Angular.js] (http://yeoman.io) umgesetzt. Es wurde versucht gänge best practices umzusetzen.

## Benötigte Komponenten
* Node.js
* Java 1.8
* Baasbox
* Bower
* Grunt

## Aufbau
Für die einzelnen Views ist in der Regel jeweils ein entsprechender Controller verfügbar, der die Funktionalitäten umsetzt.
Alle eingegebenen Daten werden als JSON gespeichert und sind im "Super Controller" superCtrl abgelegt.
Dieses Objekt wird beim Absenden des Formulars an das Backend gesendet und abgespeichert.
Der Super Controller ist in allen Views / Controllern verfügbar, und ist entsprechend übergeordnet. 
Dieser übernimmt z.B. initialisierung- und Loginaufgaben.

Neben den speziellen Funktionen der Controller sind hier auch, ebenfalls im JSON Format, die Beschreibungstexte (popoverTexte) und Texte für die Auswahlfelder abgelegt und lassen sich leicht anpassen.

Da es für Angular Awendungen unüblich ist dass sich der Header ändert wurde eine extra directive angelegt (header.html & headerCtrl.js).
Der Controller entscheidet darüber auf welcher Seite welcher Header dargestellt werden muss.

Die Controller und Views für die Zusammenfassung des Formulars & die Detailansicht eines bereits vorhandenen Falls ähneln sich sehr stark sind allerdings. Sie unterscheiden sich prinzipiell nur darüber von wo das JSON abgerufen wird.

# Time Manager 
Aplicație mobilă de management a activităților în React Native
## Descrierea livrabilelor proiectului
### App.js 
Fișierul principal al aplicației
### components
Folderul cu fișierele componentelor din  proiect
   * CategoryDropDown.js - componenta pentru selectarea categoriei în AddScreen.js
   * ChartTasks.js - componenta pentru graficul din AddScreen.js
   * CheckboxAddListInput.js - componenta pentru sarcinile unei activități în AddScreen.js
   * CheckboxListInput.js - componenta pentru sarcinile unei activități în Accordion.js
   * CrossedCheckbox - componenta pentru căsuța de bifat și titlul activități în Accordion.js
   * DateTimeReminder.js - componenta pentru selectarea datei și timpului
   * MenuTasksScreen.js - componenta pentru meniul din TasksScreen.js
   * SetPriority.js - componenta pentru setarea priorități
   * SetReminder.js - componenta pentru setare memento
   * SetRepetition.js - componeneta pentru setarea repetiției
### navigation 
Folder cu fișierele componentelor din interfețe
   * Accordion.js - componenta pentru activitățile din TasksScreen.js
   * AccodionAll.js - componenta pentru activitățile din SearchScreen.js
   * AccordionYesterday.js - componenta pentru activitățile trecute/inactive din TasksScreen.s
   * tabs.js - componenta pentru bara de navigare
   * TasksHeader.js - componenta pentru selectarea datei din TasksScreen.js
   * tasksModal.js - componenta pentru mesajul la adăugarea activități
### screens
Folderul cu fișierele componentelor interfețelor pentru bara de navigare
   * AddScreen.js - componenta pentru adăugarea activităților
   * ListsScreen.js - componenta pentru listarea activităților pe categori și căutarea după categorie
   * NotificationTime.js - fișierul cu funcția pentru setarea momentului de notificare
   * SearchScreen.js - componenta pentru căutarea activităților după titlu
   * StatisticsScreen.js - componenta pentru interfața cu statistici/grafice
   * styleScreens.js - fișierul cu codul CSS pentru stilare
   * TasksScreens.js - componenta pentru afișarea activităților din data selectată
## Pașii de compilare a aplicației
### Instalarea dependențelor
* npm install -g npm
* npm i react
* npm i react-native
* npm i expo
* npm i @react-native-async-storage/async-storage
* npm i @react-native-community/datetimepicker
* npm i @react-navigation/bottom-tabs
* npm i @react-navigation/native
* npm i expo-device
* npm i expo-notifications
* npm i intl
* npm i react-native-animatable
* npm i react-native-chart-kit
* npm i react-native-dropdown-picker
* npm i react-native-elements
* npm i react-native-gesture-handler
* npm i react-native-paper
* npm i react-native-svg
* npm i react-native-uuid
### Instalare emulator Android Studio
* https://developer.android.com/studio/install
### Instalare Expo Go
  Aplicație pentru rularea aplicație pe dispozitivul mobil real.
* https://expo.dev/client?utm_source=google&utm_medium=cpc&utm_content=performancemax&gclid=Cj0KCQjw4s-kBhDqARIsAN-ipH1oO60RQ4nGd_MTQQ8U3LB_ef7ZNtECy0W9KXN5hCQ8cLqyfE9hcA8aAt8hEALw_wcB
## Rularea aplicației pe dispozitiv virtual/real
1. Deschideți proiectul în Visual Studio Code
2. Instalați dependențele
4. Deschideți emulatorul Android Studio sau aplicația Expo Go
3. Deschideți terminalul din VS Code
5. În terminal rulați comanda:
 * npx expo start
## Accesarea aplicației pe dispozitiv
1. Instalați Expo Go pe dispozitiv
2. Accesați link-ul:
 * https://expo.dev/@andre97b/TimeManager
3. Scanați codul QR cu aplicația Expo Go sau accesați codul

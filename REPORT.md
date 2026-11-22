# Campus Assembly
## College Event Management Website
PCCCS382 · IT Workshop · Department of CSE (AIML)

### Objective and use
The project gives a student one place to compare events by date, find a venue and complete a demonstration registration. The sample programme runs from 4 to 8 December 2026. Extract the complete folder and open `index.html` in a modern browser with JavaScript enabled. The site uses local images and system fonts and requires no installation.

### Site structure
The Home section introduces the festival and shows the next scheduled event. Events lists six sessions in chronological order. Each listing gives its category, time in Kolkata, venue and description. Selecting Register beside an event moves to the student form and selects that session. Alternatively, a visitor can start with the empty form and pick an event from the list.

Gallery displays six original posters. Each motif relates to the session, from waveforms for Signal Sprint to layered outlines for Print Room. About introduces the department and four sample coordinators. Contact contains the sample event office details, office hours and a short feedback form.

### Project files
| Location | Purpose |
| --- | --- |
| index.html | Semantic page sections, navigation and labelled forms |
| css/style.css | Theme colours, typography, responsive grids and interactive states |
| js/script.js | Event data, filtering, time displays, navigation, theme and validation |
| images/ | Original festival mark and six locally stored poster illustrations |
| screenshots/ | Destination for browser captures before submission |
| REPORT.md | Project description, verification and limitations |

### JavaScript implementation
The events array is the common source for programme listings, registration options and the next-event card. A category button filters the listings without changing their chronological order. The timer compares the current time with dates containing an explicit Indian time-zone offset. It chooses the nearest future start, breaks the remaining interval into days, hours, minutes and seconds, and displays a completion message after the final event. A separate clock shows Kolkata time regardless of the visitor’s device time zone.

The registration form checks seven fields. It accepts a ten-digit roll number, checks the mobile number format and requires an event, department and gender selection. The feedback form checks the sender’s name, email and a message of at least fifteen characters. A failed submission displays inline messages and moves focus to the first invalid field. Correcting a value rechecks that field. A successful demo registration confirms the student and selected event, then clears the form.

### Responsive design and accessibility
On wide displays the introduction and countdown share a row, and the gallery uses three columns. At 900 pixels the introduction stacks and the gallery changes to two columns. At 680 pixels the gallery and forms use one column, and a menu button controls the navigation. Image captions stay visible on touch devices. Every input has a label, the forms announce status messages, and the theme and menu buttons expose their state to assistive technology. The theme toggle saves its preference when browser storage is available.

### Verification and limitations
Static checks passed for JavaScript syntax, unique HTML IDs, section links, label targets and local image files. Browser interaction and visual checks remain pending because the available preview blocked local file URLs.

For the submission captures, open the home page at desktop, tablet and phone widths (1366, 820 and 390 pixels). Capture each section, an empty registration submission and the dark theme. Test one complete registration using fictitious details, switch event categories and reload after changing theme. Save the captures in screenshots/.

This is a front-end demonstration. Registration and feedback exist only for the current interaction. A live festival would require server-side validation, storage and an organiser workflow. The events, staff contacts and posters are sample materials. Replace the gallery posters with your own event photographs for the photography requirement and update their alternative text and captions. Rename the project folder with your actual roll number and name before creating the final submission ZIP.
